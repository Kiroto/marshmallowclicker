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

    espacioGenerador.classList.add("espacio-generador");

    const generadorTextoDeTienda = (generador, id) => {
        return `${variablesDeJuego.generadores[id]} - ${generador.nombre} (+${
            generador.marshmallowPorSegundo
        }mps) ($${getPrecioGenerador(id).toFixed(
            0
        )}); (${getGeneracionDeGenerador(id).toFixed(1)}mps)`;
    };

    const refrescarTextoGenerador = () => {
        infoGenerador.innerText = generadorTextoDeTienda(generador, id);
    };

    ImagenGenerador.src = generador.imagenDeTienda;
    ImagenGenerador.classList.add("imagenProducto");
    infoGenerador.innerText = generadorTextoDeTienda(generador, id);
    botonCompra.innerText = "Comprar";
    botonCompra.onclick = () => {
        comprarGenerador(id);
        refrescarTextoGenerador();
    };
    espacioGenerador.appendChild(ImagenGenerador);
    espacioGenerador.appendChild(infoGenerador);
    espacioGenerador.appendChild(botonCompra);
    return [espacioGenerador, refrescarTextoGenerador];
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

updateFunctions = [];

const refreshShop = () => {
    updateFunctions.forEach((updf) => {
        updf();
    });
};

window.onload = () => {
    const msIn60FPS = (1 / 60) * 1000; // Intervalo de tiempo de refresco

    listaGeneradores.forEach((elementoDelArreglo, id) => {
        const vistaGeneradorYRefresco = crearHTMLdeGenerador(
            elementoDelArreglo,
            id
        );
        espacioTienda.appendChild(vistaGeneradorYRefresco[0]);
        updateFunctions.push(vistaGeneradorYRefresco[1]);
    });
    setInterval(() => {
        update(msIn60FPS);
    }, msIn60FPS);
};
