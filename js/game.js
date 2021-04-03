let contadorGalletas = 0
let galletasPorSegundo = 12

const listaGeneradores = [
    Generador("Guarina", 15, 0.1),
    Generador("Asukal", 100, 1),
    Generador("Chocolate", 500, 10),
]

class Generador {
    constructor(nombre, precio, galletasPorSegundo) {
        this.cuenta = 0
        this.nombre = nombre
        this.precioBase = precio
        this.galletasPorSegundo = galletasPorSegundo
        this.getPrecio = () => {
            return Math.pow(this.precioBase, (15 + this.cuenta / 15))
        }
        this.getTotalCPS = () => {
          return this.cuenta * this.galletasPorSegundo
        };
    }
}

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
    contadorGalletas += galletasPorSegundo / (delta / 1000)
}