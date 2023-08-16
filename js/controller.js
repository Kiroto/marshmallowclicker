const espacioContador = document.getElementById("textoContador"); // Es el elemento encontrado con el ID "textoContador"
const espacioMPS = document.getElementById("mps");
const botonMarshmallow = document.getElementById("marshmallow");
const espacioTienda = document.getElementById("shop");
const espacioNombre = document.getElementById("nombreTienda");
const botonCambiarNombre = document.getElementById("cambiarNombre");
const botonCargar = document.getElementById("cargar");
const botonGuardar = document.getElementById("guardar");

/**
 * Toma como parametro un generador y una posición en la lista de generadores
 * y crea un elemento HTML con todas las características de ese generador
 * @param {Generador} generador
 * @returns {HTMLDivElement} la fila de tienda de ese generador.
 */
const crearHTMLdeGenerador = (generador, id) => {
    const espacioGenerador = document.createElement("div");
    const infoGenerador = document.createElement("span");
    const botonCompra = document.createElement("button");
    const ImagenGenerador = document.createElement("img");
    ImagenGenerador.src = generador.imagenDeTienda;
    ImagenGenerador.classList.add("imagenProducto");
    infoGenerador.innerText = `${generador.cuenta} - ${
        generador.nombre
    } ($${getPrecioGenerador(id)})`;
    botonCompra.innerText = "Comprar";
    botonCompra.onclick = () => {
        comprarGenerador(id);
        infoGenerador.innerText = `${generador.cuenta} - ${
            generador.nombre
        } ($${getPrecioGenerador(id)})`;
    };
    espacioGenerador.appendChild(ImagenGenerador);
    espacioGenerador.appendChild(infoGenerador);
    espacioGenerador.appendChild(botonCompra);
    return espacioGenerador;
};

const refreshUI = () => {
    espacioContador.innerText =
        variablesDeJuego.contadorMarshmallows.toFixed(0);
    espacioMPS.innerText = marshmallowsPorSegundo.toFixed(1);
    espacioNombre.innerText = variablesDeJuego.nombreTienda;
};

/**
 * Actualiza el juego dado un intervalo de tiempo (una fracción de tiempo entre fotogramas)
 * @param {Number} delta el intérvalo de refresco
 */
const update = (delta) => {
    tick(delta);
    refreshUI();
};

/**
 * Conecta el evento onClick del botón marshmallow al modelo
 */
botonMarshmallow.onclick = () => {
    clickMarshmallow();
};

/**
 * Conecta el evento onClick del botón para cambiar el nombre al cambio de nombre
 */
botonCambiarNombre.onclick = () => {
    const newNombre = prompt(
        "Cual es el nuevo nombre?",
        variablesDeJuego.nombreTienda
    );

    if (newNombre.length > 16) {
        alert("Muy largo, usar menos de 16 caracteres");
    } else {
        variablesDeJuego.nombreTienda = newNombre;
        recalcularMarshmallowsPorSegundo();
    }
};

botonGuardar.onclick = () => {
    guardar();
};

botonCargar.onclick = () => {
    cargar();
};

window.onload = () => {
    console.log(variablesDeJuego);
    const msIn60FPS = (1 / 60) * 1000; // Intervalo de tiempo de refresco

    listaGeneradores.forEach((elementoDelArreglo, id) => {
        const vistaGenerador = crearHTMLdeGenerador(elementoDelArreglo, id);
        espacioTienda.appendChild(vistaGenerador);
    });
    setInterval(() => {
        update(msIn60FPS);
    }, msIn60FPS);
};
