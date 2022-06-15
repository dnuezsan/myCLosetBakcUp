'use strict'

import { Controlador } from "../controlador/controlador.js"

/**
 *Clase que gestiona el panel de los outfits de la aplicación
 *
 * @export
 * @class VistaOutfits
 */
export class VistaOutfits {

    /**
     *
     * @param {Object} controlador
     * @param {Node} base
     * @memberof VistaOutfits
     */
    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }

    /**
     *Método que ejecuta varios métodos
     *
     * @memberof VistaOutfits
     */
    async iniciar() {
        VistaOutfits.limpiarOutfit()
        VistaOutfits.cargarOutfits()
        await VistaOutfits.cargarPrendasCabeza()
        await VistaOutfits.cargarPrendasTorso()
        await VistaOutfits.cargarPrendasPiernas()
        await VistaOutfits.cargarPrendasPies()
        VistaOutfits.igualarFormularios()
        VistaOutfits.crudOutfits()
        VistaOutfits.detectarCambiosSelectYCargar()
    }

    /**
     *Muestra el panel de outfits y configura la variable local
     *
     * @static
     * @memberof VistaOutfits
     */
    static mostrarOutfits() {
        let panel = document.getElementById('panelOutfit')
        panel.style.display = 'flex'
        localStorage.setItem('vista', 'vistaOutfits')
    }

    /**
     *Oculta el panel y limpia el formulario
     *
     * @static
     * @memberof VistaOutfits
     */
    static ocultarOutfits() {
        let panel = document.getElementById('panelOutfit')
        panel.style.display = 'none'
        VistaOutfits.limpiarFormulario()
    }

    /**
     *Deja en blanco los valores del formulario
     *
     * @static
     * @memberof VistaOutfits
     */
    static limpiarFormulario() {
        let inputs = document.querySelectorAll('#panelOutfit input')
        let selects = document.querySelectorAll('#panelOutfit select')

        inputs.forEach(input => {
            input.value = ''
        });

        selects.forEach(select => {
            select.value = ''
        });

    }

    /**
     *Deja en blanco el formulario al pulsar el boton indicado
     *
     * @static
     * @memberof VistaOutfits
     */
    static limpiarOutfit() {
        let botones = document.getElementsByClassName('botonNuevoOutfit')

        for (let i = 0; i < botones.length; i++) {
            botones[i].addEventListener('click', () => {
                VistaOutfits.limpiarFormulario()
                VistaOutfits.cargarImgPrendaCabeza('')
                VistaOutfits.cargarImgPrendaTorso('')
                VistaOutfits.cargarImgPrendaPiernas('')
                VistaOutfits.cargarImgPrendaPies('')
            }, true)
        }

    }

    /**
     *Carga todos los outfits y los introduce en los select correspondientes
     *
     * @static
     * @memberof VistaOutfits
     */
    static async cargarOutfits() {
        let selectOutfits = document.getElementsByClassName('outfitCargado')

        let outfits = await Controlador.cargaOutfits()

        for (let i = 0; i < outfits.length; i++) {
            VistaOutfits.generarOptionOutfit(outfits[i], selectOutfits[0])
            VistaOutfits.generarOptionOutfit(outfits[i], selectOutfits[1])

        }

        $('.outfitCargado').formSelect()
    }

    /**
     *Elimina las opciones que había con anterioridad en los select y genera nuevas prendas de cabeza en los selects correspondientes
     *
     * @static
     * @memberof VistaOutfits
     */
    static async cargarPrendasCabeza() {
        let prendaCabeza = document.getElementsByClassName('prendaCabezaOutfit')

        for (let i = 0; i < prendaCabeza.length; i++) {
            if (prendaCabeza[i].childElementCount > 1) {
                while (prendaCabeza[i].childElementCount > 1) {
                    prendaCabeza[i].removeChild(prendaCabeza[i].children[1])
                }
            }
        }

        let prendas = await Controlador.cargarPrendasCabeza()

        for (let i = 0; i < prendas.length; i++) {

            VistaOutfits.generarOptionPrenda(prendas[i], prendaCabeza[0])
            VistaOutfits.generarOptionPrenda(prendas[i], prendaCabeza[1])
        }

        $('.prendaCabezaOutfit').formSelect()

    }

    /**
     *Elimina las opciones que había con anterioridad en los select y genera nuevas prendas de torso en los selects correspondientes
     *
     * @static
     * @memberof VistaOutfits
     */
    static async cargarPrendasTorso() {

        let prendaTorso = document.getElementsByClassName('prendaTorsoOutfit')

        for (let i = 0; i < prendaTorso.length; i++) {
            if (prendaTorso[i].childElementCount > 1) {
                while (prendaTorso[i].childElementCount > 1) {
                    prendaTorso[i].removeChild(prendaTorso[i].children[1])
                }
            }
        }

        let prendas = await Controlador.cargarPrendasTorso()

        for (let i = 0; i < prendas.length; i++) {

            VistaOutfits.generarOptionPrenda(prendas[i], prendaTorso[0])
            VistaOutfits.generarOptionPrenda(prendas[i], prendaTorso[1])
        }
        $('.prendaTorsoOutfit').formSelect()
    }

    /**
     *Elimina las opciones que había con anterioridad en los select y genera nuevas prendas de piernas en los selects correspondientes
     *
     * @static
     * @memberof VistaOutfits
     */
    static async cargarPrendasPiernas() {

        let prendaPiernas = document.getElementsByClassName('prendaPiernasOutfit')

        for (let i = 0; i < prendaPiernas.length; i++) {
            if (prendaPiernas[i].childElementCount > 1) {
                while (prendaPiernas[i].childElementCount > 1) {
                    prendaPiernas[i].removeChild(prendaPiernas[i].children[1])
                }
            }
        }

        let prendas = await Controlador.cargarPrendasPiernas()

        for (let i = 0; i < prendas.length; i++) {

            VistaOutfits.generarOptionPrenda(prendas[i], prendaPiernas[0])
            VistaOutfits.generarOptionPrenda(prendas[i], prendaPiernas[1])
        }
        $('.prendaPiernasOutfit').formSelect()
    }

    /**
     *Elimina las opciones que había con anterioridad en los select y genera nuevas prendas de pies en los selects correspondientes
     *
     * @static
     * @memberof VistaOutfits
     */
    static async cargarPrendasPies() {

        let prendaPies = document.getElementsByClassName('prendaPiesOutfit')

        for (let i = 0; i < prendaPies.length; i++) {
            if (prendaPies[i].childElementCount > 1) {
                while (prendaPies[i].childElementCount > 1) {
                    prendaPies[i].removeChild(prendaPies[i].children[1])
                }
            }
        }

        let prendas = await Controlador.cargarPrendasPies()

        for (let i = 0; i < prendas.length; i++) {

            VistaOutfits.generarOptionPrenda(prendas[i], prendaPies[0])
            VistaOutfits.generarOptionPrenda(prendas[i], prendaPies[1])
        }
        $('.prendaPiesOutfit').formSelect()
    }

    /**
     *Genera opciones para introducir los outfits y sus valores
     *
     * @static
     * @param {JSON} datos
     * @param {Node} nodoPadre
     * @memberof VistaOutfits
     */
    static generarOptionOutfit(datos, nodoPadre) {
        let opcion = document.createElement('option')
        //opcion.classList.add('prendaCabeza')

        opcion.value = datos.idOutfit
        opcion.textContent = datos.nombreOutfit
        nodoPadre.appendChild(opcion)
    }

    /**
     *Genera opciones para introducir las prendas, sus valores y un texto con su nombre y subcategoria
     *
     * @static
     * @param {JSON} datos
     * @param {Node} nodoPadre
     * @memberof VistaOutfits
     */
    static generarOptionPrenda(datos, nodoPadre) {
        let opcion = document.createElement('option')
        //opcion.classList.add('prendaCabeza')

        opcion.value = datos.idPrenda
        opcion.textContent = `${datos.nombreSubcategoria} - ${datos.nombrePrenda}`
        nodoPadre.appendChild(opcion)
    }

    /**
     *Carga en los inputs de nombre de outfit, en nombre del outfit seleccionado
     *
     * @static
     * @param {int} idOutfit
     * @memberof VistaOutfits
     */
    static async cargarNombreOutfit(idOutfit) {
        let inputNombreOutfit = document.getElementsByClassName('nombreOutfit')

        let nombreOutfit = await Controlador.cargaOutfits()

        nombreOutfit.forEach(nombre => {
            if (nombre.idOutfit == idOutfit) {
                inputNombreOutfit[0].value = nombre.nombreOutfit
                inputNombreOutfit[1].value = nombre.nombreOutfit
            }
        });

    }

    /**
     *Carga la prenda de cabeza del outfit seleccionado
     *
     * @static
     * @return {int} 
     * @memberof VistaOutfits
     */
    static async cargarPrendasCabezaOutfit() {
        let outfitCargado = document.getElementsByClassName('outfitCargado')
        let prendaCabeza = document.getElementsByClassName('prendaCabezaOutfit')

        let prendaCabezaOutfit = null
        let idOutfit = null
        for (let i = 0; i < outfitCargado.length; i++) {
            idOutfit = outfitCargado[i].value
            prendaCabezaOutfit = await Controlador.cargarPrendasCabezaOutfit(idOutfit)
            prendaCabeza[0].value = prendaCabezaOutfit[0].idPrenda
            prendaCabeza[1].value = prendaCabezaOutfit[0].idPrenda
            $('.prendaCabezaOutfit').formSelect()
            return prendaCabeza[i].value
        }
    }

    /**
     *Carga la prenda de torso del outfit seleccionado
     *
     * @static
     * @return {int} 
     * @memberof VistaOutfits
     */
    static async cargarPrendasTorsoOutfit() {
        let outfitCargado = document.getElementsByClassName('outfitCargado')
        let prendaTorso = document.getElementsByClassName('prendaTorsoOutfit')

        let prendaTorsoOutfit = null
        let idOutfit = null
        for (let i = 0; i < outfitCargado.length; i++) {
            idOutfit = outfitCargado[i].value
            prendaTorsoOutfit = await Controlador.cargarPrendasTorsoOutfit(idOutfit)
            prendaTorso[0].value = prendaTorsoOutfit[0].idPrenda
            prendaTorso[1].value = prendaTorsoOutfit[0].idPrenda
            $('.prendaTorsoOutfit').formSelect()
            return prendaTorso[i].value
        }
    }

    /**
     *Carga la prenda de Piernas del outfit seleccionado
     *
     * @static
     * @return {int} 
     * @memberof VistaOutfits
     */
    static async cargarPrendasPiernasOutfit() {
        let outfitCargado = document.getElementsByClassName('outfitCargado')
        let prendaPiernas = document.getElementsByClassName('prendaPiernasOutfit')

        let prendaPiernasOutfit = null
        let idOutfit = null
        for (let i = 0; i < outfitCargado.length; i++) {
            idOutfit = outfitCargado[i].value
            prendaPiernasOutfit = await Controlador.cargarPrendasPiernasOutfit(idOutfit)
            prendaPiernas[0].value = prendaPiernasOutfit[0].idPrenda
            prendaPiernas[1].value = prendaPiernasOutfit[0].idPrenda
            $('.prendaPiernasOutfit').formSelect()
            return prendaPiernas[i].value
        }
    }

    /**
     *Carga la prenda de pies del outfit seleccionado
     *
     * @static
     * @return {int} 
     * @memberof VistaOutfits
     */
    static async cargarPrendasPiesOutfit() {
        let outfitCargado = document.getElementsByClassName('outfitCargado')
        let prendaPies = document.getElementsByClassName('prendaPiesOutfit')

        let prendaPiesOutfit = null
        let idOutfit = null
        for (let i = 0; i < outfitCargado.length; i++) {
            idOutfit = outfitCargado[i].value
            prendaPiesOutfit = await Controlador.cargarPrendasPiesOutfit(idOutfit)
            prendaPies[0].value = prendaPiesOutfit[0].idPrenda
            prendaPies[1].value = prendaPiesOutfit[0].idPrenda
            $('.prendaPiesOutfit').formSelect()
            return prendaPies[i].value
        }
    }


    /**
     *Determina las inserciones o modificaciones de un outfit o borrado del mismo, y envia los valores para esto al controlador
     *
     * @static
     * @memberof VistaOutfits
     */
    static crudOutfits() {
        let panel = document.getElementById('panelOutfit')
        let outfitsCargados = document.getElementsByClassName('outfitCargado')
        let selectCabeza = document.getElementsByClassName('prendaCabezaOutfit')
        let selectTorso = document.getElementsByClassName('prendaTorsoOutfit')
        let selectPiernas = document.getElementsByClassName('prendaPiernasOutfit')
        let selectPies = document.getElementsByClassName('prendaPiesOutfit')
        let botonInsertar = document.getElementsByClassName('botonGuardarOutfit')
        let botonBorrar = document.getElementsByClassName('botonBorrarOutfit')
        let nombreOufit = document.getElementsByClassName('nombreOutfit')
        //PASAR VALORES DE SELECTS A LOS METODOS
        let valorClase = null
        let respuestaPrendas = null
        let respuestaCabeza = null
        let respuestaTorso = null
        let respuestaPiernas = null
        let respuestaPies = null

        for (let i = 0; i < botonInsertar.length; i++) {
            botonInsertar[i].onclick = async () => {

                //Metodos de inserción con mensajes
                if (outfitsCargados[i].value == "") {
                    if (nombreOufit[i].value == '') {
                        try {
                            respuestaPrendas = await Controlador.insertarPrendasOutfit([selectCabeza[i].value, selectTorso[i].value, selectPiernas[i].value, selectPies[i].value], 'Outfit sin nombre')

                            if (!respuestaPrendas.success) {
                                VistaOutfits.mostrarMensaje(respuestaPrendas.mensaje)
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else {
                                location.reload()
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    } else {
                        try {
                            respuestaPrendas = await Controlador.insertarPrendasOutfit([selectCabeza[i].value, selectTorso[i].value, selectPiernas[i].value, selectPies[i].value], nombreOufit[i].value)

                            if (!respuestaPrendas.success) {
                                VistaOutfits.mostrarMensaje(respuestaPrendas.mensaje)
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else {
                                location.reload()
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                }
                //ACTUALIZACION
                else {
                    let idOutfit = outfitsCargados[i].value
                    let prendaCabezaOutfit = await Controlador.cargarPrendasCabezaOutfit(idOutfit)
                    let prendaTorsoOutfit = await Controlador.cargarPrendasTorsoOutfit(idOutfit)
                    let prendaPiernasOutfit = await Controlador.cargarPrendasPiernasOutfit(idOutfit)
                    let prendaPiesOutfit = await Controlador.cargarPrendasPiesOutfit(idOutfit)
                    if (nombreOufit[i].value == '') {
                        console.log(i);
                        respuestaCabeza = await Controlador.modificarOutfit(prendaCabezaOutfit[0].idPrenda, selectCabeza[i].value, outfitsCargados[i].value, 'Outfit sin nombre')
                        respuestaTorso = await Controlador.modificarOutfit(prendaTorsoOutfit[0].idPrenda, selectTorso[i].value, outfitsCargados[i].value, 'Outfit sin nombre')
                        respuestaPiernas = await Controlador.modificarOutfit(prendaPiernasOutfit[0].idPrenda, selectPiernas[i].value, outfitsCargados[i].value, 'Outfit sin nombre')
                        respuestaPies = await Controlador.modificarOutfit(prendaPiesOutfit[0].idPrenda, selectPies[i].value, outfitsCargados[i].value, 'Outfit sin nombre')

                        if (!respuestaCabeza.success) {
                            VistaOutfits.mostrarMensaje(respuestaCabeza.mensaje)
                            panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                        } else if (!respuestaTorso.success) {
                            VistaOutfits.mostrarMensaje(respuestaTorso.mensaje)
                            panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                        } else if (!respuestaPiernas.success) {
                            VistaOutfits.mostrarMensaje(respuestaPiernas.mensaje)
                            panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                        } else if (!respuestaPies.success) {
                            VistaOutfits.mostrarMensaje(respuestaPies.mensaje)
                            panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                        } else {
                            location.reload()
                        }
                    }
                    else {

                        respuestaCabeza = await Controlador.modificarOutfit(prendaCabezaOutfit[0].idPrenda, selectCabeza[i].value, outfitsCargados[i].value, nombreOufit[i].value)

                        respuestaTorso = await Controlador.modificarOutfit(prendaTorsoOutfit[0].idPrenda, selectTorso[i].value, outfitsCargados[i].value, nombreOufit[i].value)

                        respuestaPiernas = await Controlador.modificarOutfit(prendaPiernasOutfit[0].idPrenda, selectPiernas[i].value, outfitsCargados[i].value, nombreOufit[i].value)

                        respuestaPies = await Controlador.modificarOutfit(prendaPiesOutfit[0].idPrenda, selectPiernas[i].value, outfitsCargados[i].value, nombreOufit[i].value)

                        if (!respuestaCabeza.success) {
                            VistaOutfits.mostrarMensaje(respuestaCabeza.mensaje)
                            panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                        } else if (!respuestaTorso.success) {
                            VistaOutfits.mostrarMensaje(respuestaTorso.mensaje)
                            panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                        } else if (!respuestaPiernas.success) {
                            VistaOutfits.mostrarMensaje(respuestaPiernas.mensaje)
                            panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                        } else if (!respuestaPies.success) {
                            VistaOutfits.mostrarMensaje(respuestaPies.mensaje)
                            panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                        } else {
                            location.reload()
                        }
                        /* VistaOutfits.mostrarMensaje('Algo no ha ido bien')
                        panel.onclick = () => { VistaOutfits.ocultarMensaje() } */
                    }
                }
            }
            //BORRADO
            botonBorrar[i].addEventListener('click', async () => {

                if (outfitsCargados[i].value == '') {

                    VistaOutfits.mostrarMensaje('Selecciona algún outfit')
                    panel.addEventListener('click', () => { VistaOutfits.ocultarMensaje() }, true)
                }
                else {
                    VistaOutfits.mostrarCuadroDialogo()
                    let botonBorrar = document.getElementById('botonBorrarOutfits')
                    let botonCancelar = document.getElementById('botonCancelarOutfits')
                    botonBorrar.onclick = async () => {
                        try {
                            let respuestaBorrado = await Controlador.borrarOutfit(outfitsCargados[i].value)
                            if (respuestaBorrado.success) {
                                location.reload()
                            } else {
                                VistaOutfits.mostrarMensaje('No se pudo eliminar su outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    }
                    botonCancelar.onclick = () => {
                        VistaOutfits.ocultarCuadroDialogo()
                    }
                }
            }, true)
        }
    }

    /**
     *Carga las prendas e imágenes de el outfit seleccionado cada vez que este cambia
     *
     * @static
     * @memberof VistaOutfits
     */
    static detectarCambiosSelectYCargar() {
        let outfitsCargados = document.getElementsByClassName('outfitCargado')
        for (let i = 0; i < outfitsCargados.length; i++) {
            outfitsCargados[i].addEventListener('change', async () => {
                if (outfitsCargados[i].value != '') {
                    await VistaOutfits.cargarNombreOutfit(outfitsCargados[i].value)

                    VistaOutfits.cargarImgPrendaCabeza(await VistaOutfits.cargarPrendasCabezaOutfit())

                    VistaOutfits.cargarImgPrendaTorso(await VistaOutfits.cargarPrendasTorsoOutfit())

                    VistaOutfits.cargarImgPrendaPiernas(await VistaOutfits.cargarPrendasPiernasOutfit())

                    VistaOutfits.cargarImgPrendaPies(await VistaOutfits.cargarPrendasPiesOutfit())
                }

            }, true)
        }
        $('#panelOutfit select').formSelect()
    }

    /**
     *Pasa los valores generados en un formulario al otro
     *
     * @static
     * @memberof VistaOutfits
     */
    static igualarFormularios() {
        let outfitsCargados = document.getElementsByClassName('outfitCargado')
        let selectCabeza = document.getElementsByClassName('prendaCabezaOutfit')
        let selectTorso = document.getElementsByClassName('prendaTorsoOutfit')
        let selectPiernas = document.getElementsByClassName('prendaPiernasOutfit')
        let selectPies = document.getElementsByClassName('prendaPiesOutfit')
        let nombreDeOutfit = document.getElementsByClassName('nombreOutfit')
        let valor = null

        for (let i = 0; i < 2; i++) {
            outfitsCargados[i].onchange = () => {
                valor = outfitsCargados[i].value
                for (let j = 0; j < outfitsCargados.length; j++) {
                    outfitsCargados[j].value = valor
                }
            }
            selectCabeza[i].onchange = () => {
                valor = selectCabeza[i].value
                for (let j = 0; j < selectCabeza.length; j++) {
                    selectCabeza[j].value = valor
                }
                VistaOutfits.cargarImgPrendaCabeza(valor)

            }
            selectTorso[i].onchange = () => {
                valor = selectTorso[i].value
                for (let j = 0; j < selectTorso.length; j++) {
                    selectTorso[j].value = valor
                }
                VistaOutfits.cargarImgPrendaTorso(valor)
            }
            selectPiernas[i].onchange = () => {
                valor = selectPiernas[i].value
                for (let j = 0; j < selectPiernas.length; j++) {
                    selectPiernas[j].value = valor
                }
                VistaOutfits.cargarImgPrendaPiernas(valor)
            }
            selectPies[i].onchange = () => {
                valor = selectPies[i].value
                for (let j = 0; j < selectPies.length; j++) {
                    selectPies[j].value = valor
                }
                $('.prendaPiesOutfit').formSelect()
                VistaOutfits.cargarImgPrendaPies(valor)
            }

            nombreDeOutfit[i].onchange = () => {
                valor = nombreDeOutfit[i].value
                for (let j = 0; j < nombreDeOutfit.length; j++) {
                    nombreDeOutfit[j].value = valor
                }
            }

            $('#panelOutfit select').formSelect()
        }
    }

    /**
     *Carga la imagen de una prenda de cabeza o en su defecto, carga una imagen predefinida
     *
     * @static
     * @param {int} idPrenda
     * @memberof VistaOutfits
     */
    static cargarImgPrendaCabeza(idPrenda) {
        let cajaImg = document.getElementById('cabezaOutfit')

        if (idPrenda == '') {
            cajaImg.src = `./src/img/logo.png`
        } else {
            cajaImg.src = `src/php/imagenes_prendas/${idPrenda}.png`
        }
    }

    /**
     *Carga la imagen de una prenda de torso o en su defecto, carga una imagen predefinida
     *
     * @static
     * @param {int} idPrenda
     * @memberof VistaOutfits
     */
    static cargarImgPrendaTorso(idPrenda) {
        let cajaImg = document.getElementById('torsoOutfit')

        if (idPrenda == '') {
            cajaImg.src = `./src/img/logo.png`
        } else {
            cajaImg.src = `src/php/imagenes_prendas/${idPrenda}.png`
        }
    }

    /**
     *Carga la imagen de una prenda de piernas o en su defecto, carga una imagen predefinida
     *
     * @static
     * @param {int} idPrenda
     * @memberof VistaOutfits
     */
    static cargarImgPrendaPiernas(idPrenda) {
        let cajaImg = document.getElementById('piernasOutfit')

        if (idPrenda == '') {
            cajaImg.src = `./src/img/logo.png`
        } else {
            cajaImg.src = `src/php/imagenes_prendas/${idPrenda}.png`
        }
    }

    /**
     *Carga la imagen de una prenda de pies o en su defecto, carga una imagen predefinida
     *
     * @static
     * @param {int} idPrenda
     * @memberof VistaOutfits
     */
    static cargarImgPrendaPies(idPrenda) {
        let cajaImg = document.getElementById('piesOutfit')

        if (idPrenda == '') {
            cajaImg.src = `./src/img/logo.png`
        } else {
            cajaImg.src = `src/php/imagenes_prendas/${idPrenda}.png`
        }
    }

    /**
     *Muestra el cuadro de diálogo con la confirmación de borrado
     *
     * @static
     * @memberof VistaOutfits
     */
    static mostrarCuadroDialogo() {
        let cuadroDialogo = document.getElementById('cuadroDialogoOutfits')
        let mensajeBorradoOutfits = document.getElementById('mensajeBorradoOutfits')
        mensajeBorradoOutfits.textContent = `¿Está seguro de que desea borrar el outfit seleccionado?`
        cuadroDialogo.style.display = 'block'

    }

    /**
     *Oculta el cuadro de diálogo con la confirmación de borrado
     *
     * @static
     * @memberof VistaOutfits
     */
    static ocultarCuadroDialogo() {
        let cuadroDialogo = document.getElementById('cuadroDialogoOutfits')
        let mensajeBorradoOutfits = document.getElementById('mensajeBorradoOutfits')
        mensajeBorradoOutfits.textContent = ``
        cuadroDialogo.style.display = 'none'
    }

    /**
     *Muestra el cuadro de mensajes y genera un mensaje
     *
     * @static
     * @param {String} mensaje
     * @memberof VistaOutfits
     */
    static mostrarMensaje(mensaje) {
        let cuadroDialogo = document.getElementById('cuadroDialogoOutfits')
        let conjuntoBorradoOutfits = document.getElementById('conjuntoBorradoOutfits')
        let bloqueMensaje = document.getElementById('cambioOutfits')
        bloqueMensaje.textContent = mensaje
        conjuntoBorradoOutfits.style.display = 'none'
        cuadroDialogo.style.display = 'block'
        bloqueMensaje.style.display = 'block'
    }

    /**
     *Oculta el cuadro de mensajes y vacía su contenido
     *
     * @static
     * @memberof VistaOutfits
     */
    static ocultarMensaje() {
        let cuadroDialogo = document.getElementById('cuadroDialogoOutfits')
        let conjuntoBorradoOutfits = document.getElementById('conjuntoBorradoOutfits')
        let bloqueMensaje = document.getElementById('cambioOutfits')
        cuadroDialogo.style.display = 'none'
        bloqueMensaje.textContent = ''
        bloqueMensaje.style.display = 'none'
        conjuntoBorradoOutfits.style.display = 'block'
    }

    //Patron Borrado
    /* for (let i = 0; i < selectOutfits.length; i++) {
        if (selectOutfits[i].childElementCount>1) {
            while (selectOutfits[i].childElementCount > 1) {
                selectOutfits[i].removeChild(selectOutfits[i].children[1])
            }
        }
    } */

}