/**
 * Generador
 * Representa un generador de Marshmellows
 */
class Generador {
    /**
     * Constructor del generador
     * @param {String} nombre El nombre visible del generador
     * @param {Number} precio El precio base del generador
     * @param {Number} marshmallowsPorSegundo La cantidad de marshmallows por segundo que genera
     * @param {String} imagenDeTienda La URL de la imagen que tendrá el generador en la tienda
     */
    constructor(nombre, precio, marshmallowsPorSegundo, imagenDeTienda = "") {
        this.cuenta = 0
        this.nombre = nombre
        this.galletasPorSegundo = marshmallowsPorSegundo
        this.precioBase = precio
        this.imagenDeTienda = imagenDeTienda
        this.getPrecio = () => {
            return Math.floor(Math.pow(this.precioBase, ((15 + this.cuenta) / 15)))
        }
        this.getTotalCPS = () => {
            return this.cuenta * this.galletasPorSegundo
        };
    }
}

// La cantidad de marshmallows del jugador
let contadorMarshmallows = 0;
// La cantidad de marshmallows por segundo que genera el jugador
let marshmallowsPorSegundo = 0;
// El nombre de la tienda
let nombreTienda = "Batatanator"

// La lista de generadores disponibles en el juego
const listaGeneradores = [
    new Generador("Galletas", 15, 0.1, "https://2.bp.blogspot.com/-Of7tRp6iu8I/V3Lgnx1g8-I/AAAAAAAA1N4/-02eFeHn7lUktSyQJnp0RFKxyzfgMQKrwCLcB/s640/IMG_7548%2B%2528640x427%2529.jpg"),
    new Generador("Azúcar", 100, 1, "https://i.pinimg.com/originals/e2/ac/9e/e2ac9ef44dae4bf8f014055931dd88d3.jpg"),
    new Generador("Chocolate", 500, 10, "https://cdn.colombia.com/gastronomia/2018/11/20/chocolate-caliente-con-bombones-1734.jpg"),
    new Generador("Fabrica de Marshmallows", 2000, 35, "https://media.istockphoto.com/photos/confectionery-factory-zephyr-and-marshmallows-production-machine-picture-id970519562"),
    new Generador("Mercaditos", 5000, 50, "https://perspectiveinaction.com/wp-content/uploads/2018/05/CandyShop.jpg"),
    new Generador("Fogatas",8000,100, "https://i.pinimg.com/originals/d5/93/f1/d593f1ce83cf587403acaf78a498721f.jpg"),
    new Generador("Hombre Malvadisco",15000,300, "https://i.pinimg.com/originals/4d/6b/42/4d6b429ff2ce769cb4323bf9e4110f44.jpg")
]

// Función auxiliar que actualiza los marshmallows por segundo en base a los generadores disponibles
const recalcularMarshmallowsPorSegundo = () => {
    let nuevosMarshmallowsPorSegundo = 0;
    listaGeneradores.forEach((generador) => {
        nuevosMarshmallowsPorSegundo += generador.getTotalCPS()
    });
    switch (nombreTienda) {
        case "Jerry":
            nuevosMarshmallowsPorSegundo *= 1.1
            break;
        case "Villar":
            nuevosMarshmallowsPorSegundo *= 1.07
            break;
        case "Capellan":
            nuevosMarshmallowsPorSegundo *= 1.05
            break
        case "Eduardo":
            nuevosMarshmallowsPorSegundo *= 1.03
            break
        default:
            if(nombreTienda != "Batatanator") {
                nuevosMarshmallowsPorSegundo *= 1.01
            }
            break;
    }
    marshmallowsPorSegundo = nuevosMarshmallowsPorSegundo
}

// Función a ejecutar cuando se hace clic al marshmallow
const clickMarshmallow = () => {
    contadorMarshmallows++
}

/**
 * Función que intenta deducir una cantidad al contador de marshmallows
 * @param {Number} precio La cantidad a deducir
 * @returns {Boolean} Si o no fue satisfactoria la transaccion
 */
const deducir = (precio) => {
    if (contadorMarshmallows < precio) {
        return false
    } else {
        contadorMarshmallows -= precio
        return true
    }
}

/**
 * Función a utilizar para comprar un nuevo generador
 * @param {Number} id La posicion del generador en la lista de generadores
 */
const comprarGenerador = (id) => {
    const generador = listaGeneradores[id]
    const pudoComprar = deducir(generador.getPrecio());
    if (pudoComprar) {
        generador.cuenta += 1
        recalcularMarshmallowsPorSegundo();
    }
    return pudoComprar
}

/**
 * Función que genera más marshmallows en base a los marshmallows por segundo.
 * @param {Number} delta El tiempo en milisegundos que ha pasado desde el ultimo tick
 */
const tick = (delta) => {
    delta /= 1000
    contadorMarshmallows += marshmallowsPorSegundo * delta
}