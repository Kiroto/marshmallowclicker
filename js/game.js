class Generador {
    constructor(nombre, precio, galletasPorSegundo, ImagenDeTienda = "") {
        this.cuenta = 0
        this.nombre = nombre
        this.galletasPorSegundo = galletasPorSegundo
        this.precioBase = precio
        this.ImagenDeTienda = ImagenDeTienda
        this.getPrecio = () => {
            return Math.floor(Math.pow(this.precioBase, ((15 + this.cuenta) / 15)))
        }
        this.getTotalCPS = () => {
          return this.cuenta * this.galletasPorSegundo
        };
    }
}

let contadorGalletas = 0
let galletasPorSegundo = 0

const listaGeneradores = [
  new Generador(
    "Galletas",
    15,
    0.1,
    "https://2.bp.blogspot.com/-Of7tRp6iu8I/V3Lgnx1g8-I/AAAAAAAA1N4/-02eFeHn7lUktSyQJnp0RFKxyzfgMQKrwCLcB/s640/IMG_7548%2B%2528640x427%2529.jpg"
  ),
  new Generador(
    "Azúcar",
    100,
    1,
    "https://i.pinimg.com/originals/e2/ac/9e/e2ac9ef44dae4bf8f014055931dd88d3.jpg"
  ),
  new Generador(
    "Chocolate",
    500,
    10,
    "https://cdn.colombia.com/gastronomia/2018/11/20/chocolate-caliente-con-bombones-1734.jpg"
  ),
  new Generador(
    "Fabrica de Marshmallows",
    2000,
    35,
    "https://media.istockphoto.com/photos/confectionery-factory-zephyr-and-marshmallows-production-machine-picture-id970519562"
  ),
  new Generador(
    "Mercaditos",
    5000,
    50,
    "https://thefoodtech.com/wp-content/uploads/2020/05/mercado-de-dulces.jpg"
  ),
];

const recalcularGalletasPorSegundo = () => {
    let nuevasGalletasPorSegundo = 0;
    listaGeneradores.forEach((generador) => {
        nuevasGalletasPorSegundo += generador.getTotalCPS()
    });
    galletasPorSegundo = nuevasGalletasPorSegundo
}

const clickGalleta = () => {
    contadorGalletas++
}

/**
 * @param {Number} precio La cantidad a deducir
 * @returns {Boolean} Si fue satisfactoria la transaccion
 */
const deducir = (precio) => {
    if (contadorGalletas < precio) {
        return false
    } else {
        contadorGalletas -= precio
        return true
    }
}

/**
 * @param {Number} id La posicion del generador en la lista de generadores
 */
const comprarGenerador = (id) => {
    const generador = listaGeneradores[id]
    const pudoComprar = deducir(generador.getPrecio());
    if (pudoComprar) {
        generador.cuenta += 1
        recalcularGalletasPorSegundo();
    }
    return pudoComprar
}

/**
 * @param {Number} delta El tiempo en milisegundos
 */
const tick = (delta) => {
    delta /= 1000
    contadorGalletas += galletasPorSegundo * delta
}