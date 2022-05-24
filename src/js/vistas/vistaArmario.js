'use strict'
import { VistaMisPrendas } from "./vistaMisPrendas.js"
import { VistaMenuPrincipal } from "./vistaMenuPrincipal.js"
import { VistaCategorias } from "./vistaCategorias.js"
import { VistaPrendas } from "./vistaPrendas.Js"
import { VistaSubirPrenda } from "./vistaSubirPrenda.js"

export class VistaArmario {

    constructor(controlador, base) {
        this.base = base
        this.controlador = controlador
        this.iniciar()
    }

    iniciar() {
        /* VistaArmario.generarParrafo()
        VistaArmario.destruirParrafo()
        VistaArmario.generarDescripcion()
        VistaArmario.destruirDescripcion() */
        VistaArmario.mostrarMisPrendas()
        VistaArmario.mostrarCategorias()
        VistaArmario.mostrarPrendas()
    }

    static mostrarArmario() {
        let armario = document.getElementById('panelArmario')
        armario.style.display = 'flex'
        localStorage.setItem('vista', 'vistaArmario')
    }

    static ocultarArmario() {
        let armario = document.getElementById('panelArmario')
        armario.style.display = 'none'
    }

    static mostrarMisPrendas() {
        let panelMisPrendas = document.querySelectorAll(".cajaArmario")

        panelMisPrendas[0].onclick = (evento) => {
            VistaMenuPrincipal.ocultarPaneles()
            VistaMisPrendas.mostrarMisPrendas()
        }

    }

    static mostrarPrendas(){
        let panelMisPrendas = document.querySelectorAll(".cajaArmario")

        panelMisPrendas[1].onclick = (evento) => {
            VistaMenuPrincipal.ocultarPaneles()
            VistaPrendas.mostrarPrendas()
        }
    }

    static mostrarCategorias() {
        let panelMisPrendas = document.querySelectorAll(".cajaArmario")

        panelMisPrendas[2].onclick = (evento) => {
            VistaMenuPrincipal.ocultarPaneles()
            VistaCategorias.mostrarCategorias()
        }
    }

    /* static generarParrafo() {
        let cajas = document.querySelectorAll('.cajaArmario')
        let contenido = document.querySelectorAll('.nombreSeccion')
        cajas[0].addEventListener('mouseover', (evento) => { contenido[0].innerHTML = 'Mis prendas'})
        cajas[1].addEventListener('mouseover', (evento) => { contenido[1].innerHTML = 'Subir prenda'})
        cajas[2].addEventListener('mouseover', (evento) => { contenido[2].innerHTML = 'Categorías'})
    }

    static destruirParrafo() {
        let cajas = document.querySelectorAll('.cajaArmario')
        let contenido = document.querySelectorAll('.nombreSeccion')
        cajas[0].addEventListener('mouseout', (evento) => { contenido[0].innerHTML = '' })
        cajas[1].addEventListener('mouseout', (evento) => { contenido[1].innerHTML = '' })
        cajas[2].addEventListener('mouseout', (evento) => { contenido[2].innerHTML = '' })
    }

    static generarDescripcion() {
        let cajas = document.querySelectorAll('.cajaArmario')
        let contenido = document.querySelectorAll('.descripcionArmario')
        cajas[0].addEventListener('mouseover', (evento) => { contenido[0].innerHTML = 'Comprueba todas tus prendas guardas, borra las que no tengas o actualiza aquellas que requieran un retoque' })
        cajas[1].addEventListener('mouseover', (evento) => { contenido[1].innerHTML = 'Sube tu prenda y regístrala en tu organizador de armario de forma sencilla' })
        cajas[2].addEventListener('mouseover', (evento) => { contenido[2].innerHTML = 'Crea categorías para organizar mejor tus prendas encontrarlas más rápido y crear tus mejores Outfits.' })
    }

    static destruirDescripcion() {
        let cajas = document.querySelectorAll('.cajaArmario')
        let contenido = document.querySelectorAll('.descripcionArmario')
        cajas[0].addEventListener('mouseout', (evento) => { contenido[0].innerHTML = '' })
        cajas[1].addEventListener('mouseout', (evento) => { contenido[1].innerHTML = '' })
        cajas[2].addEventListener('mouseout', (evento) => { contenido[2].innerHTML = '' })
    } */
}