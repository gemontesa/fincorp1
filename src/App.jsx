23:13:09.640 Running build in Washington, D.C., USA (East) – iad1
23:13:09.641 Build machine configuration: 2 cores, 8 GB
23:13:09.845 Cloning github.com/gemontesa/fincorp1 (Branch: main, Commit: 1434b0d)
23:13:12.605 Cloning completed: 2.760s
23:13:12.839 Restored build cache from previous deployment (4Ez1smRUzy5dLP7sDco5f1oVTD3t)
23:13:13.191 Running "vercel build"
23:13:13.245 Vercel CLI 58.1.0
23:13:14.057 Installing dependencies...
23:13:14.899 Using CPython 3.14.3
23:13:15.128 Resolved 24 packages in 227ms
23:13:15.139 Downloading curl-cffi (12.8MiB)
23:13:15.147 Downloading pandas (11.8MiB)
23:13:15.147 Downloading numpy (15.9MiB)
23:13:15.610  Downloaded curl-cffi
23:13:16.078  Downloaded numpy
23:13:16.191  Downloaded pandas
23:13:16.193 Prepared 24 packages in 1.06s
23:13:16.194 warning: Failed to hardlink files; falling back to full copy. This may lead to degraded performance.
23:13:16.194          If the cache and target directories are on different filesystems, hardlinking may not be supported.
23:13:16.195          If this is intentional, set `export UV_LINK_MODE=copy` or use `--link-mode=copy` to suppress this warning.
23:13:16.717 Installed 24 packages in 524ms
23:13:16.718  + beautifulsoup4==4.15.0
23:13:16.718  + certifi==2026.7.22
23:13:16.718  + cffi==2.1.1
23:13:16.718  + charset-normalizer==3.4.9
23:13:16.718  + curl-cffi==0.16.0
23:13:16.719  + frozendict==2.4.7
23:13:16.719  + idna==3.18
23:13:16.719  + multitasking==0.0.13
23:13:16.719  + numpy==2.5.1
23:13:16.719  + pandas==2.3.3
23:13:16.719  + peewee==4.3.0
23:13:16.719  + platformdirs==4.11.0
23:13:16.719  + protobuf==7.35.1
23:13:16.719  + pycparser==3.0
23:13:16.719  + python-dateutil==2.9.0.post0
23:13:16.719  + pytz==2026.3.post1
23:13:16.719  + requests==2.34.2
23:13:16.720  + six==1.17.0
23:13:16.720  + soupsieve==2.9.2
23:13:16.720  + typing-extensions==4.16.0
23:13:16.720  + tzdata==2026.3
23:13:16.720  + urllib3==2.7.0
23:13:16.720  + websockets==17.0.1
23:13:16.720  + yfinance==0.2.66
23:13:16.735 Installing dependencies...
23:13:25.413 
23:13:25.414 changed 14 packages in 8s
23:13:25.415 
23:13:25.415 8 packages are looking for funding
23:13:25.415   run `npm fund` for details
23:13:25.479 Running "npm run build"
23:13:25.633 
23:13:25.633 > fincorp-interactiva@1.0.0 build
23:13:25.633 > vite build
23:13:25.633 
23:13:25.981 vite v8.2.1 building client environment for production...
23:13:26.099 
transforming...✓ 14 modules transformed.
23:13:26.105 ✗ Build failed in 121ms
23:13:26.106 error during build:
23:13:26.106 Build failed with 1 error:
23:13:26.106 
23:13:26.106 [builtin:vite-transform] Unterminated string
23:13:26.107      ╭─[ src/App.jsx:236:162 ]
23:13:26.107      │
23:13:26.110  236 │         { id: "w4s1", part: "Parte I", partTitle: "Mercados de capital perfectos", heading: "Equity frente a deuda: la misma empresa, distintos derechos", body: "La estructura de capital describe la combinación de deuda y equity utilizada para financiar los activos. La pregunta central no es si la deuda es más barata, sino si cambiar esa combinación altera el valor total de la empresa.
23:13:26.110      │                                                                                                                                                                  ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────  
23:13:26.114      │                                                                                                                                                                                                                                                                                    ╰─────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
23:13:26.115 ─────╯
23:13:26.117 
23:13:26.117     at aggregateBindingErrorsIntoJsError (file:///vercel/path0/node_modules/rolldown/dist/shared/error-BzLGqhSQ.mjs:48:18)
23:13:26.117     at unwrapBindingResult (file:///vercel/path0/node_modules/rolldown/dist/shared/error-BzLGqhSQ.mjs:18:128)
23:13:26.118     at #build (file:///vercel/path0/node_modules/rolldown/dist/shared/rolldown-I5b6h5Km.mjs:132:34)
23:13:26.118     at async buildEnvironment (file:///vercel/path0/node_modules/vite/dist/node/chunks/node.js:33730:66)
23:13:26.118     at async Object.build (file:///vercel/path0/node_modules/vite/dist/node/chunks/node.js:34150:19)
23:13:26.118     at async Object.buildApp (file:///vercel/path0/node_modules/vite/dist/node/chunks/node.js:34147:153)
23:13:26.119     at async CAC.<anonymous> (file:///vercel/path0/node_modules/vite/dist/node/cli.js:776:3) {
23:13:26.119   errors: [Getter/Setter]
23:13:26.122 }
23:13:26.143 Error: Command "npm run build" exited with 1
