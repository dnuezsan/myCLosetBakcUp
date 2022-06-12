'use strict'

import { Controlador } from "../controlador/controlador.js"

export class VistaOutfits {

    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }

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

    static mostrarOutfits() {
        let panel = document.getElementById('panelOutfit')
        panel.style.display = 'flex'
        localStorage.setItem('vista', 'vistaOutfits')
    }

    static ocultarOutfits() {
        let panel = document.getElementById('panelOutfit')
        panel.style.display = 'none'
        VistaOutfits.limpiarFormulario()
    }

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

    static limpiarOutfit() {
        let botones = document.getElementsByClassName('botonNuevoOutfit')

        for (let i = 0; i < botones.length; i++) {
            botones[i].addEventListener('click', VistaOutfits.limpiarFormulario, true)
        }

    }

    /* ADAPTARLOS Y LUEGO UTILIZAR EN CRUDOUTFITS */
    static async insertarOutfit(idPrenda, nombreOutfit) {
        let outfit = document.getElementsByClassName('outfitCargado')

        for (let i = 0; i < outfit.length; i++) {
            if (outfit[i].value == '') {
                if (outfit[i].value != '') {
                    let respuesta = await Controlador.insertarOutfit(idPrenda, nombreOutfit)
                    if (!respuesta.success) {
                        console.log('error');
                    } else {
                        location.reload()
                    }
                }
            }
        }
    }

    /* ADAPTARLO Y LUEGO UTILIZAR EN CRUDOUTFITS */
    static async modificarOutfit() {
        let outfit = document.getElementsByClassName('outfitCargado')

        for (let i = 0; i < outfit.length; i++) {
            if (outfit[i].value != '') {
                if (outfit[i].value != '') {
                    let respuesta = await Controlador.modificarOutfit(outfit[i].value)
                    if (!respuesta.success) {
                        console.log('error');
                    } else {
                        location.reload()
                    }
                }
            }
        }
    }
    /* ADAPTARLOS Y LUEGO UTILIZAR EN CRUDOUTFITS */
    static async borrarOutfit() {
        let outfit = document.getElementsByClassName('outfitCargado')

        for (let i = 0; i < outfit.length; i++) {
            if (outfit[i].value != '') {
                let respuesta = await Controlador.borrarOutfit(outfit[i].value)
                if (!respuesta.success) {
                    console.log('error');
                } else {
                    location.reload()
                }
            }
        }
    }

    static async cargarOutfits() {
        let selectOutfits = document.getElementsByClassName('outfitCargado')

        let outfits = await Controlador.cargaOutfits()

        for (let i = 0; i < outfits.length; i++) {

            VistaOutfits.generarOptionOutfit(outfits[i], selectOutfits[0])
            VistaOutfits.generarOptionOutfit(outfits[i], selectOutfits[1])

        }

        $('.outfitCargado').formSelect()
    }

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

    static generarOptionOutfit(datos, nodoPadre) {
        let opcion = document.createElement('option')
        //opcion.classList.add('prendaCabeza')

        opcion.value = datos.idOutfit
        opcion.textContent = datos.nombreOutfit
        nodoPadre.appendChild(opcion)
    }

    static generarOptionPrenda(datos, nodoPadre) {
        let opcion = document.createElement('option')
        //opcion.classList.add('prendaCabeza')

        opcion.value = datos.idPrenda
        opcion.textContent = `${datos.nombreSubcategoria} - ${datos.nombrePrenda}`
        nodoPadre.appendChild(opcion)
    }

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

    static async cargarPrendasCabezaOutfit() {
        let outfitCargado = document.getElementsByClassName('outfitCargado')
        let prendaCabeza = document.getElementsByClassName('prendaCabezaOutfit')

        let prendaCabezaOutfit = null
        let idOutfit = null
        for (let i = 0; i < outfitCargado.length; i++) {
            idOutfit = outfitCargado[i].value
            prendaCabezaOutfit = await Controlador.cargarPrendasCabezaOutfit(idOutfit)
            prendaCabeza[i].value = prendaCabezaOutfit[0].idPrenda
            $('.prendaCabezaOutfit').formSelect()
            return prendaCabeza[i].value
        }
    }

    static async cargarPrendasTorsoOutfit() {
        let outfitCargado = document.getElementsByClassName('outfitCargado')
        let prendaTorso = document.getElementsByClassName('prendaTorsoOutfit')

        let prendaTorsoOutfit = null
        let idOutfit = null
        for (let i = 0; i < outfitCargado.length; i++) {
            idOutfit = outfitCargado[i].value
            prendaTorsoOutfit = await Controlador.cargarPrendasTorsoOutfit(idOutfit)
            prendaTorso[i].value = prendaTorsoOutfit[0].idPrenda
            $('.prendaTorsoOutfit').formSelect()
            return prendaTorso[i].value
        }
    }

    static async cargarPrendasPiernasOutfit() {
        let outfitCargado = document.getElementsByClassName('outfitCargado')
        let prendaPiernas = document.getElementsByClassName('prendaPiernasOutfit')

        let prendaPiernasOutfit = null
        let idOutfit = null
        for (let i = 0; i < outfitCargado.length; i++) {
            idOutfit = outfitCargado[i].value
            prendaPiernasOutfit = await Controlador.cargarPrendasPiernasOutfit(idOutfit)
            prendaPiernas[i].value = prendaPiernasOutfit[0].idPrenda
            $('.prendaPiernasOutfit').formSelect()
            return prendaPiernas[i].value
        }
    }

    static async cargarPrendasPiesOutfit() {
        let outfitCargado = document.getElementsByClassName('outfitCargado')
        let prendaPies = document.getElementsByClassName('prendaPiesOutfit')

        let prendaPiesOutfit = null
        let idOutfit = null
        for (let i = 0; i < outfitCargado.length; i++) {
            idOutfit = outfitCargado[i].value
            prendaPiesOutfit = await Controlador.cargarPrendasPiesOutfit(idOutfit)
            prendaPies[i].value = prendaPiesOutfit[0].idPrenda
            $('.prendaPiesOutfit').formSelect()
            return prendaPies[i].value
        }
    }

    //ACABAR METODO
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
        let respuestaCabeza = null
        let respuestaTorso = null
        let respuestaPiernas = null
        let respuestaPies = null

        for (let i = 0; i < 2; i++) {
            botonInsertar[i].onclick = async () => {

                //Metodos de inserción con mensajes
                if (outfitsCargados[i].value == "") {
                    if (nombreOufit[i].value == '') {
                        try {
                            respuestaCabeza = await Controlador.insertarOutfit(selectCabeza[i].value, 'Outfit sin nombre')
                            respuestaTorso = await Controlador.insertarOutfit(selectTorso[i].value, 'Outfit sin nombre')
                            respuestaPiernas = await Controlador.insertarOutfit(selectPiernas[i].value, 'Outfit sin nombre')
                            respuestaPies = await Controlador.insertarOutfit(selectPies[i].value, 'Outfit sin nombre')
                            if (!respuestaCabeza.success && !respuestaTorso.success && !respuestaPiernas.success && !respuestaPies.success) {
                                VistaOutfits.mostrarMensaje(respuestaCabeza.mensaje)

                            } else if (!respuestaCabeza.success) {
                                VistaOutfits.mostrarMensaje('No se pudo insertar su prenda de cabeza en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else if (!respuestaTorso.success) {
                                VistaOutfits.mostrarMensaje('No se pudo insertar su prenda del torso en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else if (!respuestaPiernas.success) {
                                VistaOutfits.mostrarMensaje('No se pudo insertar su prenda de las piernas en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else if (!respuestaPies.success) {
                                VistaOutfits.mostrarMensaje('No se pudo insertar su prenda de los pies en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            }
                            location.reload()
                        } catch (error) {
                            console.error(error);
                        }
                    } else {
                        try {
                            respuestaCabeza = await Controlador.insertarOutfit(selectCabeza[i], nombreOufit[i].value)
                            respuestaTorso = await Controlador.insertarOutfit(selectTorso[i].value, nombreOufit[i].value)
                            respuestaPiernas = await Controlador.insertarOutfit(selectPiernas[i].value, nombreOufit[i].value)
                            respuestaPies = await Controlador.insertarOutfit(selectPies[i].value, nombreOufit[i].value)
                            if (!respuestaCabeza.success && !respuestaTorso.success && !respuestaPiernas.success && !respuestaPies.success) {
                                VistaOutfits.mostrarMensaje(respuestaCabeza.mensaje)

                            } else if (!respuestaCabeza.success) {
                                VistaOutfits.mostrarMensaje('No se pudo insertar su prenda de cabeza en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else if (!respuestaTorso.success) {
                                VistaOutfits.mostrarMensaje('No se pudo insertar su prenda del torso en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else if (!respuestaPiernas.success) {
                                VistaOutfits.mostrarMensaje('No se pudo insertar su prenda de las piernas en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else if (!respuestaPies.success) {
                                VistaOutfits.mostrarMensaje('No se pudo insertar su prenda de los pies en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            }
                            location.reload()
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
                    let prendaPiernasOutfit = await Controlador.cargarPrendasPiesOutfit(idOutfit)
                    let prendaPiesOutfit = await Controlador.cargarPrendasPiesOutfit(idOutfit)
                    if (nombreOufit[i].value == '') {
                        try {
                            respuestaCabeza = await Controlador.modificarOutfit(prendaCabezaOutfit[0].idPrenda, selectCabeza[i].value, outfitsCargados[i].value, 'Outfit sin nombre')
                            respuestaTorso = await Controlador.modificarOutfit(prendaTorsoOutfit[0].idPrenda, selectTorso[i].value, outfitsCargados[i].value, 'Outfit sin nombre')
                            respuestaPiernas = await Controlador.modificarOutfit(prendaPiernasOutfit[0].idPrenda, selectPiernas[i].value, outfitsCargados[i].value, 'Outfit sin nombre')
                            respuestaPies = await Controlador.modificarOutfit(prendaPiesOutfit[0].idPrenda, selectPies[i].value, outfitsCargados[i].value, 'Outfit sin nombre')
                            if (!respuestaCabeza.success && !respuestaTorso.success && !respuestaPiernas.success && !respuestaPies.success) {
                                VistaOutfits.mostrarMensaje(respuestaCabeza.mensaje)

                            } else if (!respuestaCabeza.success) {
                                VistaOutfits.mostrarMensaje('No se pudo modificar su prenda de cabeza en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else if (!respuestaTorso.success) {
                                VistaOutfits.mostrarMensaje('No se pudo modificar su prenda del torso en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else if (!respuestaPiernas.success) {
                                VistaOutfits.mostrarMensaje('No se pudo modificar su prenda de las piernas en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else if (!respuestaPies.success) {
                                VistaOutfits.mostrarMensaje('No se pudo modificar su prenda de los pies en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            }
                            location.reload()
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    else {
                        try {
                            respuestaCabeza = await Controlador.modificarOutfit(prendaCabezaOutfit[0].idPrenda, selectCabeza[i].value, outfitsCargados[i].value, nombreOufit[i].value)
                            respuestaTorso = await Controlador.modificarOutfit(prendaTorsoOutfit[0].idPrenda, selectTorso[i].value, outfitsCargados[i].value, nombreOufit[i].value)
                            respuestaPiernas = await Controlador.modificarOutfit(prendaPiernasOutfit[0].idPrenda, selectPiernas[i].value, outfitsCargados[i].value, nombreOufit[i].value)
                            respuestaPies = await Controlador.modificarOutfit(prendaPiesOutfit[0].idPrenda, selectPies[i].value, outfitsCargados[i].value, nombreOufit[i].value)
                            if (!respuestaCabeza.success && !respuestaTorso.success && !respuestaPiernas.success && !respuestaPies.success) {
                                VistaOutfits.mostrarMensaje(respuestaCabeza.mensaje)
                            } else if (!respuestaCabeza.success) {
                                VistaOutfits.mostrarMensaje('No se pudo modificar su prenda de cabeza en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else if (!respuestaTorso.success) {
                                VistaOutfits.mostrarMensaje('No se pudo modificar su prenda del torso en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else if (!respuestaPiernas.success) {
                                VistaOutfits.mostrarMensaje('No se pudo modificar su prenda de las piernas en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            } else if (!respuestaPies.success) {
                                VistaOutfits.mostrarMensaje('No se pudo modificar su prenda de los pies en el outfit')
                                panel.onclick = () => { VistaOutfits.ocultarMensaje() }
                            }
                            location.reload()
                        } catch (error) {
                            console.log(error);
                        }
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

    static detectarCambiosSelectYCargar() {
        let outfitsCargados = document.getElementsByClassName('outfitCargado')
        for (let i = 0; i < outfitsCargados.length; i++) {
            console.log('CAMBIAR EN ESTE METODO PARA AÑADIR IMAGENES')
            outfitsCargados[i].addEventListener('change', async () => {
                await VistaOutfits.cargarNombreOutfit(outfitsCargados[i].value)

                VistaOutfits.cargarImgPrendaCabeza(await VistaOutfits.cargarPrendasCabezaOutfit())

                VistaOutfits.cargarImgPrendaTorso(await VistaOutfits.cargarPrendasTorsoOutfit())

                VistaOutfits.cargarImgPrendaPiernas(await VistaOutfits.cargarPrendasPiernasOutfit())

                VistaOutfits.cargarImgPrendaPies(await VistaOutfits.cargarPrendasPiesOutfit())
            }, true)
        }
        $('#panelOutfit select').formSelect()
    }

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
                VistaOutfits.cargarImgPrendaCabeza(selectCabeza[j].value)
                console.log(valor);

            }
            selectTorso[i].onchange = () => {
                valor = selectTorso[i].value
                for (let j = 0; j < selectTorso.length; j++) {
                    selectTorso[j].value = valor
                }
                console.log(valor);
                VistaOutfits.cargarImgPrendaTorso(valor)
            }
            selectPiernas[i].onchange = () => {
                valor = selectPiernas[i].value
                for (let j = 0; j < selectPiernas.length; j++) {
                    selectPiernas[j].value = valor
                }
                console.log(valor);
                VistaOutfits.cargarImgPrendaPiernas(valor)
            }
            selectPies[i].onchange = () => {
                valor = selectPies[i].value
                for (let j = 0; j < selectPies.length; j++) {
                    selectPies[j].value = valor
                }
                console.log(valor);
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

    static cargarImgPrendaCabeza(idPrenda) {
        let cajaImg = document.getElementById('cabezaOutfit')

        if (idPrenda == '') {
            cajaImg.src = `./src/img/logo.png`
        } else {
            cajaImg.src = `src/php/imagenes_prendas/${idPrenda}.png`
        }
    }

    static cargarImgPrendaTorso(idPrenda) {
        let cajaImg = document.getElementById('torsoOutfit')

        if (idPrenda == '') {
            cajaImg.src = `./src/img/logo.png`
        } else {
            cajaImg.src = `src/php/imagenes_prendas/${idPrenda}.png`
        }
    }

    static cargarImgPrendaPiernas(idPrenda) {
        let cajaImg = document.getElementById('piernasOutfit')

        if (idPrenda == '') {
            cajaImg.src = `./src/img/logo.png`
        } else {
            cajaImg.src = `src/php/imagenes_prendas/${idPrenda}.png`
        }
    }

    static cargarImgPrendaPies(idPrenda) {
        let cajaImg = document.getElementById('piesOutfit')

        if (idPrenda == '') {
            cajaImg.src = `./src/img/logo.png`
        } else {
            cajaImg.src = `src/php/imagenes_prendas/${idPrenda}.png`
        }
    }

    static mostrarCuadroDialogo() {
        let cuadroDialogo = document.getElementById('cuadroDialogoOutfits')
        let mensajeBorradoOutfits = document.getElementById('mensajeBorradoOutfits')
        mensajeBorradoOutfits.textContent = `¿Está seguro de que desea borrar el outfit seleccionado?`
        cuadroDialogo.style.display = 'block'

    }

    static ocultarCuadroDialogo() {
        let cuadroDialogo = document.getElementById('cuadroDialogoOutfits')
        let mensajeBorradoOutfits = document.getElementById('mensajeBorradoOutfits')
        mensajeBorradoOutfits.textContent = ``
        cuadroDialogo.style.display = 'none'
    }

    static mostrarMensaje(mensaje) {
        let cuadroDialogo = document.getElementById('cuadroDialogoOutfits')
        let conjuntoBorradoOutfits = document.getElementById('conjuntoBorradoOutfits')
        let bloqueMensaje = document.getElementById('cambioOutfits')
        bloqueMensaje.textContent = mensaje
        conjuntoBorradoOutfits.style.display = 'none'
        cuadroDialogo.style.display = 'block'
        bloqueMensaje.style.display = 'block'
    }

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