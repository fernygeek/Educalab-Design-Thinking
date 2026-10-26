# Guía visual extraída del diseño de Figma Make

- **Fuente:** `referencia/diseno.zip`, un proyecto React 19, Vite 8 y Tailwind 4 exportado de Figma Make. Se descomprimió en `referencia/extraido/`.
- **Archivos leídos:** `src/index.css`, `src/App.tsx`, `package.json` e `index.html`.
- **Archivos que no existen en el export:** `tailwind.config`, `globals.css` y `src/components/`. Todos los componentes están en `App.tsx`.

> **Hallazgo clave:** el diseño **no usa clases utilitarias de Tailwind**. `index.css` solo hace `@import 'tailwindcss'` y el resto es CSS normal con clases propias (`.hero`, `.course`, `.tabs`…). No hay nada que traducir desde utilidades: los valores de abajo se toman tal cual del CSS. Los colores hexadecimales con transparencia (`#1111`, `#2222`, `#fff8`) se convierten a `rgba`.

## 1. Colores

### Variables del diseño (`:root`)

| Variable | Hex | Uso |
|---|---|---|
| `--orange` | `#E8662A` | Botones, acentos, precio, palabras destacadas en títulos, íconos |
| `--black` | `#1B1B1B` | Texto, chip activo, botón oscuro |
| `--muted` | `#6C6C6C` | Texto secundario (declarado, aunque casi siempre se usa `#666`) |
| `--light` | `#F5F4F1` | Fondo claro (declarado, aunque casi no se usa) |

### Colores escritos directamente en el CSS

| Uso | Valor original | Hex o rgba |
|---|---|---|
| Barra superior: fondo y texto | `#171717` / `#ddd` | `#171717` / `#DDDDDD` |
| Sombra del header | `#1111` | `rgba(17,17,17,.07)` |
| Texto del menú | `#292929` | `#292929` |
| Bordes de tarjetas y separadores | `#e2e2e2`, `#e6e6e6`, `#ddd`, `#eee` | `#E2E2E2`, `#E6E6E6`, `#DDDDDD`, `#EEEEEE` |
| Texto secundario | `#666`, `#777`, `#888`, `#999` | `#666666`, `#777777`, `#888888`, `#999999` |
| Fondo de testimonios y borde de sus tarjetas | `#f7f6f3` / `#e8e5df` | `#F7F6F3` / `#E8E5DF` |
| Fondo del login | `#f4f3ef` | `#F4F3EF` |
| Indicador de pasos (fondo) | `#f1f0ed` | `#F1F0ED` |
| Resumen del pedido (fondo) | `#f6f5f2` | `#F6F5F2` |
| Sección oscura «por qué» | `var(--black)` | `#1B1B1B` |
| Etiqueta naranja sobre fondo oscuro | `#ff8c55` | `#FF8C55` |
| Footer: fondo, texto, líneas, redes | `#121212`, `#aaa`, `#333`, `#292929` | `#121212`, `#AAAAAA`, `#333333`, `#292929` |
| Banner de páginas internas | `linear-gradient(110deg,#2b2b2b 0%,#555 48%,#E8662A 100%)` | Igual |
| Superposición del hero | `linear-gradient(90deg,rgba(20,20,20,.92),rgba(20,20,20,.2))` | Igual |
| Éxito / error | `#237a40` / `#b82e26` | `#237A40` / `#B82E26` |
| Confirmación: fondo e ícono | `#eaf8ee` / `#258744` | `#EAF8EE` / `#258744` |
| WhatsApp flotante / barra móvil | `#25d366` / `#25a85a` | `#25D366` / `#25A85A` |
| Sombra de tarjeta al pasar el mouse | `#2222` | `rgba(34,34,34,.13)` |
| Puntos del carrusel | `#fff8` | `rgba(255,255,255,.53)` |

## 2. Tipografía

Las fuentes son las mismas que ya usa el sitio: **Montserrat** (500–800) en títulos, logo, menú y botones, y **Open Sans** (400–700) en el texto.

| Elemento | Escritorio | ≤ 850 px | ≤ 600 px |
|---|---|---|---|
| Título del hero (`h1`) | 54px / 1.08, 800, espaciado de letra −1.6px | 42px | 35px |
| Título de sección (`h2`) | 38px / 1.2, espaciado −1px; una palabra en naranja (`<em>`) | 38px | 30px |
| Título del CTA | 40px | 40px | 30px |
| Título del banner interno | 42px | 42px | 30px |
| Título de tarjeta (`h3`) | 19px / 1.4 | | |
| Etiqueta superior («eyebrow») | 11px, 700, espaciado 2px, MAYÚSCULAS, naranja | | |
| Menú | 12px, 700, MAYÚSCULAS, `#292929` | 12px, alineado a la izquierda | |
| Botones | Montserrat 13px, 700 | | |
| Texto del hero | 18px / 1.7, `#ddd` sobre fondo oscuro | | 15px |
| Texto de párrafo | 1.7 a 1.8 de interlineado, `#666` | | |
| Etiquetas de formulario | 12px, 700 | | |
| Datos de tarjeta (horas, modalidad) | 12px, `#777` | | |
| Logo | 22px, espaciado −1px; «EDUCA» negro y «LAB» naranja; «.EC» a 11px | | 17px en el certificado |

## 3. Espaciado y medidas

| Elemento | Valor |
|---|---|
| Ancho del contenedor | `min(1180px, 100% − 48px)`. En ≤ 850 px: `min(100% − 30px, 700px)` |
| Alto de la barra superior | 38px (33px en móvil) |
| Alto del header | 82px (70px en ≤ 850 px), fijo arriba al hacer scroll |
| Separación del menú | 29px entre enlaces, 30px antes del botón «Inscribirme» |
| Padding vertical de sección | 90px (65px en móvil) |
| Margen bajo el encabezado de sección | 42px |
| Separación entre tarjetas | 24px en cursos y 22px en testimonios y personas |
| Padding de tarjeta | 22px en cursos y 30px en testimonios |
| Botón principal | `15px 22px` (el del menú, `13px 18px`) |
| Campos de formulario | padding 13px, borde 1px `#ddd` |
| Barra inferior móvil | 58px de alto, dos mitades a todo el ancho |

## 4. Radios y sombras

- **Radios:** el estilo es de **esquinas rectas (0)** en botones, tarjetas, campos, chips y certificado. Solo son redondos el botón flotante de WhatsApp, los avatares, los puntos del carrusel y los círculos del indicador de pasos. El botón «volver arriba» tiene 2px.
- **Sombras:**

| Elemento | Sombra |
|---|---|
| Header | `0 2px 14px rgba(17,17,17,.07)` |
| Tarjeta de curso al pasar el mouse | `0 14px 40px rgba(34,34,34,.13)` y desplazamiento `translateY(-5px)` |
| Certificado | `0 20px 50px rgba(34,34,34,.13)` |
| Formulario de login | `0 15px 45px rgba(34,34,34,.07)` |
| Barra móvil | `0 -3px 15px rgba(17,17,17,.13)` |

## 5. Cómo se ve cada sección

- **Barra superior:** franja casi negra (`#171717`) de 38px con teléfono y correo, cada uno con su ícono de línea. «Iniciar sesión / Registrarse» va a la derecha con ícono de usuario. Texto de 12px.
- **Header:** blanco, 82px, sombra muy suave, fijo arriba. Logo con un birrete naranja encima. Menú en MAYÚSCULAS de 12px en negrita. Botón naranja recto «Inscribirme →» separado a la derecha. En ≤ 850 px aparece el ícono de menú y el menú cae como un panel blanco a todo el ancho.
- **Hero:** 590px de alto, **foto de fondo** con un degradado oscuro de izquierda a derecha y texto blanco alineado a la izquierda. Arriba va una etiqueta naranja, luego un título grande y un botón naranja con flecha. Es un **carrusel automático** de 3 diapositivas (cada 5,5 s) con puntos abajo; el punto activo es una barra naranja.
- **Barra de confianza:** fondo blanco con borde inferior y 4 columnas centradas separadas por líneas verticales. Cada columna tiene un número grande naranja (25px, 800) y un texto pequeño gris.
- **Encabezado de sección:** etiqueta naranja, `h2` con una palabra en naranja («Cursos que impulsan *tu carrera*») y, a la derecha, un párrafo gris alineado al final. En tablet o móvil el párrafo pasa debajo.
- **Filtros (pestañas):** botones rectos con borde `#ddd`, 12px en negrita y fondo negro cuando están activos. Si no caben, se desplazan en horizontal.
- **Tarjeta de curso:** borde de 1px, sin radio, foto de 220px arriba con una etiqueta negra «NUEVO» en la esquina superior izquierda. Debajo van la categoría en MAYÚSCULAS gris, el precio naranja grande arriba a la derecha («$80 USD») y el título. Sigue una fila de datos (horas y modalidad con íconos) entre dos líneas finas y, al final, el enlace naranja «Inscribirme →». Al pasar el mouse, la tarjeta sube 5px y gana sombra.
- **Sección oscura «Aterrizaste en el lugar adecuado»:** fondo `#1B1B1B` en dos columnas: texto con lista de ventajas con check naranja, y una imagen con botón de reproducir.
- **Instructores:** fondo oscuro con 3 fotos verticales de 390px y degradado negro abajo, donde van nombre, cargo y número de cursos.
- **Testimonios:** fondo `#F7F6F3` y 3 tarjetas blancas con borde `#E8E5DF`. Cada tarjeta lleva 5 estrellas naranjas, una cita en cursiva gris y el autor con foto circular de 48px y el texto «Estudiante verificado».
- **CTA:** banda naranja a todo el ancho con texto centrado (etiqueta, `h2` de 40px y párrafo) y un **botón negro** con flecha.
- **Footer:** casi negro (`#121212`) con 4 columnas (1.4 / 1 / 1 / 1.2). Los títulos van en MAYÚSCULAS de 12px con una línea inferior `#333`. Incluye cuadros de redes sociales de 30px y una franja de copyright separada por una línea.
- **Banner de páginas internas:** 265px con degradado de gris oscuro a naranja, ruta pequeña («INICIO / CONTACTO») y título blanco de 42px.
- **Contacto:** dos columnas (0.8 / 1.2). A la izquierda, cada canal con ícono naranja, una etiqueta mínima en MAYÚSCULAS y el dato en negrita. A la derecha, un formulario con etiquetas en negrita sobre campos rectos.
- **Verificador:** campo y botón «Verificar» unidos en una sola fila. El resultado sale debajo con ícono (verde si es válido, rojo si no).
- **Certificado de muestra:** marco negro grueso (9px) con un contorno naranja de 2px y sombra amplia. Lleva logo y código arriba, la frase «CERTIFICADO DE APROBACIÓN» en naranja espaciado, el nombre grande con línea inferior, la firma y el QR abajo.
- **Inscripción:** en la referencia es un **modal**. Arriba tiene una barra gris de 3 pasos (círculo naranja en el paso activo) y debajo el contenido con una etiqueta «PASO 1 DE 3». El resumen del pedido va en una caja beige, el cupón con botón negro pegado al campo, y la confirmación tiene un círculo verde claro con check.
- **Login:** fondo beige `#F4F3EF` y una tarjeta blanca centrada de 450px con sombra suave, con logo, título, campos, «Recordarme» y «Olvidé mi contraseña».
- **Botones flotantes:** WhatsApp (círculo verde) y volver arriba (cuadrado naranja) van **lado a lado** en la esquina, sin superponerse. En ≤ 600 px se ocultan y aparece la barra inferior: mitad naranja «Inscribirme» y mitad verde «WhatsApp».

## 6. Relación entre la referencia y mi sitio

| Componente de la referencia | Sección equivalente en mi sitio | Qué se aplicaría |
|---|---|---|
| `.topbar` | `aside.topbar` (todas las páginas) | Fondo `#171717`, 38px y texto 12px `#DDD`. Ya tiene íconos. |
| `header` / `nav` / `.nav-cta` | `header.site`, `nav.main` | 82px, sombra suave en lugar de borde, menú de 12px en negrita y botón recto con flecha. El orden y los enlaces del menú no cambian. |
| `.logo` con birrete | `.logo` | Se mantiene el birrete SVG. Se puede pasar a «EDUCA» negro y «LAB» naranja como en la referencia, sin cambiar el texto. |
| `.hero` (foto y carrusel) | `.hero` de `index.html` | Hero oscuro con texto blanco y etiqueta naranja, conservando el certificado de muestra. **Sin foto ni carrusel** (ver la sección 7). |
| `.trust-grid` | `section.trust` | Fondo blanco, columnas centradas con separadores verticales. Se conservan mis 4 textos; no se agregan cifras. |
| `.section-head` (etiqueta, `h2` con `<em>`) | `.sec-head` de todas las secciones | `h2` de 38px con una palabra resaltada en naranja usando `<em>` sobre el texto que ya existe. Párrafo a la derecha en escritorio. |
| `.tabs` | `.filters` / `.chip` | Chips rectos, 12px en negrita, negro cuando están activos. Se mantienen `aria-pressed`, `data-cat` y los 44px de alto. |
| `.course` | `.course` (generada por `app.js`) | Borde recto, portada de degradado (sin foto), etiqueta negra, precio naranja, fila de datos entre líneas, subida de 5px al pasar el mouse. Solo CSS, porque el HTML lo genera `app.js` y ese archivo no se toca. |
| `.right-place` (sección oscura) | «Así te certificas» (`.how`) | Fondo `#1B1B1B`, texto claro y números naranjas. |
| `.instructors` | No hay equivalente | No se aplica. |
| `.test-grid` | Testimonios (`.tgrid`) | Fondo `#F7F6F3` y tarjetas blancas rectas. Sin estrellas ni fotos (ver la sección 7). |
| `.cta` + `.dark-btn` | `section.cta` | Banda naranja con botón negro. |
| `footer` / `.footer-grid` | `footer.site` | `#121212`, títulos de 12px en MAYÚSCULAS con línea inferior, columnas 1.4 / 1 / 1 / 1.2. |
| `.page-banner` | Encabezado de `inscripcion.html` y `legal.html` | Banda con degradado de gris a naranja y título blanco, como envoltorio del `h1` que ya existe. |
| `.contact-grid` / `.contact-line` | `#contacto` (`.clist` y `#contact-form`) | Íconos naranjas sin círculo de fondo, etiqueta pequeña en MAYÚSCULAS y dato en negrita. Campos rectos. |
| `.verify` | `.vform` | Campo y botón unidos en una fila (se separan en móvil). |
| `.certificate` | `.cert` del hero | Marco negro de 9px con contorno naranja y nombre grande. |
| `.steps` del modal | `.steps` de `inscripcion.html` | Barra gris con círculos y el activo en naranja. Sigue siendo una página, no un modal. |
| `.order`, `.coupon` | `.summary` y `#coupon-form` | Caja beige para los totales y botón «Aplicar» negro pegado al campo. |
| `.done` | `.done-box` | Círculo verde claro con check. |
| `.login-section` | `login.html` (`.auth`) | Fondo beige y tarjeta blanca centrada, en lugar del panel naranja lateral actual. Los campos, Google y el reCAPTCHA no cambian. |
| `.floating` | `.quick` (`.fab` y `.totop`) | Lado a lado en horizontal. «Volver arriba» cuadrado y naranja. |
| `.mobile-bar` | `.mbar` | Dos mitades a todo el ancho de 58px, sin márgenes. |

## 7. Lo que no se toma de la referencia

### Imágenes externas (Unsplash), para que decidas

La referencia carga 7 fotos desde `images.unsplash.com`. **No las enlazaré.**

| Uso en la referencia | URL |
|---|---|
| Hero, diapositiva 1, y portada de «Power BI» | `https://images.unsplash.com/photo-1632835298280-ad3d64834ab8` |
| Hero 2, video y «Formador de Formadores» | `https://images.unsplash.com/photo-1663507898277-e4f94adc9333` |
| Hero 3 y «Desarrollo Web con React» | `https://images.unsplash.com/photo-1531496730074-83b638c0a7ac` |
| Instructora «Carla Mendoza», «IA para docentes» y foto de Rafaela Silva | `https://images.unsplash.com/photo-1758873268180-d95d10c86588` |
| Instructor «Diego Salazar», «Robótica» y foto de David Cobos | `https://images.unsplash.com/photo-1549045337-967927d923c0` |
| Instructor «Mateo Ruiz» y «Riesgos laborales» | `https://images.unsplash.com/photo-1601392561050-340745ba9c25` |
| Foto de Joyce Rodríguez | `https://images.unsplash.com/photo-1731419223715-aec6664f9011` |

**Opciones:**

- **A (recomendada):** no usar fotos y mantener degradados y SVG.
- **B:** descargar 1 o 2 fotos para el hero, comprimirlas a WebP y guardarlas en `assets/img/`. Unsplash permite uso gratuito.

En ningún caso conviene poner fotos de stock como si fueran estudiantes reales.

### Contenido inventado (no se copia)

Las reglas de este cambio no permiten modificar textos, y además la referencia trae datos que no están confirmados:

- Cifras: «+1.500 estudiantes», «+35 cursos», «4.9/5».
- Instructores con nombre y foto, y la firma «María Fernanda León».
- Testimonios reescritos de Rafaela Silva, Joyce Rodríguez y David Cobos con 5 estrellas.
- La dirección «Av. República».
- Cursos que no están en el catálogo («Formador de Formadores», «Desarrollo Web con React»).
- La página de Servicios.

### Patrones que chocan con los requisitos de accesibilidad

| En la referencia | Problema | Qué haré |
|---|---|---|
| Texto blanco sobre `#E8662A` en botones, CTA y barra móvil | 3,3:1 (AA pide 4,5:1) | Mantener `#C2501A` en botones con texto y en la banda del CTA. `#E8662A` queda para acentos, precio y bordes. |
| WhatsApp `#25D366` con ícono o texto blanco | 1,9:1 | Mantener `#1A9E4E` (botón flotante) y `#14803F` (botones con texto). |
| Grises `#777`, `#888` y `#999` en textos pequeños | Entre 2,8:1 y 4,5:1 | Usar `#646464` (5,9:1) para todo el texto secundario. |
| Etiquetas naranjas de 11px sobre blanco | 3,3:1 | Si se usan, en `#B04816`. |
| Bordes de campo `#ddd` | 1,4:1 (el contorno de un control pide 3:1) | Mantener `#8F8782` en campos y chips. |
| `outline: none` en el foco | Foco invisible | Se mantiene el anillo de foco visible. |
| Carrusel automático en el hero | Contenido que se mueve sin poder pausarlo (WCAG 2.2.2) | Hero fijo, sin carrusel. |
| Menú y etiquetas de 12px | Texto pequeño y áreas táctiles bajas | Menú a 13px con área de 44px. Etiquetas de formulario a 14px. |

## 8. Decisiones aprobadas y cómo se aplicaron

| Decisión | Aplicación |
|---|---|
| **Hero como la referencia** | Hero oscuro de 590px con foto y degradado `rgba(20,20,20,.94)` → `.35`, texto blanco, etiqueta naranja `#FF8C55` y el certificado de muestra a la derecha. Sin carrusel. En móvil el velo es uniforme (`.86`) para mantener el contraste. |
| **Fotos en cursos y hero** | Todas se descargaron, se convirtieron a WebP y se guardaron en `assets/img/`; no se enlaza nada externo. **Hero:** la foto principal de la referencia (Unsplash `photo-1632835298280`, 61 KB). **Cursos:** las portadas reales de cada curso en educalab.ec (de 23 a 67 KB). Las de Excel, Web y Móvil muestran el logo del Ministerio del Trabajo, lo que hay que confirmar con EducaLab. Las fotos se asignan por CSS (`.course:has(a[href$="curso=…"])`), así que `app.js` no cambió. |
| **Radio suave de 4px** | `--r`, `--r-sm` y `--r-lg` valen 4px. Solo siguen redondos el botón de WhatsApp, los avatares y los círculos de pasos. |
| **Login como educalab.ec** | Panel claro a la izquierda con logo y título centrados, y foto real del login de educalab.ec a la derecha con velo violeta-rosado. Se conservan las correcciones: tildes, Google primero y reCAPTCHA solo tras 3 intentos. |

### Páginas agregadas desde educalab.ec

El menú ahora sigue al sitio real: **Inicio · Certifícate ▾ · Cursos ▾ · Servicios ▾ · Contacto**. Los enlaces que ya existían (Verificar certificado, Preguntas frecuentes) quedaron dentro del submenú «Certifícate».

| Página del sitio real | Página nueva | Contenido |
|---|---|---|
| Lista de cursos (`/course`) | `cursos.html` | 7 áreas y 26 cursos con sus nombres reales. Los 9 que tienen inscripción en línea enlazan a `inscripcion.html`; los demás, a WhatsApp. |
| Instructores (`id=14`) | `instructores.html` | Los 5 instructores con su especialidad. Se usan iniciales en lugar de fotos personales. |
| Diseño de páginas web, Aulas virtuales, Tienda virtual y Consultorías BI (`id=1`, `270`, `271`, `272`) | `servicios.html` | Una página con 4 secciones enlazables (`#paginas-web`, etc.) y el texto real. Tienda y BI solo tenían una línea; quedan marcadas con TODO. |
| Contacto (`id=80`) | `contacto.html` | La misma sección corregida del inicio. |
| ¿Quiénes somos? (`id=16`, error 500) | `nosotros.html` | Armada solo con frases que el inicio real publica. Pendiente de validar con EducaLab. |
| Condiciones (`id=267`) y Política de seguridad (`id=268`) | `legal.html#terminos` y `#seguridad` | El texto real, con correcciones mínimas de ortografía. |

La cabecera y el pie de las 8 páginas son idénticos (heurística H4).
