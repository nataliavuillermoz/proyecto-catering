const categoriaMap = {
  platosPrincipales: "collapsePlatosPrincipales",
  recepciones: "collapseRecepciones",
  guarnicionesSalsas: "collapseGuarnicionesSalsas",
  islas: "collapseIslas",
  pizzas: "collapsePizzas"
};

const modalEl = document.getElementById("modal-productos");
const modalBootstrap = new bootstrap.Modal(modalEl);

function abrirModal(prod) {
  modalEl.querySelector("img").src = prod.imagen;
  modalEl.querySelector("img").alt = prod.nombre;
  modalEl.querySelector("h4").textContent = prod.nombre;
  modalEl.querySelector("p").innerHTML = prod.descripcion;
  modalBootstrap.show();
}

function renderProductos(productos) {
  productos.forEach(prod => {
    const contenedorId = categoriaMap[prod.categoria];
    if (!contenedorId) return;

    const categoriaContainer = document.getElementById(contenedorId);
    if (!categoriaContainer) return;

    const prodDiv = document.createElement("div");
    prodDiv.className = "";
    prodDiv.innerHTML = `
      <a type="button" class="card" style="cursor:pointer;">
        <img src="${prod.imagen}" alt="${prod.nombre}">
        <h4>${prod.nombre}</h4>
        <p>${prod.subtitulo}</p>
      </a>
    `;

    prodDiv.querySelector("a").addEventListener("click", e => {
      e.preventDefault();
      abrirModal(prod);
    });

    categoriaContainer.appendChild(prodDiv);
  });
}

function openCollapseFromHash() {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;

  const button = document.getElementById(hash);
  if (!button || !button.classList.contains('categoriaBoton')) return;

  const collapseTarget = button.getAttribute('data-bs-target');
  if (!collapseTarget) return;

  const collapseElement = document.querySelector(collapseTarget);
  if (!collapseElement) return;

  const bsCollapse = new bootstrap.Collapse(collapseElement, {
    toggle: false
  });
  bsCollapse.show();
}

document.addEventListener("DOMContentLoaded", () => {
  openCollapseFromHash();
  window.addEventListener("hashchange", openCollapseFromHash);

  fetch("datos-productos.json")
    .then(res => res.json())
    .then(data => renderProductos(data))
    .catch(err => console.error("Error cargando productos:", err));
});
