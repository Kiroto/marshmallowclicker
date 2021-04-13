const espacioContador = document.getElementById("textoContador");
const espacioMPS = document.getElementById("mps");
const botonMarshmallow = document.getElementById("marshmallow");
const espacioTienda = document.getElementById("shop");
const espacioNombre = document.getElementById("nombreTienda");
const botonCambiarNombre = document.getElementById("cambiarNombre");

const msIn60FPS = (1 / 60) * 1000

/**
 * @param {Generador} generador
 */
const generadorAVista = (generador, id) => {
    const espacioGenerador = document.createElement("div")
    const infoGenerador = document.createElement("span");
    const botonCompra = document.createElement("button")
    const ImagenGenerador = document.createElement("img");
    ImagenGenerador.src = generador.imagenDeTienda
    ImagenGenerador.classList.add ("imagenProducto")
    infoGenerador.innerText = `${generador.cuenta} - ${generador.nombre} ($${generador.getPrecio()})`
    botonCompra.innerText = "Comprar"
    botonCompra.onclick = () => {
        comprarGenerador(id)
        infoGenerador.innerText = `${generador.cuenta} - ${generador.nombre} ($${generador.getPrecio()})`
    }
    espacioGenerador.appendChild(ImagenGenerador)
    espacioGenerador.appendChild(infoGenerador);
    espacioGenerador.appendChild(botonCompra)
    return espacioGenerador;
}

const update = (delta) => {
    tick(delta);
    espacioContador.innerText = contadorMarshmallows.toFixed(0);
    espacioMPS.innerText = marshmallowsPorSegundo.toFixed(1);
    espacioNombre.innerText = nombreTienda;
}

botonMarshmallow.onclick = () => {
    clickMarshmallow();
}

botonCambiarNombre.onclick = () => {
    const newNombre = prompt("Cual es el nuevo nombre?", nombreTienda)
    nombreTienda = newNombre
    recalcularMarshmallowsPorSegundo()
}



window.onload = () => {
    listaGeneradores.forEach((generador, id) => {
        const vistaGenerador = generadorAVista(generador, id)
        espacioTienda.appendChild(vistaGenerador)
    })
    setInterval(update(msIn60FPS), msIn60FPS);
}