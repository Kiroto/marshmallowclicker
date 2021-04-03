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
    ImagenGenerador.src = generador.ImagenDeTienda
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
    clickGalleta();
}

window.onload = () => {
    listaGeneradores.forEach((generador, id) => {
        const vistaGenerador = generadorAVista(generador, id)
        espacioTienda.appendChild(vistaGenerador)
    })
    setInterval(() => {
      tick(msIn60FPS);
      espacioContador.innerText = contadorGalletas.toFixed(0);
      espacioMPS.innerText = galletasPorSegundo.toFixed(1)
    }, msIn60FPS);
}