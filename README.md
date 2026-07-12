# Finanzas Corporativas 1 — Guía interactiva

Aplicación web pública construida con React y Vite. Incluye el programa de 16 semanas, la Semana 1 desarrollada, simuladores interactivos y autoevaluación.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Crear la versión de producción

```bash
npm run build
```

El resultado queda en la carpeta `dist/`.

## Publicación recomendada

1. Crear un repositorio vacío en GitHub.
2. Subir todos los archivos de esta carpeta.
3. Importar el repositorio en Vercel o Netlify.
4. Configurar:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Añadir el dominio personal desde el panel del proveedor.

El enlace público no mostrará ChatGPT, Claude ni otra marca. Usará el subdominio del proveedor mientras no se conecte un dominio propio; después mostrará únicamente el dominio elegido.

## Actualizaciones del curso

La página está preparada para que cada semana se complete progresivamente. El contenido principal se encuentra en `src/App.jsx` dentro del objeto `SEED`.

Cuando se agreguen nuevos PPT, se pueden incorporar:

- Explicaciones intuitivas.
- Casos empresariales.
- Gráficos y simuladores.
- Ejercicios resueltos.
- Preguntas de autoevaluación.

## Modo de edición

El editor integrado está desactivado por defecto. Para habilitarlo localmente:

1. Copiar `.env.example` como `.env`.
2. Cambiar `VITE_ENABLE_EDITOR=true`.
3. Definir `VITE_EDIT_PASS`.

Importante: las ediciones se guardan en `localStorage`, es decir, solo en ese navegador. No se publican automáticamente para todos los estudiantes. Para edición remota segura se necesita un backend con autenticación y base de datos.
