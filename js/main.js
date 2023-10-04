let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })

//traigo los elementos con su id y/o className y los defino en variables

const contenedorProductos = document.querySelector("#contenedor__productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.getElementById("titulo-principal")
let botonesAgregar = document.querySelectorAll(".contenedor__producto-info-agregar")
const numeroCarrito = document.querySelector("#numeroCarrito")


//Declaro funcion para cargar los productos dinamicamente desde Js

function cargarProductos(productosElegidos) { 
    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("contenedor__producto");
        div.innerHTML = `<img class="contenedor__producto-imagen" height="300px" width="300px" src="${producto.imagen}" alt="${producto.titulo}"> 
        <div class="contenedor__producto-info"><h3 class="contenedor__producto-info-titulo">${producto.titulo}</h3>
        <p class="contenedor__producto-info-precio">$${producto.precio}</p>
        <button class="contenedor__producto-info-agregar" id="${producto.id}">Agregar</button>`;

        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar()
    console.log(botonesAgregar)
}
//añado event listener para asegurarme que la f() cargue bien

document.addEventListener("DOMContentLoaded", function() {
    cargarProductos(productos);
  });

//Defino una f() para filtrar los elementos a traves del sidebar

botonesCategorias.forEach(boton =>{
    boton.addEventListener("click", (e) =>{
        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(productos => productos.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id); 
            cargarProductos(productosBoton);
        }else{
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
})

//Defino f() para que cada vez que se cargen los productos se actualicen los botones(llamamos esta f() en cargar productos)

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".contenedor__producto-info-agregar")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

//Defino un condicional para que si hay algo en el local storage no pierda la info
//cuando vuelvo de carrito a index, y si no hay nada, un array vacio para agregar los productos que elija el cliente

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito")


if(productosEnCarritoLS){
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumeroCarrito();
}else{
    productosEnCarrito = [];
}

//Defino una f() para pushear las elecciones del cliente al array vacio 

function agregarAlCarrito(e) {
    // Utilizo libreria toastify
    Toastify({
        text: "agregado",
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
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    //Agrego un condicional para poder agregar varios productos iguales al carrito

    if(productosEnCarrito.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++;
console.log(index)
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);        
    }
    actualizarNumeroCarrito();
    //defino que cada vez que se agregue algo al carrito esto se mande al localstorage para usarlo en la pagina de carrito
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}
function actualizarNumeroCarrito(){
    let nuevoNumeroCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarrito.innerText = nuevoNumeroCarrito
}