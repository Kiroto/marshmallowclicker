const espacioContador = document.getElementById("textoContador");
const espacioMPS = document.getElementById("mps");
const botonMarshmallow = document.getElementById("marshmallow");
const espacioTienda = document.getElementById("shop");

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

botonMarshmallow.onclick = () => {
    clickMarshmallow();
}

window.onload = () => {
    listaGeneradores.forEach((generador, id) => {
        const vistaGenerador = generadorAVista(generador, id)
        espacioTienda.appendChild(vistaGenerador)
    })
    setInterval(() => {
      tick(msIn60FPS);
      espacioContador.innerText = contadorMarshmallows.toFixed(0);
      espacioMPS.innerText = marshmallowsPorSegundo.toFixed(1)
    }, msIn60FPS);
}