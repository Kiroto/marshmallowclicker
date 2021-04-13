const espacioContador = document.getElementById("textoContador"); // Es el elemento encontrado con el ID "textoContador"
const espacioMPS = document.getElementById("mps");
const botonMarshmallow = document.getElementById("marshmallow");
const espacioTienda = document.getElementById("shop");
const espacioNombre = document.getElementById("nombreTienda");
const botonCambiarNombre = document.getElementById("cambiarNombre");

/**
 * Toma como parametro un generador y una posición en la lista de generadores
 * y crea un elemento HTML con todas las características de ese generador
 * @param {Generador} generador
 * @returns {HTMLDivElement} la fila de tienda de ese generador.
 */
const crearHTMLdeGenerador = (generador, id) => {
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

/**
 * Actualiza el juego dado un intervalo de tiempo (una fracción de tiempo entre fotogramas)
 * @param {Number} delta el intérvalo de refresco
 */
const update = (delta) => {
    tick(delta);
    espacioContador.innerText = contadorMarshmallows.toFixed(0);
    espacioMPS.innerText = marshmallowsPorSegundo.toFixed(1);
    espacioNombre.innerText = nombreTienda;
}

/**
 * Conecta el evento onClick del botón marshmallow al modelo
 */
botonMarshmallow.onclick = () => {
    clickMarshmallow();
}

/**
 * Conecta el evento onClick del botón para cambiar el nombre al cambio de nombre
 */
botonCambiarNombre.onclick = () => {
    const newNombre = prompt("Cual es el nuevo nombre?", nombreTienda)
    nombreTienda = newNombre
    recalcularMarshmallowsPorSegundo()
}

window.onload = () => {
    const msIn60FPS = (1 / 60) * 1000; // Intervalo de tiempo de refresco

    listaGeneradores.forEach((elementoDelArreglo, id) => {
      const vistaGenerador = crearHTMLdeGenerador(elementoDelArreglo, id);
      espacioTienda.appendChild(vistaGenerador);
    });
    setInterval(() => {
        update(msIn60FPS);
    }, msIn60FPS);
};