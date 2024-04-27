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

        let exit = document.getElementById ("exit")
        const fin = document.createElement ("div")
        fin.className = 'card mt-2'
        if (total >0) {
        fin.innerHTML = `<div>
                            <button class="btn btn-danger btn-vaciarCarro">Vaciar Carro</button>
                            </div>`
                           
        cartContaainer.appendChild(fin) 
        };



        let pagar = document.getElementById ("pagar")
        if (total >0){
        const remito = document.createElement ("div")
        remito.className = 'card mt-2'
        remito.innerHTML = `<div>
                            <button class="btn btn-primary btn-emitirOrdenDePago"> Emitir Orden de Pago </button>
                            </div>`

         cartContaainer.appendChild(remito);
         
          
        };
        

    const totalcontainer = document.createElement ("div")
    totalcontainer.innerHTML = `<h2>Total $${total}</h2>`;
    cartContaainer.appendChild(totalcontainer)  
    
    configButtons(cartsotarge)       

}

function configButtons(cartItems) {

    let agregar = document.querySelectorAll('.btn-agregar');
    let disminuir = document.querySelectorAll('.btn-disminuir');
    let eliminar = document.querySelectorAll('.btn-eliminar');
    let vaciarCarro = document.querySelectorAll('.btn-vaciarCarro');
    let emitirOrdenDePago= document.querySelectorAll('.btn-emitirOrdenDePago')

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

                Toastify({
                    text: "El Producto fue eliminado del carrito Exitosamente!",
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
            }
        }

    });


vaciarCarro.forEach(button => {
    button.onclick = async () => { 
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro de vaciar el carrito?",
        text: "¡Esta acción no se puede deshacer!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, vaciar',
        cancelButtonText: 'Cancelar'
      });

      if (confirmacion.isConfirmed) {
        cartsotarge = []; 
        localStorage.setItem("fichaArticulo", JSON.stringify(cartsotarge));
        renderCarrito(cartsotarge); 
        Swal.fire('Carrito Vacio!', '', 'success'); 
      }
    }
  })
  
  


emitirOrdenDePago.forEach(button => {
    button.onclick = async () => {

        const { value: email } = await Swal.fire({
            title: "Gracias por su compra. " + "Le enviaremos la orden para su posterior pago.",
            input: "email",
            inputLabel: "Por favor complete su mail en el siguiente recuadro",
            inputPlaceholder: "...........@.............."
          });
          if (email) {
            Swal.fire(`Por favor dirijase al Centro de Pagos con la orden que la fue enviada al correo : ${email}`);
          }
}
})

 }

renderCarrito(cartsotarge)



