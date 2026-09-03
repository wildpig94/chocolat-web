/* ═══════════════════════════════
   Pastelería Chocolat — Interacciones
   ═══════════════════════════════ */

const WHATSAPP = "524535343759";

(function () {
  "use strict";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Encabezado sombra ── */
  const cabecera = document.getElementById("cabecera");
  window.addEventListener("scroll", function () {
    cabecera.classList.toggle("cabecera--sombra", window.scrollY > 8);
  }, { passive: true });

  /* ── Menú móvil ── */
  const mb = document.getElementById("menuBoton");
  const nav = document.getElementById("nav");
  mb.addEventListener("click", function () {
    const abierto = nav.classList.toggle("nav--abierto");
    mb.classList.toggle("menu-boton--activo", abierto);
    mb.setAttribute("aria-expanded", String(abierto));
  });
  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("nav--abierto");
      mb.classList.remove("menu-boton--activo");
      mb.setAttribute("aria-expanded", "false");
    });
  });

  /* ── Botones de WhatsApp con mensaje ── */
  [["heroWa", "Hola Pastelería Chocolat, quiero hacer un pedido."],
   ["eventoWa", "Hola Pastelería Chocolat, quiero cotizar un pastel para mi evento (boda / XV años / cumpleaños)."]].forEach(function (par) {
    const el = document.getElementById(par[0]);
    if (el) el.href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(par[1]);
  });

  /* ── Menús desplegables (especialidades) ── */
  document.querySelectorAll("[data-toggle]").forEach(function (zona) {
    zona.addEventListener("click", function () {
      const tarjeta = zona.closest(".especial");
      if (tarjeta) tarjeta.classList.toggle("especial--abierto");
    });
  });

  /* ── Lightbox de galería ── */
  const cont = document.getElementById("galeriaGrid");
  let items = [], actual = 0;
  function cargar() { items = Array.prototype.slice.call(cont.querySelectorAll(".galeria__item img")); }
  function abrir(i) { actual = i; lbImg.src = items[actual].src; lbImg.alt = items[actual].alt; lb.hidden = false; document.body.style.overflow = "hidden"; }
  function cerrar() { lb.hidden = true; document.body.style.overflow = ""; }
  function mover(d) { actual = (actual + d + items.length) % items.length; lbImg.src = items[actual].src; lbImg.alt = items[actual].alt; }
  cont.addEventListener("click", function (e) {
    const img = e.target.closest(".galeria__item img");
    if (!img) return;
    cargar(); abrir(items.indexOf(img));
  });
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  document.getElementById("lbCerrar").addEventListener("click", cerrar);
  document.getElementById("lbPrev").addEventListener("click", function () { mover(-1); });
  document.getElementById("lbNext").addEventListener("click", function () { mover(1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) cerrar(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") cerrar();
    if (e.key === "ArrowLeft") mover(-1);
    if (e.key === "ArrowRight") mover(1);
  });

  /* ── Formulario de pedido (cotiza por WhatsApp) ── */
  const fPed = document.getElementById("formPedido");
  if (fPed) {
    const PRODUCTOS = {
      evento: ["Pastel de chocolate","Red velvet","Cheesecake","Pastel de nuez","Flan de queso"],
      postre: ["Cupcake de plátano","Cupcake zanahoria + cheesecake","Cupcake zanahoria integral","Mini chocolate","Brownie","Pan de elote","Pastel Matilda","Gelatina de zanahoria"],
      temporada: ["Cocopina de 3 leches","Gelatina de yogurt","Pastel navideño","Especial Día del Padre","Especial Baby Shower"]
    };
    const TIPOS = { evento: "evento", postre: "postre del día", temporada: "temporada" };
    const selTipo = document.getElementById("pedTipo");
    const selProd = document.getElementById("pedProducto");
    const selTam  = document.getElementById("pedTamano");
    const inpFecha= document.getElementById("pedFecha");
    const inpMsg  = document.getElementById("pedMensaje");
    const inpNombre = document.getElementById("pedNombre");
    const inpTel  = document.getElementById("pedTel");
    const selFuera= document.getElementById("pedFuera");
    const errBox  = document.getElementById("pedError");

    // Fecha mínima = hoy
    const hoyISO = new Date().toISOString().split("T")[0];
    inpFecha.min = hoyISO;

    selTipo.addEventListener("change", function () {
      selProd.innerHTML = "";
      const vacio = document.createElement("option");
      vacio.value = ""; vacio.textContent = "Elige un producto…";
      selProd.appendChild(vacio);
      (PRODUCTOS[selTipo.value] || []).forEach(function (p) {
        const o = document.createElement("option");
        o.value = p; o.textContent = p;
        selProd.appendChild(o);
      });
    });

    function fechaBonita(iso) {
      const m = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
      const f = new Date(iso + "T00:00:00");
      return (f.getDate() || 1) + " de " + m[f.getMonth()];
    }

    fPed.addEventListener("submit", function (e) {
      e.preventDefault();
      const hoy = new Date(); hoy.setHours(0,0,0,0);
      const fecha = new Date(inpFecha.value + "T00:00:00");
      const ok = selTipo.value && selProd.value && selTam.value && inpFecha.value &&
                 !isNaN(fecha) && fecha >= hoy && inpNombre.value.trim();
      if (!ok) { errBox.hidden = false; return; }
      errBox.hidden = true;

      const extras = Array.prototype.slice.call(document.querySelectorAll("#formPedido input[type=checkbox]:checked"))
        .map(function (c) { return c.value; });
      let msg = "Hola Pastelería Chocolat, quiero cotizar:\n";
      msg += "• Producto: " + selProd.value + " (" + TIPOS[selTipo.value] + ")\n";
      msg += "• Tamaño: " + selTam.value + "\n";
      msg += "• Fecha: " + fechaBonita(inpFecha.value) + "\n";
      if (inpMsg.value.trim()) msg += "• Mensaje: " + JSON.stringify(inpMsg.value.trim()) + "\n";
      if (extras.length) msg += "• Extras: " + extras.join(", ") + "\n";
      msg += "• Nombre: " + inpNombre.value.trim() + "\n";
      if (inpTel.value.trim()) msg += "• Teléfono: " + inpTel.value.trim() + "\n";
      msg += selFuera.value === "si" ? "• Soy de fuera de Apatzingán." : "• Soy de Apatzingán.";
      window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
    });
  }

  /* ── Año ── */
  const anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
})();
