# Cómo verificar si una página cumple los requisitos

Este documento describe las pruebas que se usaron para comprobar el prototipo de EducaLab.ec. Sirven para evaluar cualquier otra versión de la página, por ejemplo una generada con Figma Make, con los mismos criterios.

**Para cada prueba se indica:**

- **Qué se revisa:** el requisito.
- **Cómo se revisa:** a mano o con una herramienta.
- **Cuándo aprueba:** el resultado esperado.

## 1. Herramientas

Todas son gratuitas y la mayoría ya viene en Chrome.

| Herramienta | Para qué | Dónde |
|---|---|---|
| Chrome DevTools (F12) | Consola, vista de dispositivos y medidas | Incluido en Chrome |
| Lighthouse | Puntajes de rendimiento, accesibilidad, buenas prácticas y SEO | Pestaña **Lighthouse** de DevTools |
| axe DevTools | Errores de accesibilidad WCAG 2.1 AA | Extensión gratuita de Chrome |
| Fragmentos de consola | Comprobaciones rápidas (sección 3) | Pestaña **Console** de DevTools |
| Servidor local | Probar la página como si estuviera publicada | `python -m http.server 8080` o `npx http-server -p 8080` |

Si la página viene de Figma Make, abre la vista previa publicada o exporta el código y sírvelo en local. Así las herramientas miden la página real y no el editor.

## 2. Procedimiento

1. Abre la página en Chrome con la consola abierta (F12 → **Console**).
2. Recarga y confirma que no aparecen errores en rojo.
3. Ejecuta los fragmentos de la sección 3.
4. Corre axe DevTools: debe dar 0 problemas.
5. Corre Lighthouse en modo **Mobile** y luego en **Desktop**, y anota los cuatro puntajes de cada uno.
6. Activa la vista de dispositivos (Ctrl+Shift+M) y revisa la página a 360, 390, 768 y 1440 px.
7. Recorre los flujos de la sección 5 con el teclado y con el mouse.
8. Marca cada casilla de la lista de la sección 4.

## 3. Fragmentos para la consola

Pega cada bloque en la pestaña **Console** y pulsa Enter. Funcionan en cualquier página.

**Estructura y SEO** (un `h1`, idioma, descripción y Open Graph):

```js
({
  h1: document.querySelectorAll('h1').length,             // debe ser 1
  lang: document.documentElement.lang,                    // debe ser "es"
  title: document.title,
  description: document.querySelector('meta[name=description]')?.content || 'FALTA',
  openGraph: [...document.querySelectorAll('meta[property^="og:"]')].map(m => m.getAttribute('property')),
  encabezados: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => h.tagName).join(' ')
})
```

**Desplazamiento horizontal.** Ejecútalo con la vista de dispositivos a 360 y a 390 px:

```js
document.documentElement.scrollWidth - innerWidth   // debe ser 0 o menos
```

**Áreas táctiles menores a 44 px.** Ejecútalo a 390 px:

```js
[...document.querySelectorAll('a,button,input,select,summary')]
  .filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && (r.height < 44 || r.width < 44); })
  .map(e => `${e.tagName} "${(e.innerText || e.placeholder || e.ariaLabel || '').trim().slice(0, 30)}" ${Math.round(e.getBoundingClientRect().height)}px`)
```

Los enlaces dentro de un párrafo están exentos (WCAG 2.5.8). Revisa sobre todo botones, campos, el menú y los filtros.

**Imágenes sin texto alternativo e imágenes rotas:**

```js
({
  sinAlt: [...document.images].filter(i => !i.hasAttribute('alt')).map(i => i.src),
  rotas: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.src)
})
```

**Codificación** (tildes rotas, `ó`, entidades visibles):

```js
const t = document.body.innerText + [...document.querySelectorAll('input,textarea')].map(i => i.placeholder).join(' ');
t.match(/\\u[0-9a-f]{4}|Ã.|â€|&[a-z]+;/gi) || 'Sin problemas'
```

**Botones e íconos sin nombre accesible:**

```js
[...document.querySelectorAll('button,a')].filter(e => !(e.innerText.trim() || e.getAttribute('aria-label') || e.title)).map(e => e.outerHTML.slice(0, 80))
```

**Campos sin etiqueta:**

```js
[...document.querySelectorAll('input:not([type=hidden]),select,textarea')]
  .filter(i => !(i.labels?.length || i.getAttribute('aria-label') || i.getAttribute('aria-labelledby')))
  .map(i => i.outerHTML.slice(0, 80))
```

**Datos de contacto consistentes:**

```js
({
  telefonos: [...new Set(document.body.innerText.match(/\+\d{3}[\d\s]{8,13}\d/g))],  // solo +593 97 889 3727
  enlacesTel: [...new Set([...document.querySelectorAll('a[href^="tel:"]')].map(a => a.href))],  // tel:+593978893727
  whatsapp: [...new Set([...document.querySelectorAll('a[href*="wa.me"]')].map(a => a.href.split('?')[0]))],  // https://wa.me/593978893727
  correos: [...new Set(document.body.innerText.match(/[\w.-]+@[\w.-]+\.\w+/g))]  // cursos@educalab.ec
})
```

**Recursos externos.** Solo se permite Google Fonts. En DevTools, abre la pestaña **Network**, recarga la página y filtra por dominio, o ejecuta:

```js
[...new Set(performance.getEntriesByType('resource').map(r => new URL(r.name).host))].filter(h => h !== location.host)
// solo deben aparecer fonts.googleapis.com y fonts.gstatic.com
```

## 4. Lista de verificación

### Identidad visual

- [ ] Naranja #E8662A, texto #1B1B1B, gris #646464, bordes #E7E2DE y verde WhatsApp.
- [ ] Montserrat en títulos y Open Sans en texto (DevTools → **Computed** → `font-family`).
- [ ] Logo de texto «EDUCALAB.EC».
- [ ] Sin imágenes externas: solo SVG en línea, degradados o archivos propios.

### Landing con modelo AIDA

- [ ] **Atención:** hero con «Certifícate en semanas y demuéstralo con un código QR».
- [ ] Certificado de muestra con QR.
- [ ] Botones «Ver certificaciones» y «Hablar con un asesor» (este último abre WhatsApp con un mensaje ya escrito).
- [ ] **Interés:** barra de confianza.
- [ ] Filtros Tecnología, Negocios, Seguridad y salud y Docencia.
- [ ] Están los 9 cursos, cada uno a $80.
- [ ] Cada tarjeta muestra horas, semanas, modalidad, precio y botón «Inscribirme».
- [ ] **Deseo:** verificador de certificados (pruebas en la sección 5).
- [ ] Solo el testimonio de Rafaela Silva aparece como real; los demás dicen «por recolectar». No hay testimonios inventados.
- [ ] Preguntas frecuentes en acordeón.
- [ ] **Acción:** CTA final.
- [ ] Botón flotante de WhatsApp en escritorio y barra fija inferior en móvil.
- [ ] El botón de WhatsApp no tapa ningún otro botón, como «volver arriba».

### Inscripción

- [ ] Indicador de 3 pasos que muestra el paso actual.
- [ ] Validación de nombre completo, cédula de 10 dígitos, correo y celular, con el error debajo de cada campo.
- [ ] Tarjeta, transferencia y Payphone, cada uno con su propio formulario.
- [ ] El cupón PRIMERA10 descuenta 10% ($80 → $72).
- [ ] Resumen lateral visible durante todo el proceso.
- [ ] Pantalla de confirmación al terminar.
- [ ] La página dice claramente que el pago es simulado.

### Login

- [ ] «Correo electrónico» y «Contraseña» se ven con tilde y eñe correctas.
- [ ] «Continuar con Google» es la primera opción.
- [ ] No aparece reCAPTCHA al cargar la página, ni antes del primer intento de entrar.

### Datos correctos

- [ ] Teléfono +593 97 889 3727 con enlace `tel:+593978893727`.
- [ ] WhatsApp `https://wa.me/593978893727` con mensaje predefinido.
- [ ] Correo cursos@educalab.ec.

### Calidad técnica

- [ ] Un solo `h1` por página, `lang="es"`, `meta description` y etiquetas Open Graph en cada página.
- [ ] Sin desplazamiento horizontal de 360 a 1440 px.
- [ ] Foco visible al navegar con Tab.
- [ ] Respeta `prefers-reduced-motion` (sección 5).
- [ ] axe: 0 problemas.
- [ ] Consola: 0 errores; Network: 0 respuestas 404.
- [ ] Sin frameworks ni dependencias externas salvo Google Fonts.
- [ ] Rutas relativas: la página funciona desde una subcarpeta, como en GitHub Pages.

## 5. Pruebas manuales de los flujos

| Prueba | Cómo hacerla | Resultado esperado |
|---|---|---|
| Filtros | Pulsa cada filtro | Tecnología muestra 3 cursos, Negocios 1, Seguridad y salud 4, Docencia 1 y Todas 9. El filtro activo se distingue. |
| Verificador válido | Escribe `EDL-2026-0481` | Mensaje de certificado válido con titular, curso, horas y fecha. |
| Verificador inválido | Escribe `EDL-2026-9999` y luego `ABC123` | Un error que explica qué revisar: el formato correcto o que el código no existe. No basta con «error». |
| Verificador vacío | Pulsa «Verificar» sin escribir | Pide el código. |
| Validación de datos | En la inscripción, pulsa «Continuar» con los campos vacíos | Aparece un error bajo cada campo y el foco va al primero. |
| Datos incorrectos | Nombre «Andrea», cédula `1234`, correo `andrea@`, celular `123` | Cada mensaje dice cómo corregir el dato, por ejemplo «La cédula tiene 10 dígitos». |
| Datos correctos | Nombre `Andrea Morales`, cédula `1710034065`, correo `andrea@correo.com`, celular `0991234567` | Pasa al paso de pago. |
| Cupón | Escribe `PRIMERA10` y aplícalo; luego prueba un cupón que no exista | El total baja de $80,00 a $72,00. El cupón falso muestra un error claro. |
| Métodos de pago | Cambia entre tarjeta, transferencia y Payphone | Cada método muestra un formulario distinto. |
| Flujo completo | Completa el pago con la tarjeta `4242 4242 4242 4242`, fecha `08/30` y CVV `123` | Aparece la confirmación y la página indica que el pago es simulado. |
| Volver atrás | Desde el pago, regresa a tus datos | Los datos escritos se conservan. |
| Login | Abre el login y no toques nada | No hay reCAPTCHA. Los textos tienen tildes. Google aparece primero. |
| Teclado | Recorre la página solo con Tab, Enter y Escape | Siempre se ve qué elemento tiene el foco y se puede completar todo sin mouse. |
| Menú móvil | A 390 px, abre y cierra el menú | Abre, cierra y no tapa el contenido de forma permanente. |
| Movimiento reducido | DevTools → Ctrl+Shift+P → «Emulate CSS prefers-reduced-motion» | No hay animaciones ni desplazamiento suave. |
| Vista previa en redes | Pega la URL publicada en el depurador de Facebook (https://developers.facebook.com/tools/debug/) | Se ven título, descripción e imagen. |

## 6. Puntajes de referencia

Resultados del prototipo de este repositorio, para comparar:

| Página | Rendimiento (móvil / escritorio) | Accesibilidad | Buenas prácticas | SEO |
|---|---|---|---|---|
| educalab.ec actual | 5 / 54 | 77 / 79 | 100 | 73 |
| `index.html` (prototipo) | 88 / 99 | 100 | 100 | 100 |
| `inscripcion.html` (prototipo) | 88 / 99 | 100 | 100 | 60* |
| `login.html` (prototipo) | 83 / 100 | 100 | 100 | 100 |

\* La inscripción lleva `noindex` a propósito para que Google no muestre el paso de pago, así que ese 60 en SEO no es un defecto.

Se recomienda que una página alternativa llegue al menos a **90 en accesibilidad y SEO** y a **80 en rendimiento móvil**, con **0 errores en axe** y todas las casillas de la sección 4 marcadas.

## 7. Registro de resultados

Copia esta tabla para cada página evaluada:

| Criterio | Resultado | Evidencia (captura o valor) |
|---|---|---|
| `h1` único, `lang="es"`, description y Open Graph | ✅ / ❌ | |
| Sin desplazamiento horizontal (360 / 390 / 768 / 1440 px) | ✅ / ❌ | |
| Áreas táctiles de 44 px o más | ✅ / ❌ | |
| axe: 0 problemas | ✅ / ❌ | |
| Consola sin errores ni 404 | ✅ / ❌ | |
| Lighthouse móvil (Rend. / Acc. / BP / SEO) | | |
| Lighthouse escritorio (Rend. / Acc. / BP / SEO) | | |
| Landing AIDA completa | ✅ / ❌ | |
| Inscripción: validación, cupón, métodos de pago y confirmación | ✅ / ❌ | |
| Login: tildes, Google primero, sin reCAPTCHA previo | ✅ / ❌ | |
| Datos de contacto correctos | ✅ / ❌ | |
| Heurísticas de Nielsen (ver `AUDITORIA.md`, sección C) | ✅ / ❌ | |
