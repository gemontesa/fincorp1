import React, { useState, useEffect, useRef, useMemo } from "react";
import heroCourseImage from "./hero-fincorp-curso.png";

/* ============================================================================
   FINANZAS CORPORATIVAS 1 — Guía interactiva
   Universidad del Pacífico · Guía interactiva complementaria
   ==========================================================================*/

const STORAGE_KEY = "fc1:v3";
const EDIT_ENABLED = import.meta.env.VITE_ENABLE_EDITOR === "true";
const EDIT_PASS = import.meta.env.VITE_EDIT_PASS || "cambia-esta-clave";

const fmt = (n, d = 2) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d })
    : "—";
const uid = () => Math.random().toString(36).slice(2, 9);

/* ---------------------------------------------------------------- CONTENIDO */
function sk(n, unit, title, chapters, pc) {
  return { id: "w" + n, n, unit, title, chapters, pc, blurb: "", sections: [], quiz: [] };
}

const SEED = {
  weeks: [
    {
      id: "w1", n: 1, unit: 1,
      title: "Introducción y repaso",
      chapters: "Caps. 1, 3 y 4",
      pc: "",
      blurb: "Arbitraje, ley de un solo precio, VAN, TIR, perpetuidades y anualidades.",
      sections: [
        { id: uid(), heading: "El supuesto implícito de los textos de finanzas",
          body: "Todos los textos de finanzas asumen que existe un mercado de valores profundo donde se compran y venden activos de todo tipo. Las empresas acuden a él a buscar accionistas y financistas, y para ello emiten acciones y bonos; los inversionistas invierten comprándolos.\n\nRegla de lenguaje del curso: salvo que se diga lo contrario, «obtener financiamiento» significa emitir bonos, no pedir un préstamo a un banco.",
          widget: "" },
        { id: uid(), heading: "Arbitraje y la ley de un solo precio",
          body: "El arbitraje consiste en comprar y vender bienes equivalentes en distintos mercados aprovechando diferencias de precio. Lo que lo separa de otras prácticas de trading es que genera ganancias sin incurrir en riesgo: la compra y la venta ocurren simultáneamente.\n\nComo los inversionistas buscan explotar esas oportunidades, los precios tienden a igualarse. Esa es la ley de un solo precio: si oportunidades de inversión similares se negocian simultáneamente en varios mercados competitivos, su precio será el mismo en todos. Un mercado competitivo no tiene restricciones —cualquiera puede comprar o vender—, y esa libertad de entrada es justamente lo que fuerza la convergencia.",
          widget: "arbitraje" },
        { id: uid(), heading: "Precio sin arbitraje: precio no es valor",
          body: "El precio único que sobrevive al arbitraje equivale al valor presente de todos los flujos que se espera genere el activo. Si una acción cotiza en $1,545, el VP de sus flujos esperados suma $1,545 según las expectativas del inversionista marginal: aquel que, comprando o vendiendo, puede mover el precio.\n\nPero precio y valor no son lo mismo. Un inversionista racional invierte cuando el valor que el activo tiene para él supera al precio de mercado. Y cuando el activo no se transa, no hay precio de mercado y la ley de un solo precio deja de cumplirse: el vendedor lo ofrece primero a quien más lo valora y el precio final sale de una negociación. Esa es la lógica de las operaciones de M&A.",
          widget: "precio-valor" },
        { id: uid(), heading: "De qué trata (y de qué no trata) este curso",
          body: "A un trader puede convenirle comprar un activo sobrevalorado para revenderlo aún más caro —la greater fool theory— o apostar una parte pequeña del portafolio a alto riesgo y alto retorno. El problema es que las burbujas revientan muy rápido, y miles de millones en pérdidas sustentan la afirmación de que solo los tontos creen ser más vivos que el resto del mercado.\n\nEste curso trata sobre cómo tomar decisiones generadoras de valor, no sobre cómo ganar dinero comprando y vendiendo activos.",
          widget: "" },
        { id: uid(), heading: "Valor Actual Neto (VAN)",
          body: "El VAN es la diferencia entre el valor presente de los ingresos y el de los egresos de una inversión; equivalentemente, el VP de todos los flujos de caja.\n\nSu lectura es una comparación contra el costo de oportunidad. Si la tasa de descuento es 10%: VAN igual a cero significa que la inversión rinde exactamente 10%; VAN positivo, que rinde más y cubre el costo de oportunidad con holgura; VAN negativo, que no lo cubre.\n\nDe ahí la regla: aceptar el proyecto con VAN positivo —equivale a recibir el VAN hoy, un incremento en el valor de la empresa— y rechazar el de VAN negativo. Si el VAN es cero, el valor de mercado de la empresa no cambia.",
          widget: "van" },
        { id: uid(), heading: "Tasa Interna de Retorno (TIR)",
          body: "El VAN dice cuánto genera la inversión, pero no a qué tasa. La TIR sí: es la tasa que hace que el VP de los flujos sea cero. Dicho de otro modo, el máximo costo de capital al que se pueden descontar los flujos y que el proyecto siga siendo rentable.\n\nRegla de inversión: si r es menor que la TIR se acepta (VAN positivo); si r es mayor, se rechaza (VAN negativo). Que la TIR sea X% implica que hacer la inversión se parece a ganar X% al año durante la vida del proyecto.\n\nLa advertencia importante: la regla TIR solo garantiza la misma recomendación que la regla VAN cuando todos los flujos negativos preceden a los positivos, es decir, cuando la función VAN tiene pendiente descendente y cruza el eje horizontal una sola vez. Si no, aparecen TIR inexistentes, irrazonables o múltiples.",
          widget: "tir" },
        { id: uid(), heading: "Perpetuidades y anualidades",
          body: "Son flujos de caja en intervalos regulares. La perpetuidad dura para siempre; la anualidad, un número determinado de periodos. En ambos casos los flujos pueden ser iguales o crecientes.\n\nLa advertencia que cuesta puntos en los exámenes: todas estas fórmulas entregan el valor presente en el periodo 0 de un flujo cuyo primer pago ocurre al final del primer periodo. Si el primer pago es hoy, hay que sumarlo aparte.",
          widget: "anualidades" },
        { id: uid(), heading: "Aplicación: la lotería",
          body: "Ganas $30 millones y eliges entre 30 pagos de $1 millón empezando hoy, o $15 millones hoy, con r igual a 8%. La opción a) es $1M más una anualidad a 29 años: 1 + 11.16 = $12.16M, así que conviene el pago único.\n\nPero si esos pagos crecen 2.5% al año, el VP de la anualidad creciente sube a $14.61M y la opción a) llega a $15.61M: ahora conviene la anualidad. Un cambio pequeño en g invierte la decisión.",
          widget: "loteria" },
      ],
      quiz: [
        { id: uid(), q: "¿Qué distingue al arbitraje de otras prácticas de trading?",
          o: ["Genera ganancias asumiendo alto riesgo", "Genera ganancias sin incurrir en riesgo", "Solo funciona en mercados con restricciones", "Exige mantener el activo a largo plazo"],
          a: 1, e: "La compra y la venta son simultáneas: se captura la diferencia de precio sin exposición al riesgo." },
        { id: uid(), q: "¿Por qué la ley de un solo precio exige mercados competitivos?",
          o: ["Porque así el regulador fija el precio", "Porque elimina la necesidad de valorar", "Porque sin restricciones cualquiera puede arbitrar, y eso iguala los precios", "Porque garantiza que precio y valor coincidan para todos"],
          a: 2, e: "La libre entrada de arbitrajistas es el mecanismo que fuerza la convergencia de precios." },
        { id: uid(), q: "Una acción cotiza en $1,545. ¿Qué implica el precio sin arbitraje?",
          o: ["Que todos los inversionistas esperan exactamente esos flujos", "Que el VP de los flujos esperados por el inversionista marginal suma $1,545", "Que el valor subjetivo de cada inversionista es $1,545", "Que la acción no tiene riesgo"],
          a: 1, e: "El precio refleja las expectativas del inversionista marginal, no las de todos." },
        { id: uid(), q: "¿Cuál afirmación separa correctamente precio de valor?",
          o: ["El precio es subjetivo; el valor, objetivo", "El precio se estima; el valor se observa", "El precio es objetivo y observable; el valor es subjetivo y estimado", "Ambos dependen solo de oferta y demanda"],
          a: 2, e: "El precio sale de la oferta y la demanda y se observa. El valor depende de flujos, riesgo y crecimiento, y hay que estimarlo." },
        { id: uid(), q: "Un proyecto tiene VAN positivo con r = 10%. ¿Qué se concluye?",
          o: ["Su TIR es menor a 10%", "Rinde exactamente 10%", "Rinde más de 10% y aceptarlo aumenta el valor de la empresa", "El valor de la empresa no cambia"],
          a: 2, e: "VAN positivo implica TIR mayor que r: la inversión cubre el costo de oportunidad con holgura y aceptarla equivale a recibir el VAN hoy." },
        { id: uid(), q: "¿Cuándo la regla TIR coincide con la regla VAN?",
          o: ["Siempre", "Cuando los flujos negativos preceden a los positivos y la función VAN cruza el eje una sola vez", "Solo cuando existen múltiples TIR", "Cuando la TIR es negativa"],
          a: 1, e: "Con esa estructura la función VAN es decreciente y cruza el eje una vez. Si no, hay TIR múltiple, irrazonable o inexistente." },
        { id: uid(), q: "Fiesta de $30,000 al año para siempre, r = 8%, primera fiesta en un año. ¿Cuánto se dona?",
          o: ["$240,000", "$375,000", "$405,000", "$750,000"],
          a: 1, e: "VP = C/r = 30,000/0.08 = $375,000. Si la primera fiesta fuera hoy serían $405,000." },
        { id: uid(), q: "Si esa fiesta crece 4% anual (g menor que r), ¿cuánto hay que donar?",
          o: ["$375,000", "$500,000", "$750,000", "$1,000,000"],
          a: 2, e: "VP = C/(r−g) = 30,000/(0.08−0.04) = $750,000." },
      ],
    },
    {
      id: "w2", n: 2, unit: 1,
      title: "Precio del riesgo y portafolio óptimo",
      chapters: "Caps. 10 y 11",
      pc: "",
      blurb: "Riesgo sistemático, diversificación, beta y CAPM: cómo el mercado convierte riesgo en una tasa de descuento.",
      sections: [
        { id: "w2s1", heading: "Empecemos por el final: ¿qué tasa descuenta un proyecto?",
          body: "Para decidir si un proyecto crea valor necesitamos calcular su VAN. El punto difícil no es solo proyectar los flujos: también debemos elegir una tasa de descuento coherente con el riesgo de la inversión. Esa tasa es el costo de capital.\n\nLa intuición es directa: invertir en un proyecto significa renunciar a otra inversión de riesgo y plazo similares. Por eso, tasa de descuento, costo de capital y costo de oportunidad describen la misma idea desde tres ángulos distintos.",
          widget: "precio-riesgo" },
        { id: "w2s2", heading: "El rendimiento mínimo tiene dos piezas",
          body: "Un inversionista exige una compensación por esperar y otra por asumir riesgo. La compensación por esperar es la tasa libre de riesgo. La compensación por arriesgar es la prima por riesgo.\n\nAsí, el rendimiento mínimo requerido se construye como: tasa libre de riesgo + prima por riesgo. La pregunta central del tema es qué riesgo merece una prima y cuánto debe pagarse por él.",
          widget: "" },
        { id: "w2s3", heading: "Riesgo total: volatilidad sistemática e idiosincrática",
          body: "En finanzas, el riesgo total suele aproximarse mediante la varianza o el desvío estándar de los retornos. Pero esa volatilidad tiene dos fuentes.\n\nEl riesgo sistemático es el componente común que se mueve con la economía y el mercado: recesiones, expansiones, tasas de interés o shocks globales. El riesgo idiosincrático es específico de una empresa: una falla operativa, la pérdida de un cliente o un problema de gestión. El primero afecta a muchas inversiones al mismo tiempo; el segundo puede promediarse al combinar empresas distintas.",
          widget: "diversificacion" },
        { id: "w2s4", heading: "Por qué la diversificación elimina un riesgo, pero no el otro",
          body: "Al añadir empresas independientes a un portafolio, las sorpresas específicas positivas y negativas tienden a compensarse. Por eso, el riesgo idiosincrático por empresa cae conforme aumenta el número de activos.\n\nEl riesgo sistemático no desaparece: si toda la economía se contrae, muchas empresas sufrirán simultáneamente. La diversificación reduce el ruido propio de cada empresa, pero no puede borrar el movimiento común del mercado.",
          widget: "" },
        { id: "w2s5", heading: "La prima por riesgo idiosincrático es cero",
          body: "Un inversionista puede eliminar el riesgo específico sin sacrificar rendimiento esperado simplemente diversificando. En un mercado competitivo, nadie recibe una compensación por asumir voluntariamente un riesgo que podía eliminar casi gratis.\n\nDe aquí salen dos principios: la prima por riesgo diversificable es cero, y la prima total de un activo depende de su exposición al riesgo sistemático, no de su volatilidad específica.",
          widget: "" },
        { id: "w2s6", heading: "El portafolio del mercado como referencia",
          body: "Para medir el riesgo sistemático necesitamos un portafolio que ya esté ampliamente diversificado. El portafolio del mercado contiene todos los activos y, conceptualmente, no puede diversificarse más sin cambiar su rendimiento esperado.\n\nEn la práctica se usa un índice amplio como aproximación. El material del curso utiliza al S&P 500 como proxy y advierte que no cualquier índice representa adecuadamente al mercado completo; un índice pequeño o concentrado puede ser una referencia deficiente.",
          widget: "" },
        { id: "w2s7", heading: "Beta: sensibilidad al movimiento del mercado",
          body: "La beta mide cuánto cambia, en promedio, el rendimiento de una inversión cuando el rendimiento del mercado cambia 1%. No mide todo el riesgo de la empresa: mide únicamente la parte vinculada al mercado.\n\nUna beta mayor que 1 implica más sensibilidad que el mercado; una beta menor que 1, menos sensibilidad; y una beta igual a 1 reproduce el movimiento sistemático promedio del mercado.",
          widget: "beta" },
        { id: "w2s8", heading: "CAPM: convertir beta en costo de capital",
          body: "El CAPM conecta la exposición sistemática con el rendimiento requerido: E[R] = rf + β × (E[Rm] − rf). La expresión entre paréntesis es la prima por riesgo del mercado.\n\nLa beta decide qué proporción de esa prima debe exigir el inversionista. Una inversión con beta 2 exige el doble de la prima de mercado; una con beta 0.5 exige la mitad. El resultado es el costo de capital que debe usarse para evaluar proyectos con ese nivel de riesgo.",
          widget: "capm" },
        { id: "w2s9", heading: "Ejemplo comparativo: dos empresas, dos costos de capital",
          body: "Con una tasa libre de riesgo de 5% y una prima de mercado de 6%, una acción con beta 2.80 exige 21.8%: 5% + 2.80 × 6%. En cambio, una acción con beta 0.10 exige 5.6%.\n\nLa diferencia no surge de cuánto nos guste cada empresa, sino de cuánto amplifica o amortigua los movimientos del mercado. La beta convierte esa sensibilidad en una tasa mínima observable y comparable.",
          widget: "" },
      ],
      quiz: [
        { id: "w2q1", q: "¿Por qué el costo de capital es también un costo de oportunidad?",
          o: ["Porque siempre coincide con la inflación", "Porque representa el rendimiento de una alternativa de riesgo y plazo similares", "Porque es el interés de cualquier préstamo bancario", "Porque depende únicamente del tamaño del proyecto"],
          a: 1, e: "Invertir en el proyecto implica renunciar a la mejor alternativa comparable; su rendimiento requerido es el costo de oportunidad." },
        { id: "w2q2", q: "¿Qué parte del riesgo recibe una prima en un mercado competitivo?",
          o: ["Todo el riesgo total", "Solo el riesgo idiosincrático", "Solo el riesgo sistemático", "Ningún tipo de riesgo"],
          a: 2, e: "El riesgo idiosincrático puede diversificarse. La compensación corresponde al componente sistemático que permanece." },
        { id: "w2q3", q: "¿Qué ocurre con el riesgo idiosincrático al aumentar el número de empresas independientes del portafolio?",
          o: ["Aumenta linealmente", "Permanece exactamente igual", "Tiende a reducirse por diversificación", "Se transforma en tasa libre de riesgo"],
          a: 2, e: "Las sorpresas específicas se promedian entre empresas y su contribución al riesgo del portafolio disminuye." },
        { id: "w2q4", q: "¿Por qué el riesgo sistemático no puede eliminarse diversificando?",
          o: ["Porque solo afecta a una empresa", "Porque afecta simultáneamente a gran parte del mercado", "Porque su beta siempre es cero", "Porque depende del número de acciones"],
          a: 1, e: "Los shocks macroeconómicos mueven muchos activos al mismo tiempo, por lo que añadir más empresas no los cancela." },
        { id: "w2q5", q: "Una acción tiene β = 1.5. ¿Cuál es la interpretación correcta?",
          o: ["Tiene 1.5% de volatilidad total", "Se espera que su componente sistemático se mueva 1.5% cuando el mercado se mueve 1%", "Rinde siempre 1.5 veces más que el mercado", "Su riesgo idiosincrático es cero"],
          a: 1, e: "Beta mide sensibilidad sistemática, no retorno garantizado ni volatilidad total." },
        { id: "w2q6", q: "Si rf = 4%, la prima de mercado = 6% y β = 2, ¿cuál es el costo de capital?",
          o: ["10%", "12%", "16%", "20%"],
          a: 2, e: "CAPM: 4% + 2 × 6% = 16%." },
        { id: "w2q7", q: "¿Qué significa que una inversión tenga β = 0.5?",
          o: ["No tiene ningún riesgo", "Su sensibilidad sistemática es aproximadamente la mitad de la del mercado", "Su rendimiento siempre es 50%", "Tiene el doble de riesgo idiosincrático"],
          a: 1, e: "La beta compara la respuesta del activo frente a variaciones del mercado." },
        { id: "w2q8", q: "¿Por qué la prima por riesgo idiosincrático tiende a cero?",
          o: ["Porque las empresas nunca enfrentan riesgos propios", "Porque puede eliminarse mediante diversificación y una prima positiva generaría una oportunidad competitiva", "Porque el mercado siempre sube", "Porque la tasa libre de riesgo ya incluye todos los riesgos"],
          a: 1, e: "Los inversionistas pueden evitar ese riesgo diversificando; no necesitan ser compensados por mantenerlo." },
        { id: "w2q9", q: "Con rf = 5%, prima de mercado = 6% y β = 0.10, el rendimiento requerido es:",
          o: ["5.0%", "5.6%", "6.0%", "11.0%"],
          a: 1, e: "5% + 0.10 × 6% = 5.6%." },
      ],
    },
    sk(3, 1, "Costo de capital", "Caps. 11 y 12", ""),
    sk(4, 1, "Estructura de capital en mercados perfectos", "Cap. 14", ""),
    sk(5, 2, "Deuda e impuestos", "Cap. 15", "PC1"),
    sk(6, 2, "Dificultades financieras", "Cap. 16", ""),
    sk(7, 2, "Política de pagos", "Cap. 17", ""),
    sk(8, 2, "Semana de parciales", "—", "Parcial"),
    sk(9, 3, "Contabilidad financiera y ratios", "Cap. 2", ""),
    sk(10, 3, "Valoración relativa (múltiplos)", "Caps. 17 y 18", "PC2"),
    sk(11, 3, "Evaluación de proyectos de inversión", "Caps. 8, 18 y 19", ""),
    sk(12, 3, "Metodologías de valoración 1", "Caps. 8, 18 y 19", ""),
    sk(13, 3, "Metodologías de valoración 2", "Caps. 8, 18 y 19", ""),
    sk(14, 3, "Opciones reales 1", "Caps. 20 y 21", "PC3"),
    sk(15, 3, "Opciones reales 2", "Cap. 22", ""),
    sk(16, 3, "Semana de finales", "—", "Final"),
  ],
};

const UNITS = {
  1: { tag: "Unidad 1", name: "Riesgo y retorno" },
  2: { tag: "Unidad 2", name: "Estructura de capital" },
  3: { tag: "Unidad 3", name: "Valoración de inversiones" },
};

/* ------------------------------------------------------------- PERSISTENCIA */
async function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
async function persist(d) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
    return true;
  } catch (e) {
    return false;
  }
}

/* ========================================================= PIEZAS COMPARTIDAS */
function Slider({ label, value, min, max, step, onChange, suffix = "", d = 0 }) {
  return (
    <div className="w-ctl">
      <div className="w-ctl-top">
        <span>{label}</span>
        <b>{fmt(value, d)}{suffix}</b>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))} />
    </div>
  );
}

function Widget({ title, hint, children }) {
  return (
    <div className="wgt">
      <div className="wgt-head">
        <span className="wgt-kicker">Interactivo</span>
        <h4>{title}</h4>
        <p>{hint}</p>
      </div>
      <div className="wgt-body">{children}</div>
    </div>
  );
}

/* ------------------------------------------------- 1. ARBITRAJE */
function WArbitraje() {
  const [ny, setNy] = useState(2050);
  const [ldn, setLdn] = useState(2000);
  const [qty, setQty] = useState(100);
  const [settled, setSettled] = useState(false);

  const gap = ny - ldn;
  const opp = Math.abs(gap) > 0.5;
  const profit = Math.abs(gap) * qty;
  const buy = gap > 0 ? "Londres" : "Nueva York";
  const sell = gap > 0 ? "Nueva York" : "Londres";

  const converge = () => {
    const mid = (ny + ldn) / 2;
    setSettled(true);
    const t = setInterval(() => {
      setNy((v) => (Math.abs(v - mid) < 1 ? mid : v + (mid - v) * 0.35));
      setLdn((v) => (Math.abs(v - mid) < 1 ? mid : v + (mid - v) * 0.35));
    }, 60);
    setTimeout(() => { clearInterval(t); setNy(mid); setLdn(mid); }, 900);
  };
  const reopen = () => { setNy(2050); setLdn(2000); setSettled(false); };
  const h = (p) => Math.max(5, ((p - 1900) / 260) * 100);

  return (
    <Widget title="El oro en dos mercados"
      hint="Mueve los precios y mira cuándo se abre la oportunidad. Ejecuta el arbitraje y observa qué le pasa a los precios.">
      <div className="arb">
        <div className="arb-mkts">
          {[{ n: "Londres", p: ldn }, { n: "Nueva York", p: ny }].map((m) => (
            <div key={m.n} className="arb-mkt">
              <div className="arb-name">{m.n}</div>
              <div className="arb-track">
                <div className="arb-fill" style={{ height: h(m.p) + "%" }} />
              </div>
              <div className="arb-price">${fmt(m.p, 0)}</div>
              <div className="arb-role">{opp ? (m.n === buy ? "COMPRAR" : "VENDER") : "—"}</div>
            </div>
          ))}
        </div>
        <div className="arb-panel">
          <Slider label="Precio en Londres" value={ldn} min={1900} max={2160} step={5}
            onChange={(v) => { setLdn(v); setSettled(false); }} suffix=" /oz" />
          <Slider label="Precio en Nueva York" value={ny} min={1900} max={2160} step={5}
            onChange={(v) => { setNy(v); setSettled(false); }} suffix=" /oz" />
          <Slider label="Onzas negociadas" value={qty} min={10} max={500} step={10} onChange={setQty} />

          {opp ? (
            <div className="w-out w-out-go">
              <div className="w-out-big">${fmt(profit, 0)}</div>
              <div className="w-out-lbl">
                Ganancia libre de riesgo: compras en {buy} y vendes en {sell} al mismo tiempo.
                No hay riesgo porque no mantienes posición: ambas operaciones son simultáneas.
              </div>
              {!settled && <button className="w-btn" onClick={converge}>Ejecutar el arbitraje</button>}
            </div>
          ) : (
            <div className="w-out w-out-neutral">
              <div className="w-out-big">$0</div>
              <div className="w-out-lbl">
                Precio único: no queda arbitraje posible. Esto es la <b>ley de un solo precio</b>,
                el resultado al que los arbitrajistas empujan al mercado.
              </div>
              <button className="w-btn w-btn-ghost" onClick={reopen}>Reabrir la brecha</button>
            </div>
          )}
        </div>
      </div>
    </Widget>
  );
}

/* ------------------------------------------------- 2. PRECIO VS VALOR */
function WPrecioValor() {
  const price = 1545;
  const [value, setValue] = useState(1700);
  const diff = value - price;
  const pct = (v) => Math.min(97, Math.max(3, ((v - 1200) / 700) * 100));
  const act = diff > 0 ? "COMPRAR" : diff < 0 ? "NO COMPRAR" : "INDIFERENTE";

  return (
    <Widget title="El precio lo pone el mercado; el valor lo pones tú"
      hint="El precio es uno solo y se observa. El valor lo estima cada inversionista, y de esa brecha sale la decisión.">
      <div className="pv-line">
        <div className="pv-axis" />
        <div className="pv-pin pv-price" style={{ left: pct(price) + "%" }}>
          <span className="pv-tag">Precio de mercado</span>
          <b>${fmt(price, 0)}</b>
        </div>
        <div className="pv-pin pv-value" style={{ left: pct(value) + "%" }}>
          <b>${fmt(value, 0)}</b>
          <span className="pv-tag">Tu valor estimado</span>
        </div>
      </div>
      <Slider label="Tu estimación del VP de los flujos" value={value} min={1200} max={1900}
        step={5} onChange={setValue} />
      <div className={"w-out " + (diff > 0 ? "w-out-go" : diff < 0 ? "w-out-no" : "w-out-neutral")}>
        <div className="w-out-big">{act}</div>
        <div className="w-out-lbl">
          {diff > 0
            ? `La valoras $${fmt(diff, 0)} por encima del precio: para ti está infravalorada.`
            : diff < 0
            ? `La valoras $${fmt(-diff, 0)} por debajo del precio: para ti está sobrevalorada.`
            : "Tu valor coincide con el precio: eres el inversionista marginal."}
          <br />
          El precio es <b>objetivo y observable</b>; tu valor es <b>subjetivo y estimado</b>.
          Cuando el activo no se transa no hay precio, y el resultado sale de una negociación: M&amp;A.
        </div>
      </div>
    </Widget>
  );
}

/* ------------------------------------------------- 3. VAN */
function WVan() {
  const [flows, setFlows] = useState([-500, 200, 220, 260]);
  const [r, setR] = useState(10);
  const rate = r / 100;
  const van = flows.reduce((s, cf, t) => s + cf / Math.pow(1 + rate, t), 0);
  const mx = Math.max(...flows.map((f) => Math.abs(f)), 1);
  const setFlow = (i, v) => setFlows((f) => f.map((x, k) => (k === i ? v : x)));

  return (
    <Widget title="Construye el VAN flujo por flujo"
      hint="La barra clara es el flujo nominal; la oscura, su valor presente. Mira cómo se encoge con el tiempo y con la tasa.">
      <div className="van-chart">
        {flows.map((cf, t) => {
          const pv = cf / Math.pow(1 + rate, t);
          const neg = cf < 0;
          return (
            <div key={t} className="van-col">
              <div className="van-plot">
                <div className="van-zero" />
                <div className={"van-wrap " + (neg ? "neg" : "pos")}>
                  <div className="van-ghost" style={{ height: (Math.abs(cf) / mx) * 100 + "%" }} />
                  <div className="van-bar" style={{ height: (Math.abs(pv) / mx) * 100 + "%" }} />
                </div>
              </div>
              <div className="van-t">t = {t}</div>
              <input className="van-inp" type="number" value={cf}
                onChange={(e) => setFlow(t, parseFloat(e.target.value) || 0)} />
              <div className="van-pv">VP {fmt(pv, 1)}</div>
            </div>
          );
        })}
      </div>
      <Slider label="Costo de oportunidad r" value={r} min={0} max={30} step={0.5} onChange={setR}
        suffix="%" d={1} />
      <div className={"w-out " + (van > 0.01 ? "w-out-go" : van < -0.01 ? "w-out-no" : "w-out-neutral")}>
        <div className="w-out-big">VAN = {fmt(van, 2)}</div>
        <div className="w-out-lbl">
          {van > 0.01
            ? "ACEPTAR. Rinde más que el costo de oportunidad; aceptar equivale a recibir el VAN hoy y aumenta el valor de la empresa."
            : van < -0.01
            ? "RECHAZAR. No cubre el costo de oportunidad; aceptarlo equivale a perder el VAN hoy."
            : "INDIFERENTE. Rinde exactamente r y el valor de mercado de la empresa no cambia."}
        </div>
      </div>
    </Widget>
  );
}

/* ------------------------------------------------- 4. CURVA VAN / TIR */
function WTir() {
  const [preset, setPreset] = useState("normal");
  const [r, setR] = useState(10);

  const flows = useMemo(
    () => ({ normal: [-500, 180, 200, 220, 240], multiple: [-100, 460, -700, 350] }[preset]),
    [preset]
  );
  const npv = useMemo(
    () => (rate) => flows.reduce((s, cf, t) => s + cf / Math.pow(1 + rate, t), 0),
    [flows]
  );

  const roots = useMemo(() => {
    const out = [];
    const N = 1500, HI = 1.0;
    let prev = npv(0.0005);
    for (let i = 1; i <= N; i++) {
      const x = (i / N) * HI;
      const cur = npv(x);
      if ((prev < 0) !== (cur < 0)) {
        let lo = ((i - 1) / N) * HI, up = x;
        for (let k = 0; k < 60; k++) {
          const m = (lo + up) / 2;
          if ((npv(lo) < 0) !== (npv(m) < 0)) up = m; else lo = m;
        }
        out.push((lo + up) / 2);
      }
      prev = cur;
    }
    return out;
  }, [npv]);

  const W = 520, H = 215, L = 44, B = 30, T = 14, R = 14, RMAX = 0.6;
  const pts = [];
  for (let i = 0; i <= 140; i++) { const x = (i / 140) * RMAX; pts.push([x, npv(x)]); }
  const ys = pts.map((p) => p[1]);
  const yMax = Math.max(...ys, 10), yMin = Math.min(...ys, -10);
  const X = (v) => L + (v / RMAX) * (W - L - R);
  const Y = (v) => T + (1 - (v - yMin) / (yMax - yMin)) * (H - T - B);
  const d = pts.map((p, i) => (i ? "L" : "M") + X(p[0]).toFixed(1) + " " + Y(p[1]).toFixed(1)).join(" ");
  const cur = npv(r / 100);
  const inRange = roots.filter((t) => t <= RMAX);

  return (
    <Widget title="La curva del VAN y dónde vive la TIR"
      hint="La TIR es donde la curva cruza el eje. Cambia el patrón de flujos y observa cómo se rompe la regla.">
      <div className="tabs">
        <button className={preset === "normal" ? "on" : ""} onClick={() => setPreset("normal")}>
          Flujos convencionales (− + + +)
        </button>
        <button className={preset === "multiple" ? "on" : ""} onClick={() => setPreset("multiple")}>
          Flujos alternados (− + − +)
        </button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="chart">
        <line x1={L} y1={Y(0)} x2={W - R} y2={Y(0)} className="ax" />
        <line x1={L} y1={T} x2={L} y2={H - B} className="ax" />
        {[0, 0.15, 0.3, 0.45, 0.6].map((t) => (
          <g key={t}>
            <line x1={X(t)} y1={H - B} x2={X(t)} y2={H - B + 4} className="ax" />
            <text x={X(t)} y={H - B + 16} className="tk" textAnchor="middle">{Math.round(t * 100)}%</text>
          </g>
        ))}
        <text x={L - 8} y={Y(0) + 4} className="tk" textAnchor="end">0</text>
        <text x={L - 8} y={T + 8} className="tk" textAnchor="end">VAN</text>
        <path d={d} className="curve" />
        <line x1={X(r / 100)} y1={T} x2={X(r / 100)} y2={H - B} className="rline" />
        {inRange.map((t, i) => (
          <g key={i}>
            <circle cx={X(t)} cy={Y(0)} r="5" className="rootdot" />
            <text x={X(t)} y={Y(0) - 11} className="rootlbl" textAnchor="middle">
              TIR {fmt(t * 100, 1)}%
            </text>
          </g>
        ))}
        <circle cx={X(r / 100)} cy={Y(cur)} r="5.5" className={cur >= 0 ? "dotp" : "dotn"} />
      </svg>

      <Slider label="Costo de capital r" value={r} min={0} max={60} step={0.5} onChange={setR}
        suffix="%" d={1} />

      <div className={"w-out " + (cur > 0.01 ? "w-out-go" : cur < -0.01 ? "w-out-no" : "w-out-neutral")}>
        <div className="w-out-big">VAN = {fmt(cur, 1)}</div>
        <div className="w-out-lbl">
          {preset === "normal" ? (
            <>
              Los flujos negativos preceden a los positivos: la curva desciende y cruza el eje{" "}
              <b>una sola vez</b>. Aquí la regla TIR y la regla VAN siempre coinciden —
              {r / 100 < inRange[0]
                ? " r está por debajo de la TIR, así que aceptar."
                : " r está por encima de la TIR, así que rechazar."}
            </>
          ) : (
            <>
              Los flujos cambian de signo más de una vez y la curva cruza el eje{" "}
              <b>{inRange.length} veces</b>. Con múltiples TIR, «acepto si r es menor que la TIR» deja
              de significar algo: hay que decidir con el VAN.
            </>
          )}
        </div>
      </div>
    </Widget>
  );
}

/* ------------------------------------------------- 5. PERPETUIDADES Y ANUALIDADES */
function WAnualidades() {
  const [kind, setKind] = useState("perp");
  const [C, setC] = useState(30000);
  const [r, setR] = useState(8);
  const [g, setG] = useState(4);
  const [N, setN] = useState(20);
  const [now, setNow] = useState(false);

  const rr = r / 100, gg = g / 100;
  const growing = kind === "perpG" || kind === "annG";
  const finite = kind === "ann" || kind === "annG";
  const bad = growing && gg >= rr;

  let vp = 0, formula = "";
  if (kind === "perp") { vp = C / rr; formula = "VP = C / r"; }
  if (kind === "perpG") { vp = C / (rr - gg); formula = "VP = C / (r − g)"; }
  if (kind === "ann") { vp = C * (1 / rr) * (1 - 1 / Math.pow(1 + rr, N)); formula = "VP = C × (1/r) × [1 − 1/(1+r)^N]"; }
  if (kind === "annG") { vp = C * (1 / (rr - gg)) * (1 - Math.pow((1 + gg) / (1 + rr), N)); formula = "VP = C × 1/(r−g) × [1 − ((1+g)/(1+r))^N]"; }
  const total = bad ? NaN : vp + (now ? C : 0);

  const K = finite ? Math.min(N, 8) : 8;
  const bars = [];
  for (let t = 1; t <= K; t++) {
    const cf = C * (growing ? Math.pow(1 + gg, t - 1) : 1);
    bars.push({ t, cf, pv: cf / Math.pow(1 + rr, t) });
  }
  const mx = Math.max(...bars.map((b) => b.cf), C, 1);

  return (
    <Widget title="Las cuatro fórmulas, en un solo lugar"
      hint="Barra clara: el flujo nominal. Barra oscura: su valor presente. Fíjate en la casilla del final.">
      <div className="tabs">
        {[["perp", "Perpetuidad"], ["perpG", "Perpetuidad creciente"], ["ann", "Anualidad"], ["annG", "Anualidad creciente"]]
          .map(([k, l]) => (
            <button key={k} className={kind === k ? "on" : ""} onClick={() => setKind(k)}>{l}</button>
          ))}
      </div>

      <div className="an-time">
        {now && (
          <div className="an-col">
            <div className="an-wrap">
              <div className="an-ghost now" style={{ height: (C / mx) * 100 + "%" }} />
              <div className="an-bar now" style={{ height: (C / mx) * 100 + "%" }} />
            </div>
            <div className="an-t">0</div>
          </div>
        )}
        {bars.map((b) => (
          <div key={b.t} className="an-col">
            <div className="an-wrap">
              <div className="an-ghost" style={{ height: (b.cf / mx) * 100 + "%" }} />
              <div className="an-bar" style={{ height: (b.pv / mx) * 100 + "%" }} />
            </div>
            <div className="an-t">{b.t}</div>
          </div>
        ))}
        <div className="an-inf">{finite ? (N > 8 ? "··· " + N : "") : "··· ∞"}</div>
      </div>

      <div className="grid2">
        <Slider label="Flujo C" value={C} min={1000} max={100000} step={1000} onChange={setC} />
        <Slider label="Tasa r" value={r} min={1} max={20} step={0.5} onChange={setR} suffix="%" d={1} />
        {growing && <Slider label="Crecimiento g" value={g} min={0} max={19} step={0.5} onChange={setG} suffix="%" d={1} />}
        {finite && <Slider label="Periodos N" value={N} min={1} max={40} step={1} onChange={setN} />}
      </div>

      <label className="an-check">
        <input type="checkbox" checked={now} onChange={(e) => setNow(e.target.checked)} />
        <span>El primer flujo ocurre <b>hoy</b> (t = 0), no al final del primer periodo</span>
      </label>

      <div className={"w-out " + (bad ? "w-out-no" : "w-out-go")}>
        {bad ? (
          <>
            <div className="w-out-big">Sin solución</div>
            <div className="w-out-lbl">
              La fórmula solo vale cuando <b>g es menor que r</b>. Si el flujo crece igual o más rápido
              que la tasa a la que se descuenta, el valor presente no converge.
            </div>
          </>
        ) : (
          <>
            <div className="w-out-big">VP = ${fmt(total, 0)}</div>
            <div className="w-out-lbl">
              <code>{formula}</code>{now && <> &nbsp;+ C, el pago de hoy, que no se descuenta</>}
              <br />
              La fórmula entrega el valor en t = 0 de un flujo que empieza <b>al final del primer
              periodo</b>. Marcar la casilla suma el pago inmediato aparte: ese es el error clásico
              de examen.
            </div>
          </>
        )}
      </div>
    </Widget>
  );
}

/* ------------------------------------------------- 6. LOTERÍA */
function WLoteria() {
  const [r, setR] = useState(8);
  const [g, setG] = useState(0);
  const [lump, setLump] = useState(15);

  const rr = r / 100, gg = g / 100, C = 1, N = 29;
  const annuity = gg === 0
    ? C * (1 / rr) * (1 - 1 / Math.pow(1 + rr, N))
    : C * (1 / (rr - gg)) * (1 - Math.pow((1 + gg) / (1 + rr), N));
  const optA = C + annuity;
  const win = optA > lump;
  const w = (v) => Math.max(6, (v / Math.max(optA, lump)) * 100);

  return (
    <Widget title="¿Pagos anuales o cheque único?"
      hint="30 pagos de $1 millón empezando hoy, contra un pago único. Todo depende de r y de g.">
      <div className="lt-row">
        <div className="lt-lbl">a) 30 pagos anuales<small>$1M hoy + anualidad a 29 años</small></div>
        <div className="lt-track">
          <div className={"lt-fill" + (win ? " win" : "")} style={{ width: w(optA) + "%" }}>
            ${fmt(optA, 2)}M
          </div>
        </div>
      </div>
      <div className="lt-row">
        <div className="lt-lbl">b) Cheque único hoy<small>no se descuenta</small></div>
        <div className="lt-track">
          <div className={"lt-fill" + (!win ? " win" : "")} style={{ width: w(lump) + "%" }}>
            ${fmt(lump, 2)}M
          </div>
        </div>
      </div>

      <div className="grid2">
        <Slider label="Tasa de interés r" value={r} min={2} max={15} step={0.5} onChange={setR} suffix="%" d={1} />
        <Slider label="Crecimiento de los pagos g" value={g} min={0} max={7} step={0.5} onChange={setG} suffix="%" d={1} />
        <Slider label="Cheque único" value={lump} min={8} max={25} step={0.5} onChange={setLump} suffix="M" d={1} />
      </div>

      <div className={"w-out " + (win ? "w-out-go" : "w-out-no")}>
        <div className="w-out-big">Conviene la opción {win ? "a): los pagos anuales" : "b): el cheque único"}</div>
        <div className="w-out-lbl">
          Diferencia de ${fmt(Math.abs(optA - lump), 2)}M en valor presente. Con r = 8% y g = 0 la
          anualidad vale $12.16M y pierde contra los $15M. Sube g a 2.5% y llega a $15.61M: la
          decisión se invierte sin que cambie un solo pago nominal.
        </div>
      </div>
    </Widget>
  );
}


/* ------------------------------------------------- 7. PRECIO DEL RIESGO */
function WPrecioRiesgo() {
  const [rf, setRf] = useState(4);
  const [mrp, setMrp] = useState(6);
  const [beta, setBeta] = useState(1.2);
  const premium = beta * mrp;
  const required = rf + premium;
  const max = Math.max(required, 1);

  return (
    <Widget title="Desarma el rendimiento mínimo requerido"
      hint="La tasa libre de riesgo paga por esperar. Beta por la prima de mercado paga por soportar riesgo sistemático.">
      <div className="risk-formula">
        <div className="risk-piece">
          <span>Compensación por esperar</span>
          <b>{fmt(rf, 1)}%</b>
          <small>Tasa libre de riesgo</small>
        </div>
        <div className="risk-op">+</div>
        <div className="risk-piece">
          <span>Compensación por arriesgar</span>
          <b>{fmt(premium, 1)}%</b>
          <small>β × prima de mercado</small>
        </div>
        <div className="risk-op">=</div>
        <div className="risk-piece total">
          <span>Costo de capital</span>
          <b>{fmt(required, 1)}%</b>
          <small>Tasa de descuento</small>
        </div>
      </div>

      <div className="return-stack" aria-label="Composición del costo de capital">
        <div className="return-rf" style={{ width: (rf / max) * 100 + "%" }}>rf</div>
        <div className="return-risk" style={{ width: (premium / max) * 100 + "%" }}>prima</div>
      </div>

      <div className="grid2">
        <Slider label="Tasa libre de riesgo rf" value={rf} min={0} max={10} step={0.5} onChange={setRf} suffix="%" d={1} />
        <Slider label="Prima de riesgo del mercado" value={mrp} min={1} max={12} step={0.5} onChange={setMrp} suffix="%" d={1} />
        <Slider label="Beta de la inversión" value={beta} min={0} max={3} step={0.1} onChange={setBeta} d={1} />
      </div>

      <div className="w-out w-out-go">
        <div className="w-out-big">Rendimiento mínimo = {fmt(required, 1)}%</div>
        <div className="w-out-lbl">
          La inversión debe ofrecer al menos esta tasa para compensar una alternativa de riesgo y plazo comparables.
          Una beta mayor no cambia la compensación por esperar; aumenta únicamente la compensación por riesgo sistemático.
        </div>
      </div>
    </Widget>
  );
}

/* ------------------------------------------------- 8. DIVERSIFICACIÓN */
function WDiversificacion() {
  const [n, setN] = useState(1);
  const [sys, setSys] = useState(10);
  const [idio, setIdio] = useState(24);
  const residual = idio / Math.sqrt(n);
  const total = Math.sqrt(sys * sys + residual * residual);

  const W = 520, H = 220, L = 42, R = 18, T = 18, B = 30;
  const yMax = Math.sqrt(sys * sys + idio * idio) * 1.08;
  const X = (v) => L + ((v - 1) / 99) * (W - L - R);
  const Y = (v) => T + (1 - v / yMax) * (H - T - B);
  const pts = [];
  for (let k = 1; k <= 100; k++) {
    const id = idio / Math.sqrt(k);
    pts.push([k, Math.sqrt(sys * sys + id * id)]);
  }
  const d = pts.map((p, i) => `${i ? "L" : "M"}${X(p[0]).toFixed(1)} ${Y(p[1]).toFixed(1)}`).join(" ");

  return (
    <Widget title="Qué riesgo desaparece al añadir empresas"
      hint="El modelo supone posiciones similares y riesgos específicos independientes. La curva cae, pero nunca perfora el piso sistemático.">
      <svg viewBox={`0 0 ${W} ${H}`} className="chart div-chart">
        <line x1={L} y1={Y(sys)} x2={W - R} y2={Y(sys)} className="sysline" />
        <text x={W - R} y={Y(sys) - 7} className="syslbl" textAnchor="end">piso sistemático</text>
        <line x1={L} y1={H - B} x2={W - R} y2={H - B} className="ax" />
        <line x1={L} y1={T} x2={L} y2={H - B} className="ax" />
        <path d={d} className="curve" />
        <line x1={X(n)} y1={T} x2={X(n)} y2={H - B} className="rline" />
        <circle cx={X(n)} cy={Y(total)} r="6" className="dotp" />
        <text x={L} y={H - 9} className="tk">1 empresa</text>
        <text x={W - R} y={H - 9} className="tk" textAnchor="end">100 empresas</text>
        <text x={L - 7} y={T + 5} className="tk" textAnchor="end">riesgo</text>
      </svg>

      <div className="risk-meters">
        <div className="risk-meter">
          <span>Riesgo sistemático</span><b>{fmt(sys, 1)}%</b>
          <div><i style={{ width: Math.min(100, sys / 30 * 100) + "%" }} /></div>
        </div>
        <div className="risk-meter idio">
          <span>Idiosincrático residual</span><b>{fmt(residual, 1)}%</b>
          <div><i style={{ width: Math.min(100, residual / 30 * 100) + "%" }} /></div>
        </div>
      </div>

      <div className="grid2">
        <Slider label="Número de empresas" value={n} min={1} max={100} step={1} onChange={setN} />
        <Slider label="Riesgo sistemático" value={sys} min={2} max={20} step={1} onChange={setSys} suffix="%" />
        <Slider label="Riesgo idiosincrático por empresa" value={idio} min={5} max={40} step={1} onChange={setIdio} suffix="%" />
      </div>

      <div className="w-out w-out-neutral">
        <div className="w-out-big">Riesgo total aproximado: {fmt(total, 1)}%</div>
        <div className="w-out-lbl">
          Con {n} {n === 1 ? "empresa" : "empresas"}, el componente específico baja a {fmt(residual, 1)}%,
          mientras que el componente sistemático permanece en {fmt(sys, 1)}%. Diversificar elimina ruido empresarial, no shocks de mercado.
        </div>
      </div>
    </Widget>
  );
}

/* ------------------------------------------------- 9. BETA */
function WBeta() {
  const [beta, setBeta] = useState(1.5);
  const [marketMove, setMarketMove] = useState(4);
  const assetMove = beta * marketMove;
  const cls = beta > 1.05 ? "más sensible que el mercado" : beta < 0.95 ? "menos sensible que el mercado" : "similar al mercado";
  const lim = Math.max(12, Math.abs(assetMove), Math.abs(marketMove));
  const X = (v) => 260 + (v / lim) * 215;

  return (
    <Widget title="Mueve el mercado y observa la respuesta sistemática"
      hint="Beta no predice el retorno exacto de mañana: resume la sensibilidad promedio del componente ligado al mercado.">
      <div className="tabs beta-presets">
        {[0.5, 1, 1.5, 2].map((b) => (
          <button key={b} className={Math.abs(beta - b) < 0.01 ? "on" : ""} onClick={() => setBeta(b)}>β {b.toFixed(1)}</button>
        ))}
      </div>

      <svg viewBox="0 0 520 150" className="chart beta-chart">
        <line x1="45" y1="72" x2="475" y2="72" className="ax" />
        <line x1="260" y1="25" x2="260" y2="122" className="ax" />
        <line x1="260" y1="48" x2={X(marketMove)} y2="48" className="marketbar" />
        <circle cx={X(marketMove)} cy="48" r="6" className="marketdot" />
        <text x="45" y="52" className="tk">Mercado</text>
        <text x={X(marketMove)} y="35" className="rootlbl" textAnchor="middle">{marketMove > 0 ? "+" : ""}{fmt(marketMove, 1)}%</text>
        <line x1="260" y1="98" x2={X(assetMove)} y2="98" className="assetbar" />
        <circle cx={X(assetMove)} cy="98" r="6" className="rootdot" />
        <text x="45" y="102" className="tk">Activo</text>
        <text x={X(assetMove)} y="119" className="rootlbl" textAnchor="middle">{assetMove > 0 ? "+" : ""}{fmt(assetMove, 1)}%</text>
        <text x="45" y="140" className="tk">caída</text>
        <text x="475" y="140" className="tk" textAnchor="end">subida</text>
      </svg>

      <div className="grid2">
        <Slider label="Beta" value={beta} min={0} max={3} step={0.1} onChange={setBeta} d={1} />
        <Slider label="Movimiento del mercado" value={marketMove} min={-10} max={10} step={0.5} onChange={setMarketMove} suffix="%" d={1} />
      </div>

      <div className="w-out w-out-neutral">
        <div className="w-out-big">El activo es {cls}</div>
        <div className="w-out-lbl">
          Con β = {fmt(beta, 1)}, un movimiento de {marketMove > 0 ? "+" : ""}{fmt(marketMove, 1)}% del mercado se asocia con
          un movimiento sistemático aproximado de {assetMove > 0 ? "+" : ""}{fmt(assetMove, 1)}% en el activo.
          La sorpresa idiosincrática puede hacer que el retorno observado sea distinto.
        </div>
      </div>
    </Widget>
  );
}

/* ------------------------------------------------- 10. CAPM */
function WCapm() {
  const [rf, setRf] = useState(5);
  const [mrp, setMrp] = useState(6);
  const [beta, setBeta] = useState(1.2);
  const [offered, setOffered] = useState(14);
  const required = rf + beta * mrp;
  const alpha = offered - required;

  const W = 520, H = 245, L = 48, R = 18, T = 18, B = 34;
  const bMax = 3.2;
  const yMax = Math.max(28, rf + bMax * mrp + 3, offered + 3);
  const X = (b) => L + (b / bMax) * (W - L - R);
  const Y = (v) => T + (1 - v / yMax) * (H - T - B);
  const path = `M${X(0)} ${Y(rf)} L${X(bMax)} ${Y(rf + bMax * mrp)}`;
  const good = alpha >= 0;

  return (
    <Widget title="Línea del mercado de valores (CAPM)"
      hint="La línea muestra el rendimiento requerido para cada beta. El punto del proyecto puede quedar arriba o abajo de esa referencia.">
      <div className="tabs">
        <button onClick={() => setBeta(1)}>Mercado β 1.0</button>
        <button onClick={() => setBeta(2.8)}>Ejemplo Yahoo β 2.8</button>
        <button onClick={() => setBeta(0.1)}>Ejemplo A.-Busch β 0.1</button>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="chart capm-chart">
        <line x1={L} y1={H - B} x2={W - R} y2={H - B} className="ax" />
        <line x1={L} y1={T} x2={L} y2={H - B} className="ax" />
        <path d={path} className="curve" />
        {[0, 1, 2, 3].map((b) => <text key={b} x={X(b)} y={H - 12} className="tk" textAnchor="middle">β {b}</text>)}
        <line x1={X(beta)} y1={Y(required)} x2={X(beta)} y2={Y(offered)} className={good ? "alphapos" : "alphaneg"} />
        <circle cx={X(beta)} cy={Y(required)} r="5" className="marketdot" />
        <circle cx={X(beta)} cy={Y(offered)} r="6" className={good ? "dotp" : "dotn"} />
        <text x={X(beta) + 9} y={Y(required) + 4} className="tk">requerido {fmt(required, 1)}%</text>
        <text x={X(beta) + 9} y={Y(offered) - 7} className="rootlbl">ofrecido {fmt(offered, 1)}%</text>
        <text x={L - 8} y={T + 6} className="tk" textAnchor="end">retorno</text>
      </svg>

      <div className="grid2">
        <Slider label="Tasa libre de riesgo" value={rf} min={0} max={10} step={0.5} onChange={setRf} suffix="%" d={1} />
        <Slider label="Prima de mercado" value={mrp} min={1} max={12} step={0.5} onChange={setMrp} suffix="%" d={1} />
        <Slider label="Beta del proyecto" value={beta} min={0} max={3} step={0.1} onChange={setBeta} d={1} />
        <Slider label="Rendimiento esperado del proyecto" value={offered} min={0} max={35} step={0.5} onChange={setOffered} suffix="%" d={1} />
      </div>

      <div className={"w-out " + (good ? "w-out-go" : "w-out-no")}>
        <div className="w-out-big">{good ? "Supera" : "No alcanza"} el costo de capital por {fmt(Math.abs(alpha), 1)} pp</div>
        <div className="w-out-lbl">
          CAPM exige {fmt(required, 1)}% = {fmt(rf, 1)}% + {fmt(beta, 1)} × {fmt(mrp, 1)}%.
          El proyecto ofrece {fmt(offered, 1)}%. {good ? "Bajo estos supuestos, compensa el riesgo sistemático asumido." : "Bajo estos supuestos, no compensa suficientemente el riesgo sistemático."}
        </div>
      </div>
    </Widget>
  );
}

const WIDGETS = {
  arbitraje: WArbitraje,
  "precio-valor": WPrecioValor,
  van: WVan,
  tir: WTir,
  anualidades: WAnualidades,
  loteria: WLoteria,
  "precio-riesgo": WPrecioRiesgo,
  diversificacion: WDiversificacion,
  beta: WBeta,
  capm: WCapm,
};
const WIDGET_LIST = [
  ["", "— sin interactivo —"],
  ["arbitraje", "Arbitraje entre mercados"],
  ["precio-valor", "Precio vs. valor"],
  ["van", "Constructor de VAN"],
  ["tir", "Curva VAN / TIR"],
  ["anualidades", "Perpetuidades y anualidades"],
  ["loteria", "Lotería: anualidad vs. cheque"],
  ["precio-riesgo", "Composición del costo de capital"],
  ["diversificacion", "Diversificación del portafolio"],
  ["beta", "Sensibilidad beta"],
  ["capm", "CAPM y línea del mercado"],
];

/* ------------------------------------------------- HERO */
function HeroCurve() {
  const W = 420, H = 290;
  const f = (r) => -100 + 45 / (1 + r) + 48 / Math.pow(1 + r, 2) + 52 / Math.pow(1 + r, 3);
  const pts = [];
  for (let i = 0; i <= 110; i++) { const r = (i / 110) * 0.5; pts.push([r, f(r)]); }
  const ys = pts.map((p) => p[1]);
  const mx = Math.max(...ys), mn = Math.min(...ys);
  const X = (v) => 32 + (v / 0.5) * (W - 54);
  const Y = (v) => 28 + (1 - (v - mn) / (mx - mn)) * (H - 68);
  const d = pts.map((p, i) => (i ? "L" : "M") + X(p[0]).toFixed(1) + " " + Y(p[1]).toFixed(1)).join(" ");
  let tir = 0;
  for (let i = 1; i < pts.length; i++) if (pts[i - 1][1] > 0 && pts[i][1] <= 0) tir = pts[i][0];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="hero-svg" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="32" y1={28 + i * ((H - 68) / 4)} x2={W - 22}
          y2={28 + i * ((H - 68) / 4)} className="hgrid" />
      ))}
      <line x1="32" y1={Y(0)} x2={W - 22} y2={Y(0)} className="hax" />
      <path d={d} className="hcurve" />
      <circle cx={X(tir)} cy={Y(0)} r="6" className="hdot" />
      <text x={X(tir)} y={Y(0) - 14} className="hlbl" textAnchor="middle">TIR</text>
    </svg>
  );
}

/* ==================================================================== APP */
export default function App() {
  const [data, setData] = useState(SEED);
  const previewWeek = new URLSearchParams(window.location.search).get("week");
  const initialWid = previewWeek && /^\d+$/.test(previewWeek) ? `w${previewWeek}` : "w1";
  const [view, setView] = useState(previewWeek ? "week" : "home");
  const [wid, setWid] = useState(initialWid);
  const [edit, setEdit] = useState(false);
  const [modal, setModal] = useState(false);
  const [pass, setPass] = useState("");
  const [err, setErr] = useState(false);
  const [ans, setAns] = useState({});
  const [status, setStatus] = useState("");
  const first = useRef(true);

  useEffect(() => {
    (async () => {
      const s = await load();
      if (s && s.weeks) setData(s); else await persist(SEED);
      first.current = false;
    })();
  }, []);

  useEffect(() => {
    if (first.current) return;
    let dead = false;
    setStatus("Guardando…");
    (async () => {
      const ok = await persist(data);
      if (dead) return;
      setStatus(ok ? "Guardado en este dispositivo" : "No se pudo guardar");
      if (ok) setTimeout(() => { if (!dead) setStatus(""); }, 1500);
    })();
    return () => { dead = true; };
  }, [data]);

  const week = data.weeks.find((w) => w.id === wid) || data.weeks[0];
  const mut = (fn) =>
    setData((d) => ({ ...d, weeks: d.weeks.map((w) => (w.id === wid ? fn({ ...w }) : w)) }));

  const unlock = () => {
    if (pass === EDIT_PASS) { setEdit(true); setModal(false); setPass(""); setErr(false); }
    else setErr(true);
  };
  const open = (id) => { setWid(id); setView("week"); setEdit(edit); window.scrollTo(0, 0); };
  const home = () => { setView("home"); window.scrollTo(0, 0); };

  const answered = week.quiz.filter((q) => ans[q.id] != null).length;
  const right = week.quiz.filter((q) => ans[q.id] === q.a).length;

  return (
    <div className="root">
      <style>{CSS}</style>

      <header className="nav">
        <button className="brand" onClick={home}>
          <span className="mark">FC1</span>
          <span className="brand-t">Finanzas Corporativas 1</span>
        </button>
        <div className="nav-r">
          <span className="status">{status}</span>
          {EDIT_ENABLED && (edit
            ? <button className="btn-sm on" onClick={() => setEdit(false)}>Salir de edición</button>
            : <button className="btn-sm" onClick={() => setModal(true)}>Editar</button>)}
        </div>
      </header>

      {EDIT_ENABLED && modal && (
        <div className="mbg" onClick={() => setModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Clave de edición</h3>
            <p>Solo el autor del curso puede modificar el contenido.</p>
            <input type="password" autoFocus value={pass} placeholder="Ingresa la clave"
              onChange={(e) => { setPass(e.target.value); setErr(false); }}
              onKeyDown={(e) => e.key === "Enter" && unlock()} />
            {err && <div className="merr">Clave incorrecta.</div>}
            <div className="mrow">
              <button className="btn-ghost" onClick={() => setModal(false)}>Cancelar</button>
              <button className="btn-solid" onClick={unlock}>Desbloquear</button>
            </div>
          </div>
        </div>
      )}

      {view === "home" && (
        <main>
          <section className="hero">
            <div>
              <div className="eyebrow">Universidad del Pacífico · Material de apoyo del curso</div>
              <h1 className="h1">Finanzas<br />Corporativas <span className="blue">1</span></h1>
              <p className="lead">
                Esta página contiene complementos interactivos del curso para su correcto entendimiento
                mediante ejemplos, aplicaciones prácticas y recursos visuales, con el propósito de
                brindar una mejor experiencia de aprendizaje :)
              </p>

              <div className="hero-meta">
                <div><span>Docente:</span> Miguel Robles</div>
                <div><span>Curso:</span> Finanzas Corporativas 1</div>
                <div><span>Sección:</span> C</div>
                <div><span>Diseño y desarrollo:</span> Gonzalo Montes</div>
              </div>

              <div className="hero-note">
                Material complementario de uso académico. Su contenido está sujeto a posibles errores
                u omisiones y no reemplaza las indicaciones, materiales ni evaluaciones oficiales del
                curso.
              </div>

              <div className="cta">
                <button className="btn-solid" onClick={() => open("w1")}>Ir a la semana 1</button>
                <a className="btn-ghost" href="#programa">Ver el programa</a>
              </div>
            </div>
            <div className="hero-art hero-art-image">
              <img src={heroCourseImage} alt="Ilustración temática del curso Finanzas Corporativas 1" />
            </div>
          </section>

          <section className="prog" id="programa">
            <div className="sec-head">
              <div className="eyebrow">El programa</div>
              <h2 className="h2">Tres unidades, dieciséis semanas</h2>
            </div>

            {[1, 2, 3].map((u) => (
              <div key={u} className="unit">
                <div className="unit-bar">
                  <span className="unit-tag">{UNITS[u].tag}</span>
                  <span className="unit-name">{UNITS[u].name}</span>
                  <span className="rule" />
                </div>
                <div className="cards">
                  {data.weeks.filter((w) => w.unit === u).map((w) => {
                    const ready = w.sections.length > 0;
                    return (
                      <button key={w.id} className={"card" + (ready ? "" : " soon")}
                        onClick={() => open(w.id)}>
                        <span className="card-n">{String(w.n).padStart(2, "0")}</span>
                        <span className="card-b">
                          <span className="card-t">{w.title}</span>
                          <span className="card-d">
                            {w.blurb || (ready ? "" : "Pendiente de completar")}
                          </span>
                          <span className="card-f">
                            <span className="tag">{w.chapters}</span>
                            {w.pc && <span className="tag pc">{w.pc}</span>}
                            {ready && (
                              <span className="meta">
                                {w.sections.filter((s) => s.widget).length} interactivos ·{" "}
                                {w.quiz.length} preguntas
                              </span>
                            )}
                          </span>
                        </span>
                        <span className="card-a">→</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        </main>
      )}

      {view === "week" && (
        <main className="wk">
          <button className="back" onClick={home}>← Todas las semanas</button>

          <div className="wk-head">
            <div className="eyebrow">{UNITS[week.unit].tag} · {UNITS[week.unit].name}</div>
            <div className="wk-title">
              <div className="wk-n">{String(week.n).padStart(2, "0")}</div>
              {edit
                ? <input className="inp inp-h1" value={week.title}
                    onChange={(e) => mut((w) => ({ ...w, title: e.target.value }))} />
                : <h1 className="wk-h1">{week.title}</h1>}
            </div>
            {edit
              ? <textarea className="inp" rows={2} placeholder="Resumen de una línea" value={week.blurb}
                  onChange={(e) => mut((w) => ({ ...w, blurb: e.target.value }))} />
              : week.blurb && <p className="wk-lead">{week.blurb}</p>}
            <div className="chips">
              {edit ? (
                <>
                  <input className="inp inp-chip" value={week.chapters}
                    onChange={(e) => mut((w) => ({ ...w, chapters: e.target.value }))} />
                  <input className="inp inp-chip" placeholder="PC" value={week.pc}
                    onChange={(e) => mut((w) => ({ ...w, pc: e.target.value }))} />
                </>
              ) : (
                <>
                  <span className="tag">{week.chapters}</span>
                  {week.pc && <span className="tag pc">{week.pc}</span>}
                </>
              )}
            </div>
          </div>

          {week.sections.length === 0 && !edit && (
            <div className="blank">
              Esta semana todavía está en preparación. El contenido se publicará progresivamente conforme avance el curso.
            </div>
          )}

          {week.sections.map((s, i) => {
            const Comp = WIDGETS[s.widget];
            return (
              <section key={s.id} className="blk">
                {edit ? (
                  <div className="ed">
                    <div className="ed-row">
                      <input className="inp inp-h2" value={s.heading}
                        onChange={(e) => mut((w) => ({ ...w,
                          sections: w.sections.map((x) => x.id === s.id ? { ...x, heading: e.target.value } : x) }))} />
                      <button className="del" onClick={() => mut((w) => ({
                        ...w, sections: w.sections.filter((x) => x.id !== s.id) }))}>✕</button>
                    </div>
                    <textarea className="inp" rows={7} value={s.body}
                      onChange={(e) => mut((w) => ({ ...w,
                        sections: w.sections.map((x) => x.id === s.id ? { ...x, body: e.target.value } : x) }))} />
                    <label className="ed-sel">
                      Componente interactivo
                      <select value={s.widget} onChange={(e) => mut((w) => ({ ...w,
                        sections: w.sections.map((x) => x.id === s.id ? { ...x, widget: e.target.value } : x) }))}>
                        {WIDGET_LIST.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                      </select>
                    </label>
                  </div>
                ) : (
                  <>
                    <h2 className="blk-h2">
                      <span className="blk-i">{String(i + 1).padStart(2, "0")}</span>
                      {s.heading}
                    </h2>
                    {s.body.split("\n\n").map((p, k) => <p key={k} className="blk-p">{p}</p>)}
                    {Comp && <Comp />}
                  </>
                )}
              </section>
            );
          })}

          {edit && (
            <button className="add" onClick={() => mut((w) => ({ ...w,
              sections: [...w.sections, { id: uid(), heading: "Nuevo tema", body: "", widget: "" }] }))}>
              + Agregar tema
            </button>
          )}

          {(week.quiz.length > 0 || edit) && (
            <section className="quiz">
              <div className="quiz-head">
                <div>
                  <div className="eyebrow">Comprueba</div>
                  <h2 className="h2">Autoevaluación</h2>
                </div>
                {!edit && answered > 0 && (
                  <div className="score">
                    <b>{right}/{week.quiz.length}</b>
                    <button className="btn-ghost xs" onClick={() => {
                      const c = { ...ans }; week.quiz.forEach((q) => delete c[q.id]); setAns(c);
                    }}>Reiniciar</button>
                  </div>
                )}
              </div>

              {week.quiz.map((q, qi) => {
                const ch = ans[q.id], done = ch != null;
                return (
                  <div key={q.id} className="q">
                    {edit ? (
                      <div className="ed">
                        <div className="ed-row">
                          <textarea className="inp" rows={2} value={q.q}
                            onChange={(e) => mut((w) => ({ ...w,
                              quiz: w.quiz.map((x) => x.id === q.id ? { ...x, q: e.target.value } : x) }))} />
                          <button className="del" onClick={() => mut((w) => ({
                            ...w, quiz: w.quiz.filter((x) => x.id !== q.id) }))}>✕</button>
                        </div>
                        {q.o.map((o, oi) => (
                          <div key={oi} className="ed-opt">
                            <input type="radio" checked={q.a === oi} title="Marcar como correcta"
                              onChange={() => mut((w) => ({ ...w,
                                quiz: w.quiz.map((x) => x.id === q.id ? { ...x, a: oi } : x) }))} />
                            <input className="inp" value={o}
                              onChange={(e) => mut((w) => ({ ...w,
                                quiz: w.quiz.map((x) => x.id === q.id
                                  ? { ...x, o: x.o.map((y, k) => k === oi ? e.target.value : y) } : x) }))} />
                          </div>
                        ))}
                        <input className="inp" placeholder="Explicación" value={q.e}
                          onChange={(e) => mut((w) => ({ ...w,
                            quiz: w.quiz.map((x) => x.id === q.id ? { ...x, e: e.target.value } : x) }))} />
                      </div>
                    ) : (
                      <>
                        <div className="q-txt"><span className="q-n">{qi + 1}</span>{q.q}</div>
                        <div className="opts">
                          {q.o.map((o, oi) => {
                            let c = "opt";
                            if (done) c += oi === q.a ? " ok" : oi === ch ? " no" : " dim";
                            return (
                              <button key={oi} className={c} disabled={done}
                                onClick={() => setAns((a) => (a[q.id] != null ? a : { ...a, [q.id]: oi }))}>
                                <span className="opt-k">{String.fromCharCode(97 + oi)}</span>
                                <span className="opt-t">{o}</span>
                                {done && oi === q.a && <span className="opt-i">✓</span>}
                                {done && oi === ch && oi !== q.a && <span className="opt-i">✕</span>}
                              </button>
                            );
                          })}
                        </div>
                        {done && q.e && (
                          <div className={"exp " + (ch === q.a ? "exp-ok" : "exp-no")}>
                            <b>{ch === q.a ? "Correcto. " : "Incorrecto. "}</b>{q.e}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}

              {edit && (
                <button className="add" onClick={() => mut((w) => ({ ...w,
                  quiz: [...w.quiz, { id: uid(), q: "Nueva pregunta",
                    o: ["Opción A", "Opción B", "Opción C", "Opción D"], a: 0, e: "" }] }))}>
                  + Agregar pregunta
                </button>
              )}
            </section>
          )}

          <nav className="wknav">
            {week.n > 1 && <button onClick={() => open("w" + (week.n - 1))}>← Semana {week.n - 1}</button>}
            {week.n < 16 && (
              <button className="next" onClick={() => open("w" + (week.n + 1))}>
                Semana {week.n + 1} →
              </button>
            )}
          </nav>
        </main>
      )}

      <footer className="foot">
        <div>Finanzas Corporativas 1 · Sección C · Universidad del Pacífico</div>
        <div>Docente: Miguel Robles · Diseño y desarrollo: Gonzalo Montes</div>
        <div>Sujeto a posibles errores u omisiones.</div>
      </footer>
    </div>
  );
}

/* ==================================================================== CSS */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600;700&display=swap');

.root{
  --ink:#101114; --ink2:#3E424B; --mute:#7C8089;
  --paper:#FFFFFF; --wash:#F5F4F1; --line:#E4E2DC;
  --blue:#1B2ED8; --blue-w:#EEF0FF;
  --go:#0E7C56; --go-w:#E8F4EF;
  --no:#C0392B; --no-w:#FBEDEB;
  --amber:#B07203; --amber-w:#FBF0DC;
  --disp:'Fraunces', Georgia, serif;
  --body:'Inter', system-ui, -apple-system, sans-serif;
  font-family:var(--body); color:var(--ink); background:var(--paper);
  line-height:1.6; -webkit-font-smoothing:antialiased; min-height:100vh;
}
.root *{box-sizing:border-box;}
.root button{font-family:var(--body);}
.eyebrow{font-size:11px; letter-spacing:.14em; text-transform:uppercase; font-weight:600; color:var(--mute);}
.h2{font-family:var(--disp); font-size:31px; font-weight:600; margin:7px 0 0; letter-spacing:-.01em; line-height:1.15;}

.nav{position:sticky; top:0; z-index:40; display:flex; align-items:center; padding:13px 34px;
  background:rgba(255,255,255,.92); backdrop-filter:blur(10px); border-bottom:1px solid var(--line);}
.brand{display:flex; align-items:center; gap:11px; background:none; border:0; cursor:pointer; padding:0;}
.mark{width:32px; height:32px; background:var(--ink); color:#fff; border-radius:5px; display:flex;
  align-items:center; justify-content:center; font-size:11.5px; font-weight:700;}
.brand-t{font-family:var(--disp); font-size:16px; font-weight:600;}
.nav-r{margin-left:auto; display:flex; align-items:center; gap:14px;}
.status{font-size:12px; color:var(--mute);}
.btn-sm{background:none; border:1px solid var(--line); border-radius:100px; padding:6px 15px;
  font-size:12.5px; font-weight:500; color:var(--ink2); cursor:pointer;}
.btn-sm:hover{border-color:var(--ink); color:var(--ink);}
.btn-sm.on{background:var(--ink); color:#fff; border-color:var(--ink);}

.hero{max-width:1120px; margin:0 auto; padding:74px 34px 56px; display:grid;
  grid-template-columns:1.15fr .85fr; gap:40px; align-items:center;}
.h1{font-family:var(--disp); font-size:64px; line-height:.99; font-weight:600; letter-spacing:-.025em;
  margin:18px 0 22px;}
.blue{color:var(--blue);}
.lead{font-size:17px; color:var(--ink2); max-width:46ch; margin:0 0 18px;}
.hero-meta{display:grid; grid-template-columns:1fr 1fr; gap:8px 18px; max-width:620px; margin:0 0 16px;}
.hero-meta div{font-size:14px; color:var(--ink2);}
.hero-meta span{font-weight:700; color:var(--ink);}
.hero-note{max-width:58ch; font-size:12.5px; line-height:1.55; color:var(--mute); background:var(--wash); border:1px solid var(--line); border-radius:12px; padding:12px 14px; margin:0 0 22px;}
.cta{display:flex; gap:11px; flex-wrap:wrap;}
.btn-solid{background:var(--ink); color:#fff; border:1px solid var(--ink); border-radius:100px;
  padding:12px 24px; font-size:14px; font-weight:600; cursor:pointer;}
.btn-solid:hover{background:var(--blue); border-color:var(--blue);}
.btn-ghost{background:none; color:var(--ink); border:1px solid var(--line); border-radius:100px;
  padding:12px 24px; font-size:14px; font-weight:600; cursor:pointer; text-decoration:none;
  display:inline-flex; align-items:center;}
.btn-ghost:hover{border-color:var(--ink);}
.btn-ghost.xs{padding:4px 13px; font-size:12px;}
.hero-svg{width:100%; height:auto;}
.hero-art-image{display:flex; align-items:center; justify-content:center;}
.hero-art-image img{width:100%; max-width:520px; height:auto; display:block; border-radius:26px; box-shadow:0 20px 50px -28px rgba(16,17,20,.28); border:1px solid var(--line);}
.hgrid{stroke:var(--line);} .hax{stroke:var(--ink); stroke-width:1.2;}
.hcurve{fill:none; stroke:var(--blue); stroke-width:2.5; stroke-linecap:round;}
.hdot{fill:var(--amber);}
.hlbl{font-size:11px; font-weight:700; fill:var(--amber); letter-spacing:.08em; font-family:var(--body);}

.prog{max-width:1120px; margin:0 auto; padding:36px 34px 88px;}
.sec-head{margin-bottom:42px;}
.unit{margin-bottom:50px;}
.unit-bar{display:flex; align-items:center; gap:13px; margin-bottom:18px;}
.unit-tag{font-size:10.5px; font-weight:700; letter-spacing:.1em; text-transform:uppercase;
  background:var(--ink); color:#fff; padding:4px 10px; border-radius:3px;}
.unit-name{font-family:var(--disp); font-size:19px; font-weight:600;}
.rule{flex:1; height:1px; background:var(--line);}
.cards{display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:13px;}
.card{display:flex; gap:16px; align-items:flex-start; text-align:left; background:var(--paper);
  border:1px solid var(--line); border-radius:12px; padding:19px; cursor:pointer;
  transition:border-color .15s, transform .15s, box-shadow .15s;}
.card:hover{border-color:var(--ink); transform:translateY(-2px);
  box-shadow:0 10px 24px -14px rgba(16,17,20,.35);}
.card-n{font-family:var(--disp); font-size:29px; font-weight:600; color:var(--blue); line-height:1;
  letter-spacing:-.02em; flex:0 0 auto;}
.card-b{flex:1; min-width:0; display:block;}
.card-t{display:block; font-size:15.5px; font-weight:600; line-height:1.3; margin-bottom:4px;}
.card-d{display:block; font-size:13px; color:var(--mute); line-height:1.45; margin-bottom:11px;}
.card-f{display:flex; gap:7px; align-items:center; flex-wrap:wrap;}
.tag{font-size:11.5px; color:var(--ink2); background:var(--wash); padding:3px 9px; border-radius:100px;}
.tag.pc{background:var(--amber); color:#fff; font-weight:600; letter-spacing:.03em;}
.meta{font-size:11.5px; color:var(--mute);}
.card-a{color:var(--line); font-size:17px; transition:color .15s, transform .15s;}
.card:hover .card-a{color:var(--blue); transform:translateX(3px);}
.soon{background:var(--wash); border-style:dashed;}
.soon .card-n{color:var(--line);} .soon .card-t{color:var(--mute);}

.wk{max-width:800px; margin:0 auto; padding:32px 34px 88px;}
.back{background:none; border:0; color:var(--mute); font-size:13px; cursor:pointer; padding:0;
  margin-bottom:28px;}
.back:hover{color:var(--blue);}
.wk-head{border-bottom:1px solid var(--line); padding-bottom:26px;}
.wk-title{display:flex; gap:18px; align-items:flex-start; margin:10px 0 2px;}
.wk-n{font-family:var(--disp); font-size:50px; font-weight:600; color:var(--blue); line-height:.92;
  letter-spacing:-.03em;}
.wk-h1{font-family:var(--disp); font-size:37px; font-weight:600; letter-spacing:-.02em;
  line-height:1.1; margin:2px 0 0;}
.wk-lead{font-size:16px; color:var(--ink2); margin:10px 0 0; max-width:60ch;}
.chips{display:flex; gap:7px; margin-top:16px; flex-wrap:wrap;}
.blank{background:var(--wash); border:1px dashed var(--line); border-radius:12px; padding:24px;
  margin:30px 0; color:var(--mute); font-size:14.5px;}

.blk{margin:44px 0;}
.blk-h2{font-family:var(--disp); font-size:25px; font-weight:600; letter-spacing:-.01em;
  line-height:1.25; margin:0 0 14px; display:flex; gap:13px; align-items:baseline;}
.blk-i{font-family:var(--body); font-size:12px; font-weight:700; color:var(--blue);
  letter-spacing:.06em; flex:0 0 auto;}
.blk-p{font-size:16px; color:var(--ink2); margin:0 0 15px; max-width:66ch;}

.wgt{border:1px solid var(--line); border-radius:14px; overflow:hidden; margin:26px 0 8px;}
.wgt-head{padding:17px 22px 14px; background:var(--wash); border-bottom:1px solid var(--line);}
.wgt-kicker{font-size:10px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--blue);}
.wgt-head h4{font-family:var(--disp); font-size:18px; font-weight:600; margin:5px 0 4px;}
.wgt-head p{font-size:13px; color:var(--mute); margin:0; line-height:1.45;}
.wgt-body{padding:22px;}

.w-ctl{margin:13px 0;}
.w-ctl-top{display:flex; justify-content:space-between; font-size:13px; color:var(--ink2); margin-bottom:5px;}
.w-ctl-top b{font-variant-numeric:tabular-nums; color:var(--ink);}
.w-ctl input[type=range]{width:100%; accent-color:var(--blue); cursor:pointer;}
.grid2{display:grid; grid-template-columns:1fr 1fr; gap:2px 22px;}
.w-out{border-radius:10px; padding:14px 16px; margin-top:16px;}
.w-out-big{font-family:var(--disp); font-size:23px; font-weight:600; margin-bottom:5px;
  font-variant-numeric:tabular-nums; line-height:1.2;}
.w-out-lbl{font-size:13.5px; line-height:1.5;}
.w-out-lbl code{background:rgba(0,0,0,.06); padding:2px 6px; border-radius:4px; font-size:12.5px;}
.w-out-go{background:var(--go-w); color:#0B5B3F;} .w-out-go .w-out-big{color:var(--go);}
.w-out-no{background:var(--no-w); color:#8E2A20;} .w-out-no .w-out-big{color:var(--no);}
.w-out-neutral{background:var(--wash); color:var(--ink2);}
.w-btn{margin-top:10px; background:var(--ink); color:#fff; border:0; border-radius:100px;
  padding:8px 18px; font-size:13px; font-weight:600; cursor:pointer;}
.w-btn-ghost{background:none; border:1px solid var(--line); color:var(--ink2);}

.arb{display:grid; grid-template-columns:190px 1fr; gap:26px; align-items:start;}
.arb-mkts{display:flex; gap:14px;}
.arb-mkt{flex:1; text-align:center;}
.arb-name{font-size:12px; font-weight:600; color:var(--ink2); margin-bottom:7px;}
.arb-track{height:128px; background:var(--wash); border-radius:6px; display:flex; align-items:flex-end;
  overflow:hidden;}
.arb-fill{width:100%; background:var(--blue); transition:height .3s ease;}
.arb-price{font-size:15px; font-weight:700; margin-top:7px; font-variant-numeric:tabular-nums;}
.arb-role{font-size:10px; font-weight:700; letter-spacing:.08em; color:var(--amber);}

.pv-line{position:relative; height:96px; margin:6px 0 2px;}
.pv-axis{position:absolute; top:48px; left:0; right:0; height:2px; background:var(--line);}
.pv-pin{position:absolute; transform:translateX(-50%); text-align:center; transition:left .18s ease;}
.pv-pin b{display:block; font-size:15px; font-variant-numeric:tabular-nums;}
.pv-tag{font-size:9.5px; letter-spacing:.08em; text-transform:uppercase; font-weight:700;}
.pv-price{top:0; color:var(--ink);}
.pv-price::after{content:''; position:absolute; left:50%; top:40px; width:2px; height:12px; background:var(--ink);}
.pv-value{top:58px; color:var(--blue);}
.pv-value::before{content:''; position:absolute; left:50%; top:-12px; width:2px; height:12px; background:var(--blue);}

.van-chart{display:flex; gap:12px; align-items:flex-end; margin-bottom:6px;}
.van-col{flex:1; text-align:center;}
.van-plot{height:130px; position:relative;}
.van-zero{position:absolute; top:50%; left:0; right:0; height:1px; background:var(--line);}
.van-wrap{position:absolute; left:20%; right:20%; display:flex; gap:3px; height:50%;}
.van-wrap.pos{bottom:50%; align-items:flex-end;}
.van-wrap.neg{top:50%; align-items:flex-start;}
.van-ghost,.van-bar{flex:1; border-radius:3px; min-height:2px; transition:height .18s;}
.van-ghost{background:var(--blue-w);} .van-bar{background:var(--blue);}
.van-wrap.neg .van-ghost{background:var(--no-w);} .van-wrap.neg .van-bar{background:var(--no);}
.van-t{font-size:11px; color:var(--mute); margin-top:6px;}
.van-inp{width:100%; text-align:center; font-size:13px; border:1px solid var(--line); border-radius:6px;
  padding:5px; margin-top:4px; font-family:var(--body); font-variant-numeric:tabular-nums;}
.van-pv{font-size:10.5px; color:var(--mute); margin-top:3px; font-variant-numeric:tabular-nums;}

.tabs{display:flex; gap:7px; flex-wrap:wrap; margin-bottom:15px;}
.tabs button{background:none; border:1px solid var(--line); border-radius:100px; padding:6px 14px;
  font-size:12.5px; cursor:pointer; color:var(--ink2);}
.tabs button.on{background:var(--ink); color:#fff; border-color:var(--ink);}
.chart{width:100%; height:auto; overflow:visible;}
.ax{stroke:var(--line);}
.tk{font-size:10px; fill:var(--mute); font-family:var(--body);}
.curve{fill:none; stroke:var(--blue); stroke-width:2.4;}
.rline{stroke:var(--amber); stroke-width:1.3; stroke-dasharray:4 3;}
.rootdot{fill:var(--amber);}
.rootlbl{font-size:10.5px; font-weight:700; fill:var(--amber); font-family:var(--body);}
.dotp{fill:var(--go);} .dotn{fill:var(--no);}

.an-time{display:flex; gap:6px; align-items:flex-end; height:118px; margin:4px 0 14px;}
.an-col{flex:1; display:flex; flex-direction:column; height:100%;}
.an-wrap{flex:1; display:flex; align-items:flex-end; gap:2px;}
.an-ghost,.an-bar{flex:1; border-radius:3px 3px 0 0; min-height:2px; transition:height .18s;}
.an-ghost{background:var(--blue-w);} .an-bar{background:var(--blue);}
.an-ghost.now{background:var(--amber-w);} .an-bar.now{background:var(--amber);}
.an-t{font-size:10.5px; color:var(--mute); text-align:center; margin-top:5px;}
.an-inf{align-self:flex-end; font-size:12px; color:var(--mute); padding-bottom:16px; white-space:nowrap;}
.an-check{display:flex; align-items:center; gap:9px; font-size:13px; color:var(--ink2); margin-top:12px;
  cursor:pointer;}
.an-check input{width:15px; height:15px; accent-color:var(--amber); flex:0 0 auto;}

.lt-row{display:flex; align-items:center; gap:15px; margin-bottom:11px;}
.lt-lbl{flex:0 0 195px; font-size:13.5px; font-weight:600; line-height:1.25;}
.lt-lbl small{display:block; font-weight:400; color:var(--mute); font-size:11.5px;}
.lt-track{flex:1; background:var(--wash); border-radius:6px; height:40px;}
.lt-fill{height:100%; background:var(--line); color:var(--ink2); display:flex; align-items:center;
  justify-content:flex-end; padding-right:10px; font-size:13px; font-weight:700; border-radius:6px;
  transition:width .2s ease; font-variant-numeric:tabular-nums;}
.lt-fill.win{background:var(--blue); color:#fff;}

.quiz{margin-top:58px; border-top:1px solid var(--line); padding-top:34px;}
.quiz-head{display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:28px;}
.score{display:flex; align-items:center; gap:12px; font-size:15px; font-variant-numeric:tabular-nums;}
.q{margin-bottom:25px;}
.q-txt{display:flex; gap:12px; font-size:15.5px; font-weight:600; margin-bottom:10px; align-items:baseline;}
.q-n{flex:0 0 22px; height:22px; background:var(--ink); color:#fff; border-radius:50%; display:flex;
  align-items:center; justify-content:center; font-size:11.5px; font-weight:700;}
.opts{display:flex; flex-direction:column; gap:7px; padding-left:34px;}
.opt{display:flex; align-items:center; gap:11px; background:none; border:1px solid var(--line);
  border-radius:9px; padding:10px 13px; text-align:left; font-size:14.5px; cursor:pointer; color:var(--ink);
  transition:border-color .12s, background .12s;}
.opt:hover:not(:disabled){border-color:var(--blue); background:var(--blue-w);}
.opt:disabled{cursor:default;}
.opt-k{flex:0 0 22px; height:22px; border:1px solid var(--line); border-radius:5px; display:flex;
  align-items:center; justify-content:center; font-size:11.5px; font-weight:700; color:var(--mute);}
.opt-t{flex:1;} .opt-i{font-weight:800;}
.opt.ok{border-color:var(--go); background:var(--go-w); color:#0B5B3F;}
.opt.ok .opt-k{background:var(--go); border-color:var(--go); color:#fff;}
.opt.no{border-color:var(--no); background:var(--no-w); color:#8E2A20;}
.opt.no .opt-k{background:var(--no); border-color:var(--no); color:#fff;}
.opt.dim{opacity:.5;}
.exp{margin:10px 0 0 34px; padding:11px 14px; border-radius:9px; font-size:13.5px; line-height:1.5;}
.exp-ok{background:var(--go-w); color:#0B5B3F;}
.exp-no{background:var(--blue-w); color:#1A237A;}

.ed{background:var(--wash); border:1px solid var(--line); border-radius:12px; padding:16px; margin:14px 0;}
.ed-row{display:flex; gap:10px; align-items:flex-start;}
.inp{width:100%; font-family:var(--body); font-size:14.5px; color:var(--ink); background:#fff;
  border:1px solid var(--line); border-radius:8px; padding:9px 11px; margin-bottom:9px; line-height:1.5;
  resize:vertical;}
.inp:focus{outline:none; border-color:var(--blue);}
.inp-h1{font-family:var(--disp); font-size:27px; font-weight:600;}
.inp-h2{font-family:var(--disp); font-size:19px; font-weight:600;}
.inp-chip{width:auto; max-width:200px; margin:0;}
.ed-sel{display:flex; align-items:center; gap:10px; font-size:13px; color:var(--ink2);}
.ed-sel select{font-family:var(--body); font-size:13px; padding:6px 9px; border:1px solid var(--line);
  border-radius:7px; background:#fff;}
.ed-opt{display:flex; align-items:center; gap:9px;}
.ed-opt input[type=radio]{flex:0 0 auto; width:15px; height:15px; accent-color:var(--go); margin-bottom:9px;}
.del{flex:0 0 auto; width:31px; height:31px; border:0; border-radius:8px; background:var(--no-w);
  color:var(--no); cursor:pointer;}
.del:hover{background:var(--no); color:#fff;}
.add{background:none; border:1.5px dashed var(--line); border-radius:9px; padding:10px 18px;
  font-size:13.5px; font-weight:600; color:var(--ink2); cursor:pointer;}
.add:hover{border-color:var(--blue); color:var(--blue);}

.mbg{position:fixed; inset:0; background:rgba(16,17,20,.45); z-index:60; display:flex;
  align-items:center; justify-content:center; padding:20px;}
.modal{background:#fff; border-radius:16px; padding:26px; width:100%; max-width:360px;
  box-shadow:0 24px 60px -20px rgba(0,0,0,.4);}
.modal h3{font-family:var(--disp); font-size:20px; margin:0 0 6px;}
.modal p{font-size:13.5px; color:var(--mute); margin:0 0 16px;}
.modal input{width:100%; border:1px solid var(--line); border-radius:8px; padding:10px 12px;
  font-size:14px; font-family:var(--body);}
.modal input:focus{outline:none; border-color:var(--blue);}
.merr{color:var(--no); font-size:12.5px; margin-top:7px;}
.mrow{display:flex; gap:9px; justify-content:flex-end; margin-top:18px;}
.mrow button{padding:9px 18px; font-size:13.5px;}

.wknav{display:flex; justify-content:space-between; margin-top:54px; padding-top:24px;
  border-top:1px solid var(--line);}
.wknav button{background:none; border:1px solid var(--line); border-radius:100px; padding:9px 18px;
  font-size:13.5px; font-weight:600; cursor:pointer; color:var(--ink2);}
.wknav button:hover{border-color:var(--ink); color:var(--ink);}
.wknav .next{margin-left:auto;}
.foot{border-top:1px solid var(--line); padding:26px 34px; text-align:center; font-size:12px;
  color:var(--mute);}


/* Semana 2: riesgo, diversificación, beta y CAPM */
.risk-formula{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;gap:10px;align-items:stretch;margin-bottom:18px;}
.risk-piece{background:var(--wash);border:1px solid var(--line);border-radius:10px;padding:14px;display:flex;flex-direction:column;min-width:0;}
.risk-piece span{font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:var(--mute);font-weight:700;}
.risk-piece b{font-family:var(--disp);font-size:28px;line-height:1.15;margin:6px 0 3px;font-variant-numeric:tabular-nums;}
.risk-piece small{font-size:11px;color:var(--mute);}
.risk-piece.total{background:var(--blue-w);border-color:#CDD2FF;color:var(--blue);}
.risk-op{display:flex;align-items:center;justify-content:center;font-family:var(--disp);font-size:24px;color:var(--mute);}
.return-stack{height:34px;border-radius:8px;overflow:hidden;display:flex;background:var(--wash);margin:4px 0 18px;font-size:11px;font-weight:700;color:#fff;}
.return-stack>div{display:flex;align-items:center;justify-content:center;min-width:34px;transition:width .25s ease;}
.return-rf{background:var(--ink2);}.return-risk{background:var(--blue);}
.div-chart{margin-bottom:8px;}.sysline{stroke:var(--amber);stroke-width:1.5;stroke-dasharray:6 5;}.syslbl{fill:var(--amber);font-size:10px;font-weight:700;font-family:var(--body);}
.risk-meters{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:8px 0 12px;}
.risk-meter{display:grid;grid-template-columns:1fr auto;gap:5px 10px;align-items:center;font-size:12px;color:var(--ink2);}
.risk-meter b{font-variant-numeric:tabular-nums;}.risk-meter>div{grid-column:1/-1;height:8px;background:var(--wash);border-radius:100px;overflow:hidden;}
.risk-meter i{display:block;height:100%;background:var(--amber);border-radius:100px;transition:width .25s ease;}.risk-meter.idio i{background:var(--blue);}
.beta-presets{margin-bottom:4px;}.marketbar,.assetbar{stroke-width:8;stroke-linecap:round;}.marketbar{stroke:var(--ink2);}.assetbar{stroke:var(--blue);}.marketdot{fill:var(--ink2);}
.alphapos,.alphaneg{stroke-width:3;stroke-dasharray:4 4;}.alphapos{stroke:var(--go);}.alphaneg{stroke:var(--no);}
.capm-chart{margin-top:4px;}

@media (max-width:820px){
  .risk-formula{grid-template-columns:1fr;} .risk-op{height:14px;} .risk-meters{grid-template-columns:1fr;}
  .hero{grid-template-columns:1fr; padding:44px 22px 30px;}
  .h1{font-size:44px;} .hero-art{display:none;} .hero-meta{grid-template-columns:1fr;}
  .prog,.wk{padding-left:22px; padding-right:22px;}
  .cards{grid-template-columns:1fr;}
  .arb{grid-template-columns:1fr;}
  .grid2{grid-template-columns:1fr;}
  .lt-row{flex-direction:column; align-items:stretch; gap:5px;}
  .lt-lbl{flex:none;}
  .wk-h1{font-size:28px;} .wk-n{font-size:36px;}
  .opts{padding-left:0;} .exp{margin-left:0;}
  .nav{padding:12px 20px;} .brand-t{display:none;}
}
`;
