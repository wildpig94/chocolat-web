/* ═══════════════════════════════
   Pastelería Chocolat — Galería estructurada
   La fachada (foto-54 Madre y foto-24 Constitución) y el logo (foto-59)
   NO están en la galería (van en las tarjetas de sucursal y en el logo).
   ═══════════════════════════════ */
const GRUPOS = [
  { titulo: "Nuestra repostería", fotos: ["imagenes/foto-01.jpg","imagenes/foto-02.jpg","imagenes/foto-04.jpg","imagenes/foto-06.jpg","imagenes/foto-07.jpg","imagenes/foto-08.jpg","imagenes/foto-09.jpg","imagenes/foto-10.jpg","imagenes/foto-11.jpg","imagenes/foto-15.jpg","imagenes/foto-16.jpg","imagenes/foto-18.jpg","imagenes/foto-19.jpg","imagenes/foto-20.jpg","imagenes/foto-21.jpg","imagenes/foto-25.jpg","imagenes/foto-27.jpg","imagenes/foto-28.jpg","imagenes/foto-30.jpg","imagenes/foto-31.jpg","imagenes/foto-32.jpg","imagenes/foto-34.jpg","imagenes/foto-35.jpg","imagenes/foto-36.jpg","imagenes/foto-38.jpg","imagenes/foto-39.jpg","imagenes/foto-40.jpg","imagenes/foto-41.jpg","imagenes/foto-42.jpg","imagenes/foto-43.jpg","imagenes/foto-44.jpg","imagenes/foto-45.jpg","imagenes/foto-46.jpg","imagenes/foto-47.jpg","imagenes/foto-48.jpg","imagenes/foto-49.jpg","imagenes/foto-50.jpg","imagenes/foto-51.jpg","imagenes/foto-52.jpg","imagenes/foto-53.jpg","imagenes/foto-55.jpg","imagenes/foto-56.jpg","imagenes/foto-57.jpg","imagenes/foto-58.jpg","imagenes/foto-60.jpg","imagenes/foto-61.jpg","imagenes/foto-62.jpg","imagenes/foto-63.jpg"] },
  { titulo: "Pasteles personalizados", fotos: ["imagenes/foto-12.jpg","imagenes/foto-13.jpg","imagenes/foto-14.jpg","imagenes/foto-17.jpg","imagenes/foto-22.jpg","imagenes/foto-29.jpg","imagenes/foto-33.jpg","imagenes/foto-37.jpg","imagenes/foto-64.jpg","imagenes/foto-65.jpg","imagenes/foto-66.jpg","imagenes/foto-67.jpg"] },
];

(function () {
  const cont = document.getElementById("galeriaGrid");
  if (!cont) return;
  let idx = 0;
  GRUPOS.forEach(function (grupo) {
    const wrap = document.createElement("div");
    wrap.className = "galeria__grupo";
    const h = document.createElement("h3");
    h.className = "galeria__titulo";
    h.textContent = grupo.titulo;
    wrap.appendChild(h);
    const grid = document.createElement("div");
    grid.className = "galeria__grid";
    grupo.fotos.forEach(function (src) {
      idx++;
      const d = document.createElement("div");
      d.className = "galeria__item";
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Pastel o postre de Pastelería Chocolat " + idx;
      img.loading = idx <= 9 ? "eager" : "lazy";
      img.decoding = "async";
      d.appendChild(img);
      grid.appendChild(d);
    });
    wrap.appendChild(grid);
    cont.appendChild(wrap);
  });
})();
