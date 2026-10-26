/* EducaLab.ec · prototipo de la landing de certificaciones (Design Thinking HCI) */
const WHATSAPP = "593978893727";
const COURSES = [
  { id:"excel", cat:"negocios", title:"Excel aplicado a negocios", tag:"Más vendido", hours:40, weeks:6, price:80, c1:"#1F7A4A", c2:"#2FB36B" },
  { id:"web", cat:"tecnologia", title:"Diseño y programación web", tag:"Certificación", hours:60, weeks:8, price:80, c1:"#243B7A", c2:"#4F6FD6" },
  { id:"movil", cat:"tecnologia", title:"Diseño y programación móvil", tag:"Certificación", hours:60, weeks:8, price:80, c1:"#6A2B8A", c2:"#A35BD0" },
  { id:"ia-banca", cat:"tecnologia", title:"Agentes de IA aplicados a la consolidación bancaria", short:"Agentes de IA en banca", tag:"Nuevo", hours:30, weeks:4, price:80, c1:"#0D5C6B", c2:"#1EA3B8" },
  { id:"riesgos", cat:"seguridad", title:"Riesgos laborales", tag:"Seguridad y salud", hours:40, weeks:5, price:80, c1:"#B8560F", c2:"#F08A2C" },
  { id:"auxilios", cat:"seguridad", title:"Primeros auxilios y brigadas", tag:"Seguridad y salud", hours:30, weeks:4, price:80, c1:"#A21C2B", c2:"#E04355" },
  { id:"robotica", cat:"docencia", title:"Robótica educativa para docentes con IA", short:"Robótica educativa", tag:"Docencia", hours:40, weeks:5, price:80, c1:"#3D4B5C", c2:"#6C7F95" },
  { id:"hse", cat:"seguridad", title:"Monitor de HSE", tag:"Seguridad y salud", hours:40, weeks:5, price:80, c1:"#5A6B1F", c2:"#8EA63A" },
  { id:"conduccion", cat:"seguridad", title:"Conducción segura y seguridad vial", short:"Conducción segura", tag:"Seguridad y salud", hours:20, weeks:3, price:80, c1:"#2E4057", c2:"#4F6D8F" }
];
/* Certificados de demostración para el verificador */
const CERTS = {
  "EDL-2026-0481": { name:"Andrea Morales", course:"Excel aplicado a negocios", hours:40, date:"15/09/2026" },
  "EDL-2026-0312": { name:"Rafaela Silva", course:"Diseño y programación web", hours:60, date:"02/07/2026" }
};
const COUPONS = { "PRIMERA10": 0.10 };
const money = n => "$" + n.toFixed(2).replace(".", ",");
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const waLink = msg => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* Menú móvil */
const menuBtn = $(".menu-btn");
if (menuBtn) menuBtn.addEventListener("click", () => {
  const nav = $("nav.main"); const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

/* Enlaces de WhatsApp */
$$("[data-wa]").forEach(a => { a.href = waLink(a.dataset.wa || "Hola EducaLab, quiero información sobre las certificaciones."); a.target = "_blank"; a.rel = "noopener"; });

/* Catálogo */
const grid = $("#grid");
function renderCourses(cat="todas"){
  if (!grid) return;
  const list = COURSES.filter(c => cat === "todas" || c.cat === cat);
  grid.innerHTML = list.map(c => `
    <article class="course">
      <div class="cover" style="background:linear-gradient(135deg,${c.c1},${c.c2})" aria-hidden="true">${c.short || c.title}</div>
      <div class="body">
        <span class="tag">${c.tag}</span>
        <h3>Certifícate en ${c.title}</h3>
        <ul class="facts"><li>${c.hours} horas</li><li>${c.weeks} semanas</li><li>100% online</li></ul>
        <div class="foot"><span class="price">$${c.price}</span>
          <a class="btn btn-primary btn-sm" href="inscripcion.html?curso=${c.id}">Inscribirme</a></div>
      </div>
    </article>`).join("");
  $("#empty").style.display = list.length ? "none" : "block";
}
if (grid){
  renderCourses();
  $$(".chip").forEach(ch => ch.addEventListener("click", () => {
    $$(".chip").forEach(x => x.setAttribute("aria-pressed","false"));
    ch.setAttribute("aria-pressed","true"); renderCourses(ch.dataset.cat);
  }));
}

/* Verificador */
const vform = $("#verify-form");
if (vform) vform.addEventListener("submit", e => {
  e.preventDefault();
  const code = $("#code").value.trim().toUpperCase(); const out = $("#verify-result");
  out.className = "result";
  if (!code){ out.textContent = "Escribe el código que aparece debajo del QR del certificado."; out.classList.add("bad"); return; }
  const c = CERTS[code];
  if (c){ out.innerHTML = `<strong>Certificado válido.</strong> ${c.name} aprobó <em>${c.course}</em> (${c.hours} h) el ${c.date}.`; out.classList.add("ok"); }
  else { out.innerHTML = `<strong>No encontramos el código ${code}.</strong> Revisa que tenga el formato EDL-AAAA-NNNN o escríbenos por WhatsApp.`; out.classList.add("bad"); }
});

/* Inscripción en 3 pasos */
const checkout = $("#checkout");
if (checkout){
  const id = new URLSearchParams(location.search).get("curso") || "excel";
  const course = COURSES.find(c => c.id === id) || COURSES[0];
  let discount = 0, step = 2;
  $("#co-title").textContent = `Inscripción: Certifícate en ${course.title}`;
  $("#sum-name").textContent = course.title;
  $("#sum-facts").textContent = `${course.hours} h, ${course.weeks} semanas, online`;
  $("#sum-thumb").style.background = `linear-gradient(135deg,${course.c1},${course.c2})`;
  function totals(){
    const d = course.price * discount;
    $("#sum-price").textContent = money(course.price);
    $("#sum-disc-row").hidden = !discount; $("#sum-disc").textContent = "-" + money(d);
    $("#sum-total").textContent = money(course.price - d);
    $("#pay-total").textContent = money(course.price - d);
  }
  totals();
  $("#coupon-btn").addEventListener("click", () => {
    const code = $("#coupon").value.trim().toUpperCase(); const msg = $("#coupon-msg");
    if (COUPONS[code]){ discount = COUPONS[code]; msg.textContent = `Cupón ${code} aplicado.`; msg.style.color = "var(--ok)"; }
    else { discount = 0; msg.textContent = "Ese cupón no existe o ya expiró."; msg.style.color = "var(--err)"; }
    totals();
  });
  function show(n){
    step = n;
    $$("[data-step]").forEach(p => p.hidden = Number(p.dataset.step) !== n);
    $$(".steps li").forEach((li,i) => { li.className = i+1 < n ? "done" : i+1 === n ? "on" : ""; li.querySelector(".n").textContent = i+1 < n ? "✓" : i+1; });
    $$(".steps .bar").forEach((b,i) => b.classList.toggle("done", i+1 < n));
    window.scrollTo({top:0});
  }
  const rules = {
    name: v => v.trim().split(/\s+/).length >= 2 || "Escribe nombres y apellidos, así saldrán en tu certificado.",
    cedula: v => /^\d{10}$/.test(v.trim()) || "La cédula tiene 10 dígitos.",
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Revisa el correo; ahí enviamos tu acceso.",
    phone: v => v.replace(/\D/g,"").length >= 9 || "Escribe un celular válido para contactarte por WhatsApp."
  };
  $("#to-pay").addEventListener("click", () => {
    let ok = true;
    for (const [k, fn] of Object.entries(rules)){
      const f = $(`#f-${k}`); const r = fn(f.value); const box = f.closest(".field");
      box.classList.toggle("invalid", r !== true); if (r !== true){ box.querySelector(".err").textContent = r; if (ok) f.focus(); ok = false; }
    }
    if (ok){
      const m = $("input[name=pay]:checked").value;
      $$("[data-method]").forEach(x => x.hidden = x.dataset.method !== m);
      show(3);
    }
  });
  $("#back-1").addEventListener("click", () => location.href = "index.html#certificaciones");
  $("#back-2").addEventListener("click", () => show(2));
  $("#confirm").addEventListener("click", () => {
    $("#done-name").textContent = $("#f-name").value.trim();
    $("#done-mail").textContent = $("#f-email").value.trim();
    $("#done-course").textContent = course.title;
    show(4);
  });
  show(2);
}

/* Login (demostración) */
const login = $("#login-form");
if (login) login.addEventListener("submit", e => {
  e.preventDefault();
  const msg = $("#login-msg");
  if (!$("#l-user").value.trim() || !$("#l-pass").value){ msg.className = "result bad"; msg.textContent = "Escribe tu correo y tu contraseña para entrar."; return; }
  msg.className = "result ok"; msg.textContent = "Prototipo: aquí se abriría tu panel con tus cursos y certificados.";
});

const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
