// Declaro array con productos
const productos = [
    {
        id: "buzo-01",
        titulo: "Buzo 01",
        imagen: "./assets/buzo.webp",
        categoria: {
            nombre: "Buzos",
            id:"buzos",
        },
        precio: 10000
    },{
        id: "buzo-02",
        titulo: "Buzo 02",
        imagen: "./assets/buzo1.webp",
        categoria: {
            nombre: "Buzos",
            id:"buzos",
        },
        precio: 15000
    },
    {
        id: "buzo-03",
        titulo: "Buzo 03",
        imagen: "./assets/buzo2.webp",
        categoria: {
            nombre: "Buzos",
            id:"buzos",
        },
        precio: 20000
    },
    {
        id: "buzo-04",
        titulo: "Buzo 04",
        imagen: "./assets/buzo3.webp",
        categoria: {
            nombre: "Buzos",
            id:"buzos",
        },
        precio: 220000
    },
    {
        id: "gorro-01",
        titulo: "Gorro 01",
        imagen: "./assets/gorro.webp",
        categoria: {
            nombre: "Gorros",
            id:"gorros",
        },
        precio: 6000        
    },
    {
        id: "gorro-02",
        titulo: "Gorro 02",
        imagen: "./assets/gorro1.webp",
        categoria: {
            nombre: "Gorros",
            id:"gorros",
        },
        precio: 8000        
    },
    {
        id: "gorro-03",
        titulo: "Gorro 03",
        imagen: "./assets/gorro2.webp",
        categoria: {
            nombre: "Gorros",
            id:"gorros",
        },
        precio: 5200        
    },
    {
        id: "gorro-04",
        titulo: "Gorro 04",
        imagen: "./assets/gorro3.webp",
        categoria: {
            nombre: "Gorros",
            id:"gorros",
        },
        precio: 4650        
    },
    {
        id: "gorro-05",
        titulo: "Gorro 05",
        imagen: "./assets/gorro4.webp",
        categoria: {
            nombre: "Gorros",
            id:"gorros",
        },
        precio: 4800        
    },
    {
        id: "gorro-06",
        titulo: "Gorro 06",
        imagen: "./assets/gorro5.webp",
        categoria: {
            nombre: "Gorros",
            id:"gorros",
        },
        precio: 6200        
    },
    {
        id: "bermuda-01",
        titulo: "Bermuda 01",
        imagen: "./assets/pantalon.webp",
        categoria: {
            nombre: "Bermudas",
            id:"bermudas",
        },
        precio: 30000        
    },
    {
        id: "bermuda-02",
        titulo: "Bermuda 02",
        imagen: "./assets/pantalon1.webp",
        categoria: {
            nombre: "Bermudas",
            id:"bermudas",
        },
        precio: 31422       
    },
    {
        id: "bermuda-03",
        titulo: "Bermuda 03",
        imagen: "./assets/pantalon2.webp",
        categoria: {
            nombre: "Bermudas",
            id:"bermudas",
        },
        precio: 29565        
    },
    {
        id: "bermuda-04",
        titulo: "Bermuda 04",
        imagen: "./assets/pantalon3.webp",
        categoria: {
            nombre: "Bermudas",
            id:"bermudas",
        },
        precio: 24658        
    },
    {
        id: "bermuda-05",
        titulo: "Bermuda 05",
        imagen: "./assets/pantalon4.webp",
        categoria: {
            nombre: "Bermudas",
            id:"bermudas",
        },
        precio: 31522        
    },
    {
        id: "bermuda-06",
        titulo: "Bermuda 06",
        imagen: "./assets/pantalon5.webp",
        categoria: {
            nombre: "Bermudas",
            id:"bermudas",
        },
        precio: 33522        
    }
]

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