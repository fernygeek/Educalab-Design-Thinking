# EducaLab.ec · Prototipo "Certifícate"

Prototipo web de alta fidelidad para el caso de estudio de **Interacción Humano-Computador (EPN)**: propuesta de Design Thinking y modelo AIDA para aumentar las ventas de certificaciones de EducaLab.ec.

Es HTML, CSS y JavaScript puro, sin frameworks ni paso de compilación. Usa rutas relativas, así que funciona tal cual en GitHub Pages. La única dependencia externa es Google Fonts (Montserrat y Open Sans).

La auditoría del sitio actual y la aplicación de las 10 heurísticas de Nielsen están en [AUDITORIA.md](AUDITORIA.md).

## Páginas

| Archivo | Contenido |
|---|---|
| `index.html` | Landing que sigue el embudo AIDA. **Atención:** hero con certificado de muestra y QR. **Interés:** barra de confianza, catálogo filtrable y «Así te certificas». **Deseo:** verificador de certificados, testimonios y preguntas frecuentes. **Acción:** CTA final, contacto, botón flotante de WhatsApp y barra fija en móvil. |
| `inscripcion.html?curso=<id>` | Inscripción en 3 pasos: datos con validación, pago con un formulario para cada método (tarjeta, transferencia o Payphone), cupón y confirmación. **El pago es simulado.** |
| `login.html` | Inicio de sesión corregido: textos con tildes, Google como primera opción, opción para mostrar la contraseña y reCAPTCHA (simulado) solo tras 3 intentos fallidos. |
| `legal.html` | Condiciones, privacidad, pagos y facturación. Es un **borrador** que EducaLab debe validar. |
| `assets/styles.css` | Estilos y diseño responsive (de 360 a 1440 px). |
| `assets/app.js` | Datos (`CONTACT`, `COURSES`, `CERTS`, `COUPONS`) y toda la interacción. |
| `assets/og-image.png` | Imagen de 1200×630 para compartir en redes y WhatsApp. |

**Identificadores de curso:** `excel`, `web`, `movil`, `ia-banca`, `riesgos`, `auxilios`, `robotica`, `hse` y `conduccion`.

**Enlaces útiles para la campaña:**

- `index.html?area=seguridad#certificaciones` abre el catálogo ya filtrado.
- `inscripcion.html?curso=excel` lleva directo a la inscripción.

## Datos de prueba

| Qué | Valor |
|---|---|
| Código de certificado válido | `EDL-2026-0481` (cualquier otro devuelve un error) |
| Cupón | `PRIMERA10` (10% de descuento) |
| Cédula válida | `1710034065` (se valida el dígito verificador) |
| Celular | `0991234567` |
| Tarjeta | `4242 4242 4242 4242`, con cualquier fecha futura y CVV `123` |
| Login | `demo@educalab.ec` / `Demo2026` |

## Editar cursos y precios

Todo está en el arreglo `COURSES` al inicio de `assets/app.js`. Cada curso tiene `id`, `cat` (`tecnologia`, `negocios`, `seguridad` o `docencia`), `title`, `price`, `hours`, `weeks` y los dos colores del degradado de su portada.

## Probar en local

Desde la carpeta del proyecto, ejecuta uno de estos comandos:

```bash
python -m http.server 8080
# o, si no tienes Python:
npx http-server -p 8080
```

Luego abre `http://localhost:8080`.

## Publicar en GitHub Pages

1. Sube el repositorio a GitHub con estos archivos en la raíz.
2. En el repositorio, ve a **Settings → Pages**.
3. En **Source**, elige *Deploy from a branch*, la rama (`main` o `fernanda-desarrollo`) y la carpeta `/ (root)`. Pulsa **Save**.
4. En uno o dos minutos la página queda en `https://<tu-usuario>.github.io/<repositorio>/`.
5. **Después de publicar**, cambia en las cuatro páginas HTML `og:url` y `og:image` por las URL absolutas. Por ejemplo: `https://<tu-usuario>.github.io/<repositorio>/assets/og-image.png`. Las redes sociales no leen rutas relativas.
6. Comprueba la vista previa del enlace con el depurador de Facebook (https://developers.facebook.com/tools/debug/) o enviándote el enlace por WhatsApp.

## Pendiente antes de usarlo en producción

- Confirmar las horas y semanas de cada curso (`// TODO: confirmar con EducaLab` en `assets/app.js`).
- Datos bancarios reales para la transferencia (`inscripcion.html`) y la política de devoluciones (`legal.html`).
- Recolectar testimonios reales con autorización (2 espacios marcados como «Por recolectar»).
- Conectar una pasarela de pago real (Payphone o el procesador de tarjetas) y un backend para el verificador, el login y el formulario de contacto. Hoy todo es simulado.
- Validar el texto legal con EducaLab.
