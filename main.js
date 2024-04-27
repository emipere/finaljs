const articulos = [  
    {
        articulo: {
            id : 1,
            nombre : "Gorra",
            precio : 2000,       
            img: href = "img/gorra.jpg"   
        },
        cantidad: 1
    },
    {
        articulo: {
            id : 2,
            nombre : "Campera",
            precio : 12000,
            img: href = "img/campera.jpg" 
        },
        cantidad: 1
    },
    {
        articulo: {
            id : 3,
            nombre : "Remera",
            precio : 8000,
            img: href = "img/remera.jpg" 
        },
        cantidad: 1
    },
    {
        articulo: {
            id : 4,
            nombre : "Short",
            precio : 3000,
            img: href = "img/short.jpg" 
        },
        cantidad: 1
    },
    {
        articulo: {
            id : 5,
            nombre : "Medias",
            precio : 1500,
            img: href = "img/medias.jpg" 
        },
        cantidad: 1
    },
];


let fichaArticulo 
let fichaDeArticuloLS = localStorage.getItem("fichaArticulo")
if(fichaDeArticuloLS){
    fichaArticulo = JSON.parse(fichaDeArticuloLS)
}else {
    fichaArticulo = []
}


let listaDeArticulos = document.getElementById("articulos")


// --ESTA ES UNA MANERA DE AGARRAR EL JSON PERO NO ME DEJA SUMAR NI NAADA CEN EL CARRO--
// async function renderProducto() {
//     try {
//       ---TENGO LA RESP DEL JSON--
//       const response = await fetch('../db/data.json');
  
//       ---VERIFICO SI LA RESPUESTA FUE OK---
//       if (!response.ok) {
//         throw new Error(`Error al cargar datos JSON: ${response.status}`);
//       }
  
//       --CONVIERTO LA RESP A ORMATO JSON
//       const data = await response.json();
  
//       -- LE DOY CURSO AL JSON--
//       data.forEach((articulo) => {
//         const card = document.createElement("div");
//         card.innerHTML = `
//           <nav class="navbar bg-body-tertiary">
//             <div class="container-fluid"></div>
//           </nav>
//           <div class="container p-3">
//             <div class="row">
//               <section id="seccion-carro" class="col-12">
//               <h3>Nombre: ${articulo.articulo.nombre}</h3>
//                       <h4>Precio: $${articulo.articulo.precio}</h4>     
//                       <img src="${articulo.articulo.img}" width=150>                 
//                       <button class="boton-aumentar" id="${articulo.articulo.id}">+</button>
//                      <button class="cantidad" id="${articulo.articulo.id}">${articulo.cantidad}</button>
//                      <button class="boton-disminuir" id="${articulo.articulo.id}">-</button>                      
//                       <button class="articuloAgregar" id="${articulo.articulo.id}">Agregar al Carro</button>  
//               </section>
//             </div>
//           </div>
//         `;
  
//         listaDeArticulos.appendChild(card);
//       });
//     } catch (error) {
//       console.error("Error al cargar datos JSON:", error);
//       // Aquí puedes agregar código para manejar el error de forma específica, como mostrar un mensaje al usuario o registrar el error en un servicio de logs.
//     } finally {
//       console.log("Finalizando la función renderProducto");
//     }
//   }


function renderProducto(articulos) {
 articulos.forEach((articulo) => {
    const card = document.createElement("div")
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
                      <button class="articuloAgregar" id="${articulo.articulo.id}">Agregar al Carro</button>` 
    
    listaDeArticulos.appendChild (card)                      
})

}                  

renderProducto(articulos)

botonAgregarAlCarro()

function botonAgregarAlCarro () {
    let addbutton = document.querySelectorAll(".articuloAgregar");
    console.log(addbutton);
    addbutton.forEach (button => {
      button.onclick = (art) => {
        try {
          const artid = art.currentTarget.id;
          const articuloSeleccionado = articulos.find(articulo => articulo.articulo.id == artid);
  
          const articuloCarrito = fichaArticulo.find(articulo => articulo.articulo.id == artid);
  
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
            onClick: function(){}
          }).showToast();
  
        } catch (error) {
          console.error("Error al agregar producto al carrito:", error);
          
        } finally {
          
          console.log("Finalizando la función botonAgregarAlCarro");
        }
      }
    })
  }


// contador

let cantidad = document.querySelectorAll(".cantidad")
let aumentar = document.querySelectorAll(".boton-aumentar")
let disminuir = document.querySelectorAll(".boton-disminuir")
let contador = 0

aumentar.forEach(button => {

    button.onclick = (art) => {
        
        const artid = art.currentTarget.id;
        const articuloSeleccionado = articulos.find(articulo => articulo.articulo.id == artid);
        articuloSeleccionado.cantidad++;

        cantidad.forEach(element => {
            if (element.id == artid) {
                element.innerHTML = articuloSeleccionado.cantidad;
            }
        });

    };

});

disminuir.forEach(button => {

    button.onclick = (art) => {

        const artid = art.currentTarget.id;
        const articuloSeleccionado = articulos.find(articulo => articulo.articulo.id == artid);
        articuloSeleccionado.cantidad--;

        if (articuloSeleccionado.cantidad < 1) {
            articuloSeleccionado.cantidad = 1;
        }

        cantidad.forEach(element => {
            if (element.id == artid) {
                element.innerHTML = articuloSeleccionado.cantidad;
            }
        });

    };

});

