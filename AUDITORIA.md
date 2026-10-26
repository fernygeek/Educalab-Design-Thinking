# Auditoría de usabilidad de EducaLab.ec

Caso de estudio de Interacción Humano-Computador (EPN), con Design Thinking y modelo AIDA.

- **Sitio auditado:** https://educalab.ec (Moodle con el tema Edumy). Revisión del 26/10/2026.
- **Método:** inspección en Chrome automatizado (puppeteer) a 1440 px y 390 px, axe-core 4 (WCAG 2.1 A/AA), Lighthouse 12 en móvil y escritorio, lectura del HTML y capturas de pantalla.
- **Páginas revisadas:** inicio, login (`/login/index.php`), Diseño de páginas web (`/mod/page/view.php?id=1`), Contacto (`id=80`), Condiciones (`id=267`), Política de seguridad (`id=268`), Aulas virtuales (`id=270`), Tienda virtual (`id=271`), Consultorías BI (`id=272`), ¿Quiénes somos? (`id=16`), Instructores (`id=14`), categorías (`/course/index.php`), búsqueda (`/course/search.php?search=excel`) y un curso (`/course/view.php?id=18`).

## Escala

**Heurísticas de Nielsen:**

- **H1:** Visibilidad del estado del sistema.
- **H2:** Relación entre el sistema y el mundo real.
- **H3:** Control y libertad del usuario.
- **H4:** Consistencia y estándares.
- **H5:** Prevención de errores.
- **H6:** Reconocer antes que recordar.
- **H7:** Flexibilidad y eficiencia de uso.
- **H8:** Diseño estético y minimalista.
- **H9:** Ayudar a reconocer, diagnosticar y recuperarse de errores.
- **H10:** Ayuda y documentación.

**Severidad:**

- **0:** No es un problema.
- **1:** Cosmético.
- **2:** Menor.
- **3:** Mayor.
- **4:** Catastrófico (impide vender o daña la confianza).

## A. Problemas ya reportados (verificados)

| # | Página | Problema | Evidencia | Heurística | Sev. | Corrección aplicada |
|---|---|---|---|---|---|---|
| 1 | Diseño de páginas web (`id=1`), bloque «Algunos ejemplos» | **Confirmado.** 12 imágenes del portafolio devuelven 404 y el contenido no tiene relación con la oferta educativa. Además, 54 imágenes no tienen `alt`. | 404 en `/pluginfile.php/29/mod_page/content/14/aleluya%20garden%20{inicio,nosotros,porcentajes,contactos,programa,ubicacion}.jpg` y `LIVING%20{inicio,have,projects,testimonials,latest,contactos}.jpg`. axe: `image-alt` (crítico) ×54. En esta prueba, las imágenes de «Imagen Sistemas» no dieron 404. | H8, H4 | 3 | Se eliminó el portafolio. La landing se centra solo en certificaciones y no usa imágenes externas: todo es SVG en línea o degradados. |
| 2 | Tienda virtual (`id=271`) y Consultorías BI (`id=272`) | **Confirmado.** Solo tienen un título y una línea: «Diseñamos tu tienda virtual acorde a tus necesidades.». La página de BI solo repite su título. | Texto completo de `#region-main` en ambas URL. | H8, H10 | 2 | Los servicios ajenos a la venta de certificaciones quedan fuera del recorrido. Cada página nueva tiene contenido real. |
| 3 | Login | **Confirmado.** Los `placeholder` muestran `Nombre de usuario o correo electrónico` y `Contraseña`. Las etiquetas ocultas sí se ven bien, lo que indica un doble escape en la cadena JS del tema que inyecta el `placeholder`. | `input#username[placeholder]` y `input#password[placeholder]`. El mismo patrón aparece en el JSON incrustado: `América\/Guayaquil` y `Última modificación`. | H4, H2 | 3 | `login.html` está en UTF-8 (`<meta charset="utf-8">`) y escribe los textos directamente en el HTML, sin inyectarlos por JS. Una prueba automática confirma que no hay `\u00`, `Ã` ni entidades visibles. |
| 4 | Contacto (`id=80`) | **Confirmado.** El teléfono aparece como **+539 97 8893 727**: el código de país es incorrecto (+539 no es Ecuador) y la agrupación no es la misma que en la cabecera (+593 97 889 3727). | Texto visible bajo «Teléfono» en `/mod/page/view.php?id=80`. | H4 | 4 | Se usa un único dato en todo el sitio: +593 97 889 3727, enlazado con `tel:+593978893727`. |
| 5 | Contacto (`id=80`) | **Confirmado.** El teléfono usa el mismo ícono de sobre que el correo. | Captura a 1440 px: dos sobres idénticos sobre «Teléfono» e «Información». | H4, H6 | 2 | Cada canal tiene su propio ícono: teléfono, sobre, WhatsApp y ubicación (sección `#contacto` y barra superior). |
| 6 | Contacto (`id=80`) | **Confirmado.** Las etiquetas del formulario están en inglés («Your name», «Email address», «Subject», «Send») y la columna izquierda queda vacía. | Texto del formulario y captura a 1440 px. | H4, H2, H8 | 2 | El formulario nuevo está en español, con campos obligatorios marcados (*), validación y confirmación. La columna izquierda muestra los canales de contacto. |
| 7 | Inicio, «¿Qué dicen nuestros estudiantes?» | **Confirmado con matiz.** El nombre aparece partido («RAFAELA» / «Silva»), hay una falta de ortografía («Me gusto») y no hay fotos. El carrusel muestra **3** testimonios (David Cobos, Rafaela Silva y Joyce Rodríguez), no uno solo. | Texto de `[class*=testimonial]` en el inicio. | H4, H8 | 2 | Se mantiene solo el testimonio de Rafaela Silva, que el cliente confirmó como real, corregido a «Me gustó». Los otros espacios están marcados como «Por recolectar». Los de David y Joyce no se publican hasta que EducaLab confirme que son reales. |
| 8 | Catálogo y búsqueda | **Confirmado.** Las tarjetas solo muestran $80, sin duración, modalidad, aval ni botón de compra. El botón de compra («Buy & Enrol Now») solo aparece dentro del curso y está en inglés. | `/course/search.php?search=excel`; `a.cart_btnss` en `/course/view.php?id=18`. | H6, H2 | 3 | Cada tarjeta muestra horas, semanas, modalidad, precio, «pago único», el botón «Inscribirme» y un enlace «Preguntar por WhatsApp» con el curso ya escrito en el mensaje. |
| 9 | Búsqueda y categorías | **Confirmado.** El banner muestra «EDUCALAB.EC \| FORMACIÓN PARA PROFE…»: el nombre del sitio sustituye al título de la página y se corta. | Captura a 1440 px de `/course/search.php?search=excel`. | H4, H6 | 1 | Títulos cortos y descriptivos por página: un único `h1` visible y un `<title>` con el formato «Tema \| EducaLab.ec». |
| 10 | Todas | **Confirmado.** El botón de WhatsApp se superpone con el de volver arriba. | Al desplazarse a 1440 px: `a` de WhatsApp en x 1340–1400 / y 800–860 y `.scrollToHome` en x 1380–1420 / y 845–885. Los dos rectángulos se cruzan. | H8, H4 | 2 | «Volver arriba» se apila encima del botón de WhatsApp (escritorio) o de la barra inferior (móvil). Una prueba automática verifica que no se cruzan en 1440 y 390 px. |
| 11 | Login | **Confirmado.** El reCAPTCHA aparece visible (78 px de alto) antes de cualquier intento de acceso. | `iframe[src*=recaptcha]` con `offsetHeight` de 78 al cargar la página. | H5, H8 | 2 | La verificación solo aparece después de 3 intentos fallidos y explica por qué se pide (en el prototipo es simulada). |

## B. Problemas nuevos encontrados

| # | Página | Problema | Evidencia | Heurística | Sev. | Corrección aplicada |
|---|---|---|---|---|---|---|
| 12 | «¿Quiénes somos?» (`id=16`), enlazada desde el menú | La página devuelve **error 500** y muestra la traza interna del servidor. | `Error code: cannotviewcategory · Stack trace: line 281 of /course/classes/category.php…`. HTTP 500. | H9, H4 | 4 | Ningún enlace del sitio nuevo apunta a una página inexistente: no hay `href="#"` en el menú ni en el pie. **Para el Moodle real:** desactivar el modo depuración (`debugdisplay`) en producción y corregir los permisos del bloque de categorías. |
| 13 | Curso (`id=18`) | Para comprar hay que registrarse: «Buy & Enrol Now» redirige a `/login/index.php`. El camino es Inicio → Cursos → curso → Buy & Enrol → registro (y confirmación del correo) → matrícula → pago, es decir, **6 o más pasos** y una salida al correo antes de pagar. | `curl -L /enrol/index.php?id=18` termina en `/login/index.php`. | H7, H3 | 4 | Hay **3 clics** desde la landing hasta el pago (Inscribirme → Continuar al pago → Pagar). La cuenta se crea con la inscripción. |
| 14 | Inicio | Rendimiento muy bajo: la página pesa **38 MB** y el LCP es de **22,9 s** en móvil. Lighthouse estima 33 MB de ahorro con formatos modernos de imagen y 24 MB con imágenes responsive. Hay recursos que bloquean el renderizado (3,2 s). | Lighthouse móvil: Performance **5**. Escritorio: **54**. | H8, H1 | 4 | El sitio nuevo pesa **146 KB**, con LCP de 2,9 s (móvil) y 0,7 s (escritorio). Ver la sección D. |
| 15 | Todas | No hay `meta description` ni etiquetas Open Graph o Twitter. Al compartir el enlace en redes o WhatsApp no aparecen título, descripción ni imagen, justo lo que necesita la campaña pagada. | `meta[name=description]` y `meta[property^=og:]` vacíos en las 14 páginas. Lighthouse SEO: 73. | H2 | 3 | Cada página tiene `description`, `og:*`, `twitter:card` y una imagen `assets/og-image.png` de 1200×630. |
| 16 | Inicio, curso, categorías y búsqueda | No hay `h1`. Los encabezados saltan de nivel (H3 → H6 → H2 en el inicio) y se repiten encabezados vacíos llamados «Bloques». | Inicio: `H3 H6 H2 H2 … H5 …`; login: `H3 H6 H3`. | H4 | 2 | Un solo `h1` por página y jerarquía h1 → h2 → h3 sin saltos. El pie usa `h2.fh`. |
| 17 | Todas | Falla el contraste: axe detecta `color-contrast` (grave) ×25 en el inicio y ×12 en categorías (texto naranja o gris claro sobre blanco y sobre el degradado). | axe: `.selected`, `.ccn_course_meta_item`, `.courses_list_content p`. | H8 | 3 | Contraste AA verificado con axe: 0 violaciones. Ver la nota de color al final. |
| 18 | Todas | Hay botones e íconos sin nombre accesible: `link-name` ×12 (redes sociales del pie) y `button-name` en la búsqueda. | axe: `.list-inline-item > a[target=_blank]` y `.btn-outline-secondary`. | H4 | 2 | Todos los botones de ícono tienen `aria-label` (menú, WhatsApp, volver arriba). Los SVG decorativos llevan `aria-hidden`. |
| 19 | Todas | El idioma declarado es `lang="es-co"` (Colombia) en un sitio ecuatoriano. | `<html lang="es-co">`. | H2 | 1 | Se declara `lang="es"` y `og:locale` con el valor `es_EC`. |
| 20 | Varias | Hay mezcla de idiomas: «Search courses...» (búsqueda), «Last online» (Instructores), «Buy & Enrol Now» (curso), «Or» junto a Google en el login, y «[Cocoon] Slider style 4», visible en el enlace para saltar al contenido. | Texto visible y valores `placeholder`. | H4, H2 | 2 | Todos los textos están en español. Los enlaces para saltar al contenido son descriptivos. |
| 21 | Curso (`id=18`) | Faltas de ortografía en el contenido: «Bussines Intelligence», «Para Qué ?». | Texto del índice del curso. | H8 | 1 | No aplica al sitio nuevo. **Para el Moodle real:** revisar la ortografía del contenido de los cursos. |
| 22 | Todas | `/favicon.ico` devuelve 404. | Respuesta 404 registrada en la consola. | H4 | 1 | Favicon SVG en línea, con 0 errores 404. |
| 23 | Inicio | No hay certificado de muestra ni forma de verificar un certificado. No se explican los métodos de pago ni la facturación antes de registrarse. | Revisión del contenido del inicio y de la página del curso. | H10, H6 | 4 | Hay un certificado de muestra con QR en el hero, un verificador (con el código de demostración EDL-2026-0481), la línea «Tarjeta, transferencia o Payphone · Factura electrónica» bajo los CTA, preguntas frecuentes y la página `legal.html#pagos`. |
| 24 | Login y Contacto | Los formularios no muestran validación propia ni campos obligatorios marcados, y Contacto no tiene confirmación visible en la página. | Contacto: `required` sin indicador visual. | H5, H9 | 2 | Los formularios muestran un error específico bajo cada campo (`aria-invalid` y `aria-describedby`), llevan el foco al primer error y confirman el envío. |
| 25 | Condiciones (`id=267`) y Seguridad (`id=268`) | Existen, pero no están enlazadas cerca del pago y no explican qué datos personales se piden ni para qué. | Contenido de las páginas. | H10 | 2 | El paso de pago tiene una casilla obligatoria que enlaza a `legal.html` (se abre en otra pestaña para no perder los datos). La página de privacidad explica qué datos se piden y para qué. Es un **borrador** que EducaLab debe validar. |
| 26 | Móvil (390 px) | 57 áreas táctiles miden menos de 44 px en el inicio y 64 en categorías. No hay desbordamiento horizontal. | Medición de `getBoundingClientRect` a 390 px. | H7 | 2 | Botones, chips, campos y enlaces de navegación miden 44 px o más (verificado con una prueba). |

## C. Cómo se aplicaron las 10 heurísticas en el sitio nuevo

| Heurística | Implementación |
|---|---|
| H1. Visibilidad del estado | Indicador de 3 pasos con `aria-current="step"`. El `<title>` cambia («Paso 2 de 3: Tus datos»). El contador del catálogo dice, por ejemplo, «Mostrando 4 certificaciones de Seguridad y salud». El botón muestra «Procesando pago simulado…» mientras se procesa. El cupón da un mensaje en vivo y aparece un aviso de Bloq Mayús. |
| H2. Mundo real | Lenguaje local: cédula, RUC, celular «09…», precios en dólares, WhatsApp como canal principal y certificado con horas académicas. |
| H3. Control y libertad | Se puede volver del pago a los datos sin perder información, cambiar la certificación desde el resumen, quitar el cupón y cerrar el menú con Escape. Se avisa antes de salir con datos sin enviar. |
| H4. Consistencia | Un único teléfono y correo, cabecera y pie idénticos en todas las páginas, un ícono por canal, todo en español y un solo estilo de botón primario. |
| H5. Prevención de errores | Validación de la cédula (provincia y dígito verificador), la tarjeta (algoritmo de Luhn) y la fecha de vencimiento. Formato automático de la tarjeta y de MM/AA. Campos que solo aceptan números. Aceptación obligatoria de las condiciones. reCAPTCHA solo tras 3 intentos fallidos. |
| H6. Reconocer antes que recordar | Resumen lateral siempre visible, nombre del curso en el `h1`, ejemplos en los `placeholder`, etiquetas que no desaparecen al escribir y celular de Payphone tomado del paso anterior. |
| H7. Flexibilidad y eficiencia | 3 clics hasta el pago. Enlaces profundos `?curso=` y `?area=` para los anuncios. Enter aplica el cupón. Atributos `autocomplete` (`cc-number`, `email`, `tel`). Botón «Continuar con Google» como primera opción. |
| H8. Estética y minimalismo | Una sola oferta (certificaciones), sin portafolio ajeno ni servicios vacíos. El sitio pesa 146 KB en lugar de 38 MB. |
| H9. Recuperarse de errores | Cada mensaje dice qué pasó y cómo corregirlo: «La cédula tiene 10 dígitos; escribiste 4», «Esta tarjeta ya venció. Usa otra o elige transferencia», «Revisa que no hayas confundido la letra O con el número 0». El foco va al primer campo con error. |
| H10. Ayuda y documentación | Sección «Así te certificas», preguntas frecuentes, textos de ayuda bajo los campos, WhatsApp con mensaje según el contexto (curso, verificación, pedido) y página de pagos y facturación. |

## D. Puntajes medidos

Lighthouse 12. El sitio nuevo se sirvió en local (`http://localhost:8080`) y el actual se midió en producción.

| Página | Perf. móvil | Perf. escritorio | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|---|
| educalab.ec (actual), inicio | 5 | 54 | 77 / 79 | 100 | 73 |
| `index.html` (nuevo) | 88 | 99 | 100 | 100 | 100 |
| `inscripcion.html` (nuevo) | 88 | 99 | 100 | 100 | 60* |
| `login.html` (nuevo) | 83 | 100 | 100 | 100 | 100 |

\* `inscripcion.html` lleva `noindex` a propósito: un paso de pago no debe aparecer en Google. El rendimiento móvil (83–88) está limitado sobre todo por la carga de Google Fonts en la conexión 4G simulada.

**axe-core** (WCAG 2.1 A/AA y buenas prácticas):

- **Sitio actual:** de 1 a 5 tipos de violación por página. Las más frecuentes son `color-contrast`, `image-alt`, `link-name` y `button-name`.
- **Sitio nuevo:** 0 violaciones en `index.html`, `inscripcion.html`, `login.html` y `legal.html`.

**Pruebas funcionales automatizadas** (puppeteer, 79 comprobaciones, todas aprobadas):

- Filtros por área, incluido el filtro desde la URL.
- Verificador: código válido, código no encontrado, formato incorrecto y campo vacío.
- Formulario de contacto.
- Validación completa de la inscripción y cupón PRIMERA10 ($80,00 → $72,00).
- Cambio de método de pago y flujo completo hasta la confirmación.
- Login, con el reCAPTCHA después de 3 intentos.
- Menú móvil y botones flotantes sin superposición.
- Ausencia de desplazamiento horizontal a 360, 390, 768 y 1440 px.
- 0 errores de consola y 0 respuestas 404.

**Nota de color:** el blanco sobre #E8662A da un contraste de 3,3:1 y el blanco sobre #1FAF57, de 2,9:1. Ninguno cumple AA (4,5:1) para texto normal. Por eso:

- #E8662A se mantiene como color de marca en el logo, los bordes, los íconos y el anillo de foco.
- Los botones con texto usan #C2501A (4,7:1).
- El texto naranja pequeño usa #B04816 (5,5:1).
- Los botones de WhatsApp con texto usan #14803F.

## E. Los 5 problemas que más afectan la venta

1. **Registro obligatorio antes de pagar (#13).** El cliente sale a su correo a confirmar la cuenta antes de ver cómo pagar. Es el punto del embudo donde más compras se pierden, y la campaña pagada llevaría tráfico directo a ese muro.
2. **Página de 38 MB con 22,9 s de carga en móvil (#14).** El público compra desde el celular. Con datos móviles, buena parte de quienes hagan clic en un anuncio cerrará la página antes de ver el primer contenido.
3. **No hay prueba de valor del certificado (#23).** El usuario busca un certificado «válido para su hoja de vida o concursos públicos», pero el sitio no muestra un certificado de muestra ni permite verificarlo. Es el argumento principal de venta y no aparece.
4. **Datos de contacto incorrectos y un enlace que da error 500 con la traza del servidor (#4 y #12).** Un código de país equivocado y una página «¿Quiénes somos?» rota generan desconfianza justo cuando el usuario evalúa si el negocio es serio, y los contactos que intenten llamar se pierden.
5. **Sin Open Graph ni descripción (#15).** Los anuncios y los enlaces compartidos por WhatsApp se ven sin imagen ni texto, lo que reduce los clics de la campaña antes de que alguien llegue al sitio.

## Pendiente de confirmar con EducaLab

- Horas y semanas reales de cada curso (marcadas con `// TODO: confirmar con EducaLab` en `assets/app.js`).
- Datos bancarios para transferencia y política de devoluciones (`inscripcion.html` y `legal.html`).
- Si los testimonios de David Cobos y Joyce Rodríguez son reales y tienen autorización para publicarse.
- El texto legal definitivo. `legal.html` es un borrador.
- El aval institucional que pueda mostrarse. En la imagen del curso de Excel aparece el logo del Ministerio del Trabajo, pero el sitio no explica ese aval y no se usó en el prototipo.
