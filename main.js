let articulos = [];
let fichaArticulo;
let fichaDeArticuloLS = localStorage.getItem("fichaArticulo");
if (fichaDeArticuloLS) {
  fichaArticulo = JSON.parse(fichaDeArticuloLS);
} else {
  fichaArticulo = [];
}

let listaDeArticulos = document.getElementById("articulos");

function renderProducto(data) {
  articulos = data;

  articulos.forEach((articulo) => {
    const card = document.createElement("div");
    card.innerHTML = `<nav class="navbar bg-body-tertiary">
                        <div class="container-fluid"></div>
                        </nav>
                        <div class="container p-3">
                        <div class="row">
                        <section id="seccion-carro" class="col-12">
                        <h3>Nombre: ${articulo.articulo.nombre}</h3>
                        <h4>Precio: $${articulo.articulo.precio}</h4>     
                        <img src="${articulo.articulo.img}" width=150>                 
                        <button class="boton-aumentar" id="${articulo.articulo.id}">+</button>
                        <button class="cantidad" id="${articulo.articulo.id}">${articulo.cantidad}</button>
                        <button class="boton-disminuir" id="${articulo.articulo.id}">-</button>                      
                        <button class="articuloAgregar" id="${articulo.articulo.id}">Agregar al Carro</button>`;

    listaDeArticulos.appendChild(card);
  });

  botonAgregarAlCarro();
  configurarCantidades();
}

Swal.fire("Cargando productos...");
Swal.showLoading();
fetch("./db/data.json").then((resp) => {
  setTimeout(() => {
    Swal.close();
    resp.json().then((data) => renderProducto(data));
  }, 2000);
});

function botonAgregarAlCarro() {
  let addbutton = document.querySelectorAll(".articuloAgregar");
  console.log(addbutton);
  addbutton.forEach((button) => {
    button.onclick = (art) => {
      try {
        const artid = art.currentTarget.id;
        const articuloSeleccionado = articulos.find(
          (articulo) => articulo.articulo.id == artid
        );

        const articuloCarrito = fichaArticulo.find(
          (articulo) => articulo.articulo.id == artid
        );

        if (!articuloCarrito) {
          fichaArticulo.push(articuloSeleccionado);
        } else {
          articuloCarrito.cantidad += articuloSeleccionado.cantidad;
        }

        console.log(fichaArticulo);
        localStorage.setItem("fichaArticulo", JSON.stringify(fichaArticulo));

        Toastify({
          text: "El Producto fue añadido al carrito Exitosamente!",
          duration: 1500,
          destination: "",
          newWindow: false,
          close: false,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
          onClick: function () {},
        }).showToast();
      } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
      } finally {
        console.log("Finalizando la función botonAgregarAlCarro");
      }
    };
  });
}

function configurarCantidades() {
  let cantidad = document.querySelectorAll(".cantidad");
  let aumentar = document.querySelectorAll(".boton-aumentar");
  let disminuir = document.querySelectorAll(".boton-disminuir");
  let contador = 0;

  aumentar.forEach((button) => {
    button.onclick = (art) => {
      const artid = art.currentTarget.id;
      const articuloSeleccionado = articulos.find(
        (articulo) => articulo.articulo.id == artid
      );
      articuloSeleccionado.cantidad++;

      cantidad.forEach((element) => {
        if (element.id == artid) {
          element.innerHTML = articuloSeleccionado.cantidad;
        }
      });
    };
  });

  disminuir.forEach((button) => {
    button.onclick = (art) => {
      const artid = art.currentTarget.id;
      const articuloSeleccionado = articulos.find(
        (articulo) => articulo.articulo.id == artid
      );
      articuloSeleccionado.cantidad--;

      if (articuloSeleccionado.cantidad < 1) {
        articuloSeleccionado.cantidad = 1;
      }

      cantidad.forEach((element) => {
        if (element.id == artid) {
          element.innerHTML = articuloSeleccionado.cantidad;
        }
      });
    };
  });
}
