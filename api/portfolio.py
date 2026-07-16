from http.server import BaseHTTPRequestHandler
import json
import math
import re
from datetime import datetime, timezone

import numpy as np
import pandas as pd
import yfinance as yf

ALLOWED_PERIODS = {"1y", "3y", "5y", "10y"}
ALLOWED_INTERVALS = {"1d": 252, "1wk": 52, "1mo": 12}
TICKER_RE = re.compile(r"^[A-Z0-9.^=\-]{1,15}$")


def _finite(value):
    try:
        v = float(value)
        return v if math.isfinite(v) else None
    except (TypeError, ValueError):
        return None


def _close_prices(raw: pd.DataFrame, symbols: list[str]) -> pd.DataFrame:
    if raw is None or raw.empty:
        raise ValueError("Yahoo Finance no devolvió precios para los símbolos solicitados")

    if isinstance(raw.columns, pd.MultiIndex):
        if "Close" in raw.columns.get_level_values(0):
            close = raw["Close"].copy()
        elif "Adj Close" in raw.columns.get_level_values(0):
            close = raw["Adj Close"].copy()
        else:
            raise ValueError("La descarga no contiene precios de cierre")
    else:
        column = "Close" if "Close" in raw.columns else "Adj Close" if "Adj Close" in raw.columns else None
        if column is None:
            raise ValueError("La descarga no contiene precios de cierre")
        close = raw[[column]].copy()
        close.columns = [symbols[0]]

    if isinstance(close, pd.Series):
        close = close.to_frame(name=symbols[0])

    close.columns = [str(c).upper() for c in close.columns]
    wanted = [s for s in symbols if s in close.columns]
    if not wanted:
        raise ValueError("No se encontró información válida para los tickers ingresados")

    close = close[wanted].sort_index().ffill().dropna(how="all")
    close = close.dropna(axis=1, how="all").dropna(how="any")
    if len(close) < 24:
        raise ValueError("No hay suficientes observaciones comunes para construir el portafolio")
    return close


def _downsample(frame: pd.DataFrame, max_points: int = 180) -> pd.DataFrame:
    if len(frame) <= max_points:
        return frame
    idx = np.linspace(0, len(frame) - 1, max_points).astype(int)
    return frame.iloc[np.unique(idx)]


class handler(BaseHTTPRequestHandler):
    def _headers(self, status=200):
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=3600")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.end_headers()

    def _json(self, payload, status=200):
        self._headers(status)
        self.wfile.write(json.dumps(payload, ensure_ascii=False, allow_nan=False).encode("utf-8"))

    def do_OPTIONS(self):
        self._headers(204)

    def do_GET(self):
        self._json({
            "status": "ok",
            "message": "Envía un POST con tickers, benchmark, period e interval.",
            "example": {"tickers": ["AAPL", "MSFT", "KO"], "benchmark": "^GSPC", "period": "3y", "interval": "1d"},
        })

    def do_POST(self):
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length <= 0 or length > 20_000:
                raise ValueError("Solicitud vacía o demasiado grande")
            body = json.loads(self.rfile.read(length).decode("utf-8"))

            raw_tickers = body.get("tickers", [])
            if not isinstance(raw_tickers, list):
                raise ValueError("tickers debe ser una lista")
            tickers = []
            for value in raw_tickers:
                ticker = str(value).strip().upper()
                if ticker and ticker not in tickers:
                    tickers.append(ticker)
            if not 2 <= len(tickers) <= 6:
                raise ValueError("Ingresa entre 2 y 6 tickers")
            if any(not TICKER_RE.match(t) for t in tickers):
                raise ValueError("Uno de los tickers contiene caracteres no válidos")

            benchmark = str(body.get("benchmark", "^GSPC")).strip().upper() or "^GSPC"
            if not TICKER_RE.match(benchmark):
                raise ValueError("Benchmark no válido")
            period = str(body.get("period", "3y"))
            interval = str(body.get("interval", "1d"))
            if period not in ALLOWED_PERIODS:
                raise ValueError("Periodo no permitido")
            if interval not in ALLOWED_INTERVALS:
                raise ValueError("Frecuencia no permitida")

            symbols = tickers + ([] if benchmark in tickers else [benchmark])
            raw = yf.download(
                tickers=symbols,
                period=period,
                interval=interval,
                auto_adjust=True,
                progress=False,
                threads=True,
                group_by="column",
                timeout=18,
            )
            close = _close_prices(raw, symbols)
            missing = [t for t in tickers if t not in close.columns]
            if missing:
                raise ValueError("Sin datos para: " + ", ".join(missing))
            if benchmark not in close.columns:
                raise ValueError("No se obtuvieron datos del benchmark")

            returns = close.pct_change(fill_method=None).dropna(how="any")
            if len(returns) < 20:
                raise ValueError("No hay suficientes retornos comunes")
            factor = ALLOWED_INTERVALS[interval]
            asset_returns = returns[tickers]
            ann_returns = asset_returns.mean() * factor
            ann_cov = asset_returns.cov() * factor
            ann_vol = asset_returns.std(ddof=1) * math.sqrt(factor)
            corr = asset_returns.corr()
            bench = returns[benchmark]
            bench_var = float(bench.var(ddof=1))
            betas = {
                t: (float(returns[t].cov(bench)) / bench_var if bench_var > 0 else 0.0)
                for t in tickers
            }

            normalized = close / close.iloc[0] * 100.0
            normalized = _downsample(normalized, 180)
            dates = [idx.strftime("%Y-%m-%d") for idx in normalized.index]
            normalized_dict = {
                col: [_finite(v) for v in normalized[col].tolist()]
                for col in normalized.columns
            }
            assets = []
            for t in tickers:
                assets.append({
                    "ticker": t,
                    "last": _finite(close[t].iloc[-1]),
                    "annual_return": _finite(ann_returns[t]),
                    "volatility": _finite(ann_vol[t]),
                    "beta": _finite(betas[t]),
                })

            response = {
                "source": "Yahoo Finance mediante yfinance",
                "as_of": datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC"),
                "period": period,
                "interval": interval,
                "observations": int(len(returns)),
                "tickers": tickers,
                "benchmark": benchmark,
                "assets": assets,
                "correlation": [[_finite(v) for v in row] for row in corr.to_numpy().tolist()],
                "covariance": [[_finite(v) for v in row] for row in ann_cov.to_numpy().tolist()],
                "dates": dates,
                "normalized": normalized_dict,
            }
            self._json(response)
        except Exception as exc:
            self._json({"error": str(exc)}, 400)
