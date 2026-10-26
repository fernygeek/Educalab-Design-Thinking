# EducaLab.ec · Prototipo "Certifícate"

Prototipo web de alta fidelidad para el caso de estudio de **Interacción Humano-Computador (EPN)**: propuesta Design Thinking + modelo AIDA para aumentar las ventas de certificaciones de EducaLab.ec.

## Páginas
- `index.html`: landing con catálogo filtrable, certificado de muestra con QR, verificador de certificados, testimonios y preguntas frecuentes.
- `inscripcion.html?curso=excel`: inscripción en 3 pasos con validación de datos y cupón (`PRIMERA10`).
- `login.html`: inicio de sesión corregido (sin errores de codificación).

Código de demostración para el verificador: `EDL-2026-0481`.

## Publicar en GitHub Pages
1. Crea un repositorio y sube estos archivos en la raíz.
2. En **Settings → Pages**, elige *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. La página queda en `https://<tu-usuario>.github.io/<repositorio>/`.

## Pendiente antes de entregar
- Horas y semanas de cada curso son valores de ejemplo: reemplázalos en `assets/app.js` (`COURSES`).
- Recolectar testimonios reales.
- El pago es simulado; no se procesa ningún cobro.
