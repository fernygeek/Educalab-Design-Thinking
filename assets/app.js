/* EducaLab.ec · prototipo de la landing de certificaciones (Design Thinking HCI) */

/* ====== Datos editables ====== */
const CONTACT = { phone:"+593 97 889 3727", tel:"+593978893727", whatsapp:"593978893727", email:"cursos@educalab.ec" };
const WA_DEFAULT = "Hola EducaLab, quiero información sobre las certificaciones.";

/* Catálogo: edita aquí precios, horas y semanas. c1/c2 son los colores del degradado de la portada. */
const COURSES = [
  { id:"excel", cat:"negocios", title:"Excel aplicado a negocios", tag:"Más vendido", price:80, mode:"Online", c1:"#14593A", c2:"#1F7A4A",
    hours:40, weeks:6 }, // TODO: confirmar con EducaLab
  { id:"web", cat:"tecnologia", title:"Diseño y programación web", tag:"Tecnología", price:80, mode:"Online", c1:"#1B2D5E", c2:"#3550A8",
    hours:60, weeks:8 }, // TODO: confirmar con EducaLab
  { id:"movil", cat:"tecnologia", title:"Diseño y programación móvil", tag:"Tecnología", price:80, mode:"Online", c1:"#4E1F67", c2:"#7B3FA0",
    hours:60, weeks:8 }, // TODO: confirmar con EducaLab
  { id:"ia-banca", cat:"tecnologia", title:"Agentes de IA aplicados a la consolidación bancaria", short:"Agentes de IA en banca", tag:"Nuevo", price:80, mode:"Online", c1:"#0A4652", c2:"#127083",
    hours:30, weeks:4 }, // TODO: confirmar con EducaLab
  { id:"riesgos", cat:"seguridad", title:"Riesgos laborales", tag:"Seguridad y salud", price:80, mode:"Online", c1:"#7A3A0A", c2:"#A8530F",
    hours:40, weeks:5 }, // TODO: confirmar con EducaLab
  { id:"auxilios", cat:"seguridad", title:"Primeros auxilios y brigadas", tag:"Seguridad y salud", price:80, mode:"Online", c1:"#7A1420", c2:"#A81E2E",
    hours:30, weeks:4 }, // TODO: confirmar con EducaLab
  { id:"robotica", cat:"docencia", title:"Robótica educativa para docentes con IA", short:"Robótica educativa", tag:"Docencia", price:80, mode:"Online", c1:"#2B3644", c2:"#4A5A6E",
    hours:40, weeks:5 }, // TODO: confirmar con EducaLab
  { id:"hse", cat:"seguridad", title:"Monitor de HSE", tag:"Seguridad y salud", price:80, mode:"Online", c1:"#3E4A12", c2:"#5F7020",
    hours:40, weeks:5 }, // TODO: confirmar con EducaLab
  { id:"conduccion", cat:"seguridad", title:"Conducción segura y seguridad vial", short:"Conducción segura", tag:"Seguridad y salud", price:80, mode:"Online", c1:"#1F2C3C", c2:"#3A5470",
    hours:20, weeks:3 } // TODO: confirmar con EducaLab
];
const AREAS = { todas:"Todas", tecnologia:"Tecnología", negocios:"Negocios", seguridad:"Seguridad y salud", docencia:"Docencia" };

/* Verificador: solo existe el certificado de demostración. */
const CERTS = {
  "EDL-2026-0481": { name:"Andrea Morales", course:"Excel aplicado a negocios", hours:40, date:"15/09/2026", demo:true }
};
const COUPONS = { "PRIMERA10": 0.10 };

/* ====== Utilidades ====== */
const money = n => "$" + n.toFixed(2).replace(".", ",");
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const waLink = msg => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;
const esc = s => String(s).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const ICON = {
  clock:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3 2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
  cal:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="2"/></svg>',
  web:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 21h8M12 17v4" stroke="currentColor" stroke-width="2"/></svg>'
};

/* Validación reutilizable: cada regla devuelve true o el mensaje de error que explica cómo corregir. */
function setError(input, msg){
  const box = input.closest(".field"); const err = box && $(".err", box);
  if (!box || !err) return;
  if (!err.id) err.id = input.id + "-err";
  box.classList.toggle("invalid", !!msg);
  err.textContent = msg || "";
  input.setAttribute("aria-invalid", msg ? "true" : "false");
  const ids = new Set((input.getAttribute("aria-describedby") || "").split(" ").filter(Boolean));
  msg ? ids.add(err.id) : ids.delete(err.id);
  ids.size ? input.setAttribute("aria-describedby", [...ids].join(" ")) : input.removeAttribute("aria-describedby");
}
function validate(rules){
  let first = null;
  for (const [sel, fn] of Object.entries(rules)){
    const input = $(sel); if (!input || input.closest("[hidden]")) continue;
    const r = fn(input.value, input);
    setError(input, r === true ? "" : r);
    if (r !== true && !first) first = input;
  }
  if (first) first.focus();
  return !first;
}
/* Después del primer intento, revalida cada campo al salir de él (error visible en cuanto se corrige). */
function liveValidate(rules){
  for (const [sel, fn] of Object.entries(rules)){
    const input = $(sel); if (!input) continue;
    const check = () => { if (input.getAttribute("aria-invalid") === "true" || input.dataset.touched){ const r = fn(input.value, input); setError(input, r === true ? "" : r); } };
    input.addEventListener("blur", () => { if (input.value) input.dataset.touched = "1"; check(); });
    input.addEventListener("input", () => { if (input.getAttribute("aria-invalid") === "true") check(); });
  }
}
const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
/* Cédula ecuatoriana: 10 dígitos, provincia 01-24 o 30 y dígito verificador (módulo 10). */
function cedulaOk(v){
  if (!/^\d{10}$/.test(v)) return false;
  const prov = Number(v.slice(0,2)); if (!((prov >= 1 && prov <= 24) || prov === 30) || Number(v[2]) > 5) return false;
  const sum = [...v.slice(0,9)].reduce((s, d, i) => { let n = Number(d) * (i % 2 ? 1 : 2); return s + (n > 9 ? n - 9 : n); }, 0);
  return (10 - sum % 10) % 10 === Number(v[9]);
}
const luhn = num => { let s = 0; [...num].reverse().forEach((d, i) => { let n = Number(d); if (i % 2){ n *= 2; if (n > 9) n -= 9; } s += n; }); return s % 10 === 0; };
const digitsOnly = input => input.addEventListener("input", () => { input.value = input.value.replace(/\D/g, ""); });

/* ====== Comunes a todas las páginas ====== */
const menuBtn = $(".menu-btn"), nav = $("nav.main");
function setMenu(open){
  nav.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
}
if (menuBtn && nav){
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  $$("a", nav).forEach(a => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => { if (e.key === "Escape" && nav.classList.contains("open")){ setMenu(false); menuBtn.focus(); } });
}

$$("[data-wa]").forEach(a => { a.href = waLink(a.dataset.wa || WA_DEFAULT); a.target = "_blank"; a.rel = "noopener"; });

const totop = $(".totop");
if (totop){
  const onScroll = () => totop.classList.toggle("show", scrollY > 600);
  addEventListener("scroll", onScroll, { passive:true }); onScroll();
  totop.addEventListener("click", () => { scrollTo({ top:0, behavior: reduceMotion ? "auto" : "smooth" }); $("#main")?.focus({ preventScroll:true }); });
}

const y = $("#year"); if (y) y.textContent = new Date().getFullYear();

/* ====== Catálogo ====== */
const grid = $("#grid");
function renderCourses(cat="todas"){
  const list = COURSES.filter(c => cat === "todas" || c.cat === cat);
  grid.innerHTML = list.map(c => `
    <article class="course">
      <div class="cover" style="background:linear-gradient(135deg,${c.c1},${c.c2})" aria-hidden="true">${esc(c.short || c.title)}</div>
      <div class="body">
        <span class="tag">${esc(c.tag)}</span>
        <h3>Certifícate en ${esc(c.title)}</h3>
        <ul class="facts" aria-label="Detalles">
          <li>${ICON.clock}${c.hours} horas</li><li>${ICON.cal}${c.weeks} semanas</li><li>${ICON.web}${esc(c.mode)}</li>
        </ul>
        <a class="link ask" data-wa="Hola EducaLab, tengo una pregunta sobre la certificación ${esc(c.title)}." href="#">Preguntar por WhatsApp</a>
        <div class="foot"><span class="price">$${c.price}<small>pago único</small></span>
          <a class="btn btn-primary btn-sm" href="inscripcion.html?curso=${c.id}" aria-label="Inscribirme en ${esc(c.title)}">Inscribirme</a></div>
      </div>
    </article>`).join("");
  $$("[data-wa]", grid).forEach(a => { a.href = waLink(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
  $("#empty").hidden = list.length > 0;
  $("#count").textContent = `Mostrando ${list.length} ${list.length === 1 ? "certificación" : "certificaciones"}${cat === "todas" ? "" : " de " + AREAS[cat]}.`;
}
if (grid){
  /* ?area=seguridad permite enlazar un filtro desde un anuncio en redes */
  const fromUrl = new URLSearchParams(location.search).get("area");
  const start = AREAS[fromUrl] ? fromUrl : "todas";
  const chips = $$(".chip");
  const select = cat => { chips.forEach(x => x.setAttribute("aria-pressed", String(x.dataset.cat === cat))); renderCourses(cat); };
  chips.forEach(ch => ch.addEventListener("click", () => {
    select(ch.dataset.cat);
    const u = new URL(location.href); ch.dataset.cat === "todas" ? u.searchParams.delete("area") : u.searchParams.set("area", ch.dataset.cat);
    history.replaceState(null, "", u);
  }));
  $("#empty-reset")?.addEventListener("click", () => chips[0].click());
  select(start);
}

/* ====== Verificador ====== */
const vform = $("#verify-form");
if (vform) vform.addEventListener("submit", e => {
  e.preventDefault();
  const input = $("#code"), out = $("#verify-result");
  /* Tolera minúsculas, espacios y la falta de guiones: "edl 2026 0481" -> "EDL-2026-0481" */
  const raw = input.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const code = /^EDL\d{8}$/.test(raw) ? `EDL-${raw.slice(3,7)}-${raw.slice(7)}` : input.value.trim().toUpperCase();
  out.className = "result";
  if (!raw){
    out.classList.add("bad"); out.innerHTML = "<strong>Falta el código.</strong> Escríbelo tal como aparece junto al QR del certificado.";
    input.setAttribute("aria-invalid", "true"); input.focus(); return;
  }
  const c = CERTS[code];
  input.setAttribute("aria-invalid", String(!c));
  if (c){
    input.value = code; out.classList.add("ok");
    out.innerHTML = `<strong>✓ Certificado válido</strong>${c.demo ? " (demostración)" : ""}<dl><dt>Titular</dt><dd>${esc(c.name)}</dd><dt>Certificación</dt><dd>${esc(c.course)}</dd><dt>Horas</dt><dd>${c.hours} horas académicas</dd><dt>Emitido</dt><dd>${c.date}</dd><dt>Código</dt><dd>${code}</dd></dl>`;
  } else if (!/^EDL-\d{4}-\d{4}$/.test(code)){
    out.classList.add("bad");
    out.innerHTML = `<strong>El código «${esc(input.value.trim())}» no tiene el formato correcto.</strong> Debe verse así: EDL-2026-0481 (las letras EDL, el año y cuatro números). Revisa que no falte ningún dígito.`;
  } else {
    out.classList.add("bad");
    out.innerHTML = `<strong>No encontramos el código ${esc(code)}.</strong> Revisa que no hayas confundido la letra O con el número 0, y que el año sea el de emisión. Si el código está bien, <a class="link" href="${waLink("Hola EducaLab, quiero verificar el certificado " + code)}" target="_blank" rel="noopener">escríbenos por WhatsApp</a> y lo revisamos.`;
  }
});

/* ====== Contacto ====== */
const cform = $("#contact-form");
if (cform){
  const rules = {
    "#c-name": v => v.trim().length >= 3 || "Escribe tu nombre para saber cómo dirigirnos a ti.",
    "#c-email": v => isEmail(v) || "Revisa el correo: debe tener la forma nombre@dominio.com.",
    "#c-phone": v => !v.trim() || /^0?9\d{8}$/.test(v.replace(/\D/g, "").replace(/^593/, "0")) || "Escribe un celular de 10 dígitos que empiece con 09, o deja el campo vacío.",
    "#c-msg": v => v.trim().length >= 10 || "Cuéntanos en una frase qué necesitas (mínimo 10 caracteres)."
  };
  liveValidate(rules);
  cform.addEventListener("submit", e => {
    e.preventDefault();
    const out = $("#contact-result"); out.className = "result"; out.textContent = "";
    if (!validate(rules)) return;
    const name = $("#c-name").value.trim().split(/\s+/)[0];
    out.classList.add("ok");
    out.innerHTML = `<strong>Gracias, ${esc(name)}. Recibimos tu mensaje.</strong> Te responderemos a ${esc($("#c-email").value.trim())}. Prototipo: este formulario no envía correos; para una respuesta inmediata usa WhatsApp.`;
    cform.reset();
  });
}

/* ====== Inscripción en 3 pasos ====== */
const checkout = $("#checkout");
if (checkout){
  const params = new URLSearchParams(location.search);
  const asked = params.get("curso");
  let course = COURSES.find(c => c.id === asked) || COURSES[0];
  let discount = 0, coupon = "", step = 2, dirty = false, done = false;

  if (asked && !COURSES.some(c => c.id === asked)) $("#co-notice").hidden = false;

  const sel = $("#f-course");
  sel.innerHTML = COURSES.map(c => `<option value="${c.id}">${esc(c.title)}</option>`).join("");
  sel.value = course.id;
  sel.addEventListener("change", () => {
    course = COURSES.find(c => c.id === sel.value);
    const u = new URL(location.href); u.searchParams.set("curso", course.id); history.replaceState(null, "", u);
    paintCourse();
  });

  function paintCourse(){
    $("#co-course").textContent = course.title;
    $("#sum-facts").textContent = `${course.hours} horas · ${course.weeks} semanas · ${course.mode}`;
    $("#sum-thumb").style.background = `linear-gradient(135deg,${course.c1},${course.c2})`;
    $("#help-wa").href = waLink(`Hola EducaLab, tengo dudas para inscribirme en ${course.title}.`);
    totals();
  }
  function totals(){
    const d = Math.round(course.price * discount * 100) / 100, total = course.price - d;
    $("#sum-price").textContent = money(course.price);
    $("#sum-disc-row").hidden = !discount;
    $("#sum-disc-label").textContent = `Cupón ${coupon} (−${Math.round(discount * 100)}%)`;
    $("#sum-disc").textContent = "−" + money(d);
    $("#sum-total").textContent = money(total);
    $("#pay-total").textContent = money(total);
    $("#confirm-total").textContent = money(total);
    $("#confirm-total-tr").textContent = money(total);
  }

  /* Cupón: se aplica con Enter o con el botón, y se puede quitar */
  $("#coupon-form").addEventListener("submit", e => {
    e.preventDefault();
    const input = $("#coupon"), msg = $("#coupon-msg"), code = input.value.trim().toUpperCase();
    if (!code){ msg.className = "bad"; msg.textContent = "Escribe un cupón antes de aplicarlo."; input.focus(); return; }
    if (COUPONS[code]){
      discount = COUPONS[code]; coupon = code; input.value = code;
      msg.className = "ok"; msg.textContent = `Cupón ${code} aplicado: ahorras ${money(course.price * discount)}.`;
      $("#coupon-remove").hidden = false;
    } else {
      msg.className = "bad"; msg.textContent = `El cupón «${code}» no existe o ya expiró. Revisa cómo está escrito.`;
    }
    totals();
  });
  $("#coupon-remove").addEventListener("click", () => {
    discount = 0; coupon = ""; $("#coupon").value = ""; $("#coupon-remove").hidden = true;
    $("#coupon-msg").className = ""; $("#coupon-msg").textContent = "Cupón quitado."; totals(); $("#coupon").focus();
  });

  const STEP_NAMES = { 2:"Tus datos", 3:"Pago", 4:"Confirmación" };
  function show(n, initial=false){
    step = n;
    $$("[data-step]").forEach(p => p.hidden = Number(p.dataset.step) !== n);
    $$(".steps li:not(.bar)").forEach((li, i) => {
      const k = i + 1; li.className = k < n ? "done" : k === n ? "on" : "";
      $(".n", li).textContent = k < n ? "✓" : k;
      k === n ? li.setAttribute("aria-current", "step") : li.removeAttribute("aria-current");
    });
    $$(".steps .bar").forEach((b, i) => b.classList.toggle("done", i + 1 < n));
    document.title = `${n < 4 ? `Paso ${n} de 3: ` : ""}${STEP_NAMES[n]} | Inscripción | EducaLab.ec`;
    if (initial) return; // al cargar no movemos el foco ni el scroll
    const h = $(`[data-step="${n}"] h2`);
    scrollTo({ top: checkout.offsetTop - 90, behavior:"auto" });
    h.focus({ preventScroll:true });
  }
  $("#step1-btn").addEventListener("click", () => { if (step < 4) sel.focus(); });

  /* Paso 2: datos personales */
  ["#f-cedula", "#f-ruc"].forEach(s => digitsOnly($(s)));
  const dataRules = {
    "#f-name": v => (/^[\p{L}' .-]+$/u.test(v.trim()) && v.trim().split(/\s+/).length >= 2) || "Escribe al menos un nombre y un apellido, solo con letras. Así saldrá en tu certificado.",
    "#f-cedula": v => {
      if (!v) return "Escribe tu número de cédula (10 dígitos), lo necesitamos para el certificado y la factura.";
      if (v.length !== 10) return `La cédula tiene 10 dígitos; escribiste ${v.length}.`;
      return cedulaOk(v) || "Esta cédula no es válida: revisa los dígitos, en especial el último.";
    },
    "#f-email": v => isEmail(v) || "Revisa el correo: debe tener la forma nombre@dominio.com. Ahí enviamos tu acceso.",
    "#f-phone": v => /^09\d{8}$/.test(v.replace(/\D/g, "").replace(/^593/, "0")) || "Escribe tu celular de 10 dígitos, empezando con 09 (ej. 0991234567).",
    "#f-ruc": v => /^\d{13}$/.test(v) || "El RUC tiene 13 dígitos.",
    "#f-razon": v => v.trim().length >= 3 || "Escribe la razón social tal como aparece en el RUC."
  };
  liveValidate(dataRules);
  $("#f-factura").addEventListener("change", e => { $("#ruc-box").hidden = !e.target.checked; });
  $("#data-form").addEventListener("input", () => { dirty = true; });
  $("#data-form").addEventListener("submit", e => {
    e.preventDefault();
    if (!validate(dataRules)) return;
    const pp = $("#f-pp-phone"); if (!pp.value) pp.value = $("#f-phone").value;
    show(3);
  });

  /* Paso 3: método de pago, cada uno con su propio formulario */
  const methodSwitch = () => {
    const m = $("input[name=pay]:checked").value;
    $$("[data-method]").forEach(x => x.hidden = x.dataset.method !== m);
    $("#confirm-label").textContent = m === "card" ? "Pagar" : m === "transfer" ? "Reservar mi cupo por" : "Recibir enlace de pago por";
  };
  $$("input[name=pay]").forEach(r => r.addEventListener("change", methodSwitch));
  methodSwitch();
  const card = $("#f-card"), exp = $("#f-exp");
  card.addEventListener("input", () => { card.value = card.value.replace(/\D/g, "").slice(0,16).replace(/(\d{4})(?=\d)/g, "$1 "); });
  exp.addEventListener("input", () => { const d = exp.value.replace(/\D/g, "").slice(0,4); exp.value = d.length > 2 ? d.slice(0,2) + "/" + d.slice(2) : d; });
  digitsOnly($("#f-cvv"));
  const payRules = {
    "#f-holder": v => v.trim().length >= 3 || "Escribe el nombre tal como aparece en la tarjeta.",
    "#f-card": v => { const d = v.replace(/\D/g, ""); return (d.length >= 13 && luhn(d)) || "El número de tarjeta no es válido: revisa los 16 dígitos."; },
    "#f-exp": v => { const m = /^(\d{2})\/(\d{2})$/.exec(v); if (!m || +m[1] < 1 || +m[1] > 12) return "Usa el formato MM/AA, por ejemplo 08/28.";
      const now = new Date(), yy = now.getFullYear() % 100, mm = now.getMonth() + 1;
      return (+m[2] > yy || (+m[2] === yy && +m[1] >= mm)) || "Esta tarjeta ya venció. Usa otra o elige transferencia."; },
    "#f-cvv": v => /^\d{3,4}$/.test(v) || "El CVV son los 3 o 4 números del reverso de la tarjeta.",
    "#f-pp-phone": v => /^09\d{8}$/.test(v.replace(/\D/g, "").replace(/^593/, "0")) || "Escribe el celular de 10 dígitos donde recibirás el enlace de Payphone.",
    "#f-terms": (v, el) => el.checked || "Debes aceptar las condiciones para continuar."
  };
  liveValidate(payRules);
  $("#f-terms").addEventListener("change", e => { if (e.target.checked) setError(e.target, ""); });
  $("#back-2").addEventListener("click", () => show(2));
  $("#pay-form").addEventListener("submit", e => {
    e.preventDefault();
    if (!validate(payRules)) return;
    const btn = $("#confirm"); btn.disabled = true; btn.setAttribute("aria-busy", "true");
    const label = btn.innerHTML; btn.innerHTML = '<span class="spin" aria-hidden="true"></span>Procesando pago simulado…';
    $("#pay-status").textContent = "Procesando tu pago, no cierres esta página.";
    setTimeout(() => {
      btn.disabled = false; btn.removeAttribute("aria-busy"); btn.innerHTML = label;
      finish($("input[name=pay]:checked").value);
    }, reduceMotion ? 300 : 1400);
  });

  /* Paso 4: confirmación según el método */
  function finish(method){
    done = true;
    const name = $("#f-name").value.trim().split(/\s+/)[0], mail = $("#f-email").value.trim();
    const order = "EDL-ORD-" + String(Math.floor(10000 + Math.random() * 90000));
    $("#done-order").textContent = "Pedido " + order;
    const txt = {
      card: [`¡Listo, ${name}! Tu inscripción está confirmada.`, `Pago aprobado (simulado) por ${$("#sum-total").textContent}. Ya tienes acceso a ${course.title}.`,
        [`Revisa ${mail}: ahí enviamos tu usuario y la factura electrónica.`, "Entra a tu aula y empieza cuando quieras.", "Al aprobar recibirás tu certificado con código QR."]],
      transfer: [`¡Tu cupo está reservado, ${name}!`, `Para activar ${course.title}, transfiere ${$("#sum-total").textContent} y envíanos el comprobante.`,
        ["Haz la transferencia con los datos del paso anterior.", `Envía el comprobante por WhatsApp indicando el pedido ${order}.`, `Activaremos tu acceso y te avisaremos a ${mail}.`]],
      payphone: [`¡Casi listo, ${name}!`, `Enviaremos un enlace de Payphone al ${$("#f-pp-phone").value} para pagar ${$("#sum-total").textContent}.`,
        ["Abre el enlace que llega a tu celular y paga.", `Al confirmarse el pago, enviamos tu acceso a ${mail}.`, "Si no llega en unos minutos, escríbenos por WhatsApp."]]
    }[method];
    $("#done-title").textContent = txt[0];
    $("#done-text").textContent = txt[1];
    $("#done-steps").innerHTML = txt[2].map(s => `<li>${esc(s)}</li>`).join("");
    $("#done-wa").href = waLink(`Hola EducaLab, mi pedido es ${order} (${course.title}).${method === "transfer" ? " Adjunto mi comprobante de transferencia." : ""}`);
    $("#done-aula").hidden = method !== "card";
    sel.disabled = true; $("#coupon-form").hidden = true;
    show(4);
  }

  addEventListener("beforeunload", e => { if (dirty && !done){ e.preventDefault(); e.returnValue = ""; } });
  paintCourse();
  show(2, true);
}

/* ====== Login (demostración) ====== */
const login = $("#login-form");
if (login){
  const DEMO = { user:"demo@educalab.ec", pass:"Demo2026" };
  let fails = 0;
  const rules = {
    "#l-user": v => v.trim().length > 0 || "Escribe tu correo o nombre de usuario.",
    "#l-pass": v => v.length > 0 || "Escribe tu contraseña."
  };
  liveValidate(rules);
  const msg = $("#login-msg"), pass = $("#l-pass");

  $("#pwd-toggle").addEventListener("click", e => {
    const show = pass.type === "password"; pass.type = show ? "text" : "password";
    e.currentTarget.textContent = show ? "Ocultar" : "Mostrar";
    e.currentTarget.setAttribute("aria-pressed", String(show));
  });
  pass.addEventListener("keyup", e => { $("#caps").hidden = !(e.getModifierState && e.getModifierState("CapsLock")); });

  $("#google-btn").addEventListener("click", () => {
    msg.className = "result info"; msg.textContent = "Prototipo: aquí se abriría la ventana de Google para elegir tu cuenta.";
  });
  $("#forgot").addEventListener("click", () => {
    const u = $("#l-user").value.trim();
    if (!isEmail(u)){ setError($("#l-user"), "Escribe aquí tu correo y vuelve a pulsar «¿Olvidaste tu contraseña?»."); $("#l-user").focus(); return; }
    setError($("#l-user"), "");
    msg.className = "result info"; msg.textContent = `Prototipo: enviaríamos un enlace para crear una nueva contraseña a ${u}.`;
  });

  login.addEventListener("submit", e => {
    e.preventDefault();
    msg.className = "result"; msg.textContent = "";
    if (!validate(rules)) return;
    /* reCAPTCHA solo aparece después de 3 intentos fallidos, nunca antes del primer intento */
    const cap = $("#captcha");
    if (!cap.hidden && !$("#captcha-ok").checked){
      msg.className = "result bad"; msg.textContent = "Marca la casilla «No soy un robot» para volver a intentarlo."; $("#captcha-ok").focus(); return;
    }
    if ($("#l-user").value.trim().toLowerCase() === DEMO.user && pass.value === DEMO.pass){
      msg.className = "result ok"; msg.textContent = "¡Bienvenido! Prototipo: aquí se abriría tu panel con tus cursos y certificados.";
      fails = 0; cap.hidden = true; return;
    }
    fails++;
    msg.className = "result bad";
    msg.textContent = `El correo o la contraseña no coinciden (intento ${fails}). Revisa que Bloq Mayús esté desactivado o usa «¿Olvidaste tu contraseña?».`;
    if (fails >= 3){
      cap.hidden = false; $("#captcha-ok").checked = false;
      msg.textContent += " Por seguridad, confirma que no eres un robot.";
    }
    pass.select();
  });
}
