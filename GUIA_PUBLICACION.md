# Publicar con enlace propio

## Opción recomendada: GitHub + Vercel

Esta combinación permite actualizar la web sin volver a configurarla:

1. Crea un repositorio en GitHub, por ejemplo `fincorp-interactiva`.
2. Sube el contenido completo de esta carpeta.
3. En Vercel, selecciona **Add New Project** e importa el repositorio.
4. Vercel detectará Vite. Verifica:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
5. Publica el proyecto.
6. En la configuración del proyecto, abre **Domains** y conecta tu dominio personal.

## Dominio

Debes comprarlo o tenerlo registrado en un proveedor de dominios. Algunos ejemplos posibles:

- fincorpcongonzalo.com
- fincorpinteractiva.com
- finanzascongonzalo.com

La compra y la conexión requieren acceso a tus cuentas; no pueden hacerse desde este archivo.

## Flujo de actualización

PPT nuevo → actualización del código → commit en GitHub → despliegue automático.

De esta forma, los estudiantes siempre usan la misma URL.
