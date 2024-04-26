let cartsotarge = localStorage.getItem("fichaArticulo")
cartsotarge = JSON.parse(cartsotarge) 

let cartContaainer = document.getElementById ("seccion-carro")

function renderCarrito(cartItems) {

    let total = 0;

    cartContaainer.innerHTML = '';
    
    cartItems.forEach (articulo => {
        const cart = document.createElement ("div")
        cart.className = 'card mt-2'
        cart.innerHTML = `<div class="card-body">
                            <img src="${articulo.articulo.img}"width=150>
                            <h3 class="card-title">${articulo.articulo.nombre}</h3>
                            <h4 class="card-text">${articulo.cantidad} x $${articulo.articulo.precio}</h4>
                            <button class="btn btn-primary btn-agregar" id="${articulo.articulo.id}">+</button>                            
                            <button class="btn btn-primary btn-disminuir" id="${articulo.articulo.id}">-</button>
                            <button class="btn btn-danger btn-eliminar" id="${articulo.articulo.id}">Eliminar</button>
                            </div>`
         cartContaainer.appendChild(cart)                
         total += articulo.articulo.precio * parseInt(articulo.cantidad)
    });

    const totalcontainer = document.createElement ("div")
    totalcontainer.innerHTML = `<h3>Total $${total}</h3>`;
    cartContaainer.appendChild(totalcontainer)  
    
    configButtons(cartsotarge)       

}

function configButtons(cartItems) {

    let agregar = document.querySelectorAll('.btn-agregar');
    let disminuir = document.querySelectorAll('.btn-disminuir');
    let eliminar = document.querySelectorAll('.btn-eliminar');

    agregar.forEach(button => {

        button.onclick = (art) => {
            const artid = art.currentTarget.id;
            const articuloSeleccionado = cartItems.find(articulo => articulo.articulo.id == artid)

            if (articuloSeleccionado) {
                articuloSeleccionado.cantidad++;
                localStorage.setItem("fichaArticulo", JSON.stringify(cartItems))
                renderCarrito(cartsotarge)
            }
        }

    });

    disminuir.forEach(button => {

        button.onclick = (art) => {
            const artid = art.currentTarget.id;
            const articuloSeleccionado = cartItems.find(articulo => articulo.articulo.id == artid)

            if (articuloSeleccionado) {
                articuloSeleccionado.cantidad--;
                if (articuloSeleccionado.cantidad == 0) {
                    articuloSeleccionado.cantidad = 1;
                }
                localStorage.setItem("fichaArticulo", JSON.stringify(cartItems))
                renderCarrito(cartsotarge)
            }
        }

    });

    eliminar.forEach(button => {

        button.onclick = (art) => {
            const artid = art.currentTarget.id;
            const idx = cartItems.findIndex(articulo => articulo.articulo.id == artid)

            if (idx >= 0) {
                cartItems.splice(idx, 1);
                localStorage.setItem("fichaArticulo", JSON.stringify(cartItems))
                renderCarrito(cartsotarge)
            }
        }

    });

}

renderCarrito(cartsotarge)

// NO SUPE APLICARLE LIBRERIA AL BOTON VACIAR  Y AL BOTON EMITIR PAGO NO VACIAR EL CARRO

// let vaciarCarro = document.querySelectorAll('.btn-vaciarCarro');

// button.onclick = (vaciarCarro) => {
//     Swal.fire({
//         title: "The Internet?",
//         text: "That thing is still around?",
//         icon: "question"
//       })
//     }


// vaciarCarro ()