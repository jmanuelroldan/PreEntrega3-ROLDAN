// Traigo la info de compra del localstorage y la paso de string a objeto
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito)
// Defino variables necesarias

const carritoVacio = document.querySelector("#contenedor__carrito-vacio");
const contenedorProductos = document.querySelector("#contenedor__carrito-productos");
const carritoAcciones = document.querySelector("#carrito__acciones");
const compraFinalizada = document.querySelector("#contenedor__carrito-comprado");
const botonVaciarCarrito = document.querySelector(".carrito__acciones-izq-vaciar");
const botonComprar = document.querySelector(".carrito__acciones-der-comprar");
let precioTotal = document.querySelector("#total");
let botonesEliminar = document.querySelectorAll(".contenedor__carrito-producto-eliminar");

//Me aseguro que el contenedor se encuentre vacio
contenedorProductos.innerHTML = "";

// Defino que se va a ver dependiendo si hay o no productos en carrito, y si se hizo la compra
function cargarProductosCarrito(){
    if (productosEnCarrito && productosEnCarrito.length > 0){      
        
        carritoVacio.classList.add("disabled");
        contenedorProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");
        compraFinalizada.classList.add("disabled");
    
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("contenedor__carrito-producto");
            div.innerHTML = `
                <img src="${producto.imagen}"  class="contenedor__carrito-producto-imagen" alt="${producto.titulo}">
                <div class="contenedor__carrito-producto-nombre">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="contenedor__carrito-producto-cantidad">
                    <small>cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="contenedor__carrito-producto-precio">
                    <small>precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="contenedor__carrito-producto-subtotal">
                    <small>Total</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="contenedor__carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>`
    
                contenedorProductos.append(div);
        });  
        
    }else{
        carritoVacio.classList.remove("disabled");
        contenedorProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        compraFinalizada.classList.add("disabled");
    }
   actualizarPrecioTotal()
}



// Defino funciones para eliminar productos en el carrito


function eliminarDelCarrito(e) {
    Toastify({
        text: "Eliminado",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", 
        position: "center",
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, #E28973, #AA6775)",
          borderRadius: "2rem",
          textTransform: "upperCase",
          fontSize: "0.75rem"
        },
        
        onClick: function(){} // Callback after click
      }).showToast();
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    contenedorProductos.innerHTML = '';
    cargarProductosCarrito();

    actualizarBotonesEliminar();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".contenedor__carrito-producto-eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
  

}
//Defino f() para el boton vaciar carrito

botonVaciarCarrito.addEventListener("click", vaciarCarrito)

function vaciarCarrito(){
// Utilizo libreria sweetAlert
Swal.fire({
    title: '<strong>¿Estas seguro?</strong>',
    icon: 'question',
    html:
    `Se van a borrar todos tus productos ( ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)})`,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText:
      'Si',
    cancelButtonText:
      'No',
  }).then((result) => {
    if (result.isConfirmed) {
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
    }
  })

}
//Defino f()para comprar

botonComprar.addEventListener("click", comprar)
function comprar(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    carritoVacio.classList.add("disabled");
        contenedorProductos.classList.add("disabled");
        carritoAcciones.classList.add("disabled");
        compraFinalizada.classList.remove("disabled");

}
//Defino f() para actualizar precio total
function actualizarPrecioTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    precioTotal.innerText = `${totalCalculado}`;
}

cargarProductosCarrito();
actualizarBotonesEliminar();
