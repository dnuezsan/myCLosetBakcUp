'use strict'
import { Controlador } from "../controlador/controlador.js";
import { VistaLogin } from "./vistaLogin.js";
import { VistaMenuPrincipal } from "./vistaMenuPrincipal.js";

/**
 *Clase que gestiona el panel del perfil de usuario de la aplicación
 *
 * @export
 * @class VistaPerfilUsuario
 */
export class VistaPerfilUsuario {


    /**
     * 
     * @param {Object} controlador
     * @param {Node} base
     * @memberof VistaPerfilUsuario
     */
    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }


    /**
     *Inicia variables y eventos al crear una instancia de la clase
     *
     * @memberof VistaPerfilUsuario
     */
    iniciar() {
        //VistaPerfilUsuario.modificarUsuario()
        let botonModifiacarUsuario = document.querySelector("#panelPerfilUsuario .section button")
        botonModifiacarUsuario.addEventListener('click', VistaPerfilUsuario.modificarUsuario)
        /* let botonBorrar = document.getElementById('borrarUsuario')
        botonBorrar.addEventListener('click', VistaPerfilUsuario.borrarUsuario) */
        VistaPerfilUsuario.modificarUsuario()
        VistaPerfilUsuario.borradoConfirmacion()
        VistaPerfilUsuario.borrarUsuario()
    }


    /**
     *Oculta el panel de perfil de usuario
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static ocultarPerfilUsuario() {
        let perfilUsuario = document.getElementById('panelPerfilUsuario')
        perfilUsuario.style.display = 'none'
        VistaPerfilUsuario.ocultarCuadroConfirmacion()
        VistaPerfilUsuario.limpiarFormulario()
        VistaPerfilUsuario.mostrarDatosUsuario()
    }


    /**
     *Muestra el panel de perfil de usuario y asigna a la variable local de "vista" el value "vistaPerfilUsuario"
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static async mostrarPerfilUsuario() {
        let perfilUsuario = document.getElementById('panelPerfilUsuario')
        perfilUsuario.style.display = 'flex'
        VistaPerfilUsuario.bloquearInputCorreo()
        await VistaPerfilUsuario.mostrarDatosUsuario()
        localStorage.setItem('vista', 'vistaPerfilUsuario')
    }


    /**
     *Configura el input de correo para que adopte el atributo "readonly" al clickar en él
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static bloquearInputCorreo() {
        let inputCorreo = document.getElementById('correoPerfil')

        inputCorreo.onclick = () => {
            inputCorreo.setAttribute('readonly', "true")
        }

    }


    /**
     *Modifica los datos del usuario y gestina los mensajes de aviso
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static modificarUsuario() {
        let botonModificarUsuario = document.querySelector("#panelPerfilUsuario .section button")
        let panelPerfilUsuario = document.getElementById('panelPerfilUsuario')
        let nombre = document.getElementById("nombrePerfil").value;
        let correo = document.getElementById("correoPerfil").value;
        let password = document.getElementById("contraseniaPerfil").value;
        let newpassword = document.getElementById("contraseniaNuevaPerfil").value;
        let rnewpassword = document.getElementById("contraseniaRepetidaPerfil").value;

        botonModificarUsuario.onclick = async (evento) => {
            
            let respuesta = null
            if (nombre == '') {
                respuesta = await Controlador.modificacionUsuario("Usuario sin nombre", correo, password, newpassword, rnewpassword)
            } else {
                respuesta = await Controlador.modificacionUsuario(nombre, correo, password, newpassword, rnewpassword)
            }

            if (respuesta.success == true) {
                VistaPerfilUsuario.actualizacionCuadroConfirmacion(respuesta.mensaje)
                panelPerfilUsuario.onclick = async (evento) => {
                    await VistaPerfilUsuario.ocultarCuadroConfirmacion()
                    location.reload()
                }
            }

            if (respuesta.success == false) {
                VistaPerfilUsuario.actualizacionCuadroConfirmacion(respuesta.mensaje)
                panelPerfilUsuario.addEventListener('click', VistaPerfilUsuario.ocultarCuadroConfirmacion, true)
            }
        }

    }

    /**
     *Muestra en pantalla los datos "nombre" y "correo" del usuario
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static async mostrarDatosUsuario() {
        let datos = await Controlador.cargarDatosUsuario()
        let inputNombre = document.getElementById('nombrePerfil')
        let inputCorreo = document.getElementById('correoPerfil')

        inputNombre.value = datos.nombreUsuario
        inputCorreo.value = datos.correo

    }


    /**
     *Borra un usuario gestiona las acciones y eventos subsecuentes al borrado
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static borrarUsuario() {
        let botonBorrarUsuario = document.getElementById('botonBorrarUsuario')
        let botonCancelar = document.getElementById('botonCancelarBorrarUsuario')
        botonBorrarUsuario.onclick = async (evento) => {
            let respuesta = await Controlador.borrarUsuario()
            if (respuesta.success == true) {
                sessionStorage.setItem('sesion', '')
                if (location.reload) {
                    localStorage.setItem('vista', VistaMenuPrincipal.ocultarPaneles())
                    localStorage.getItem('vista')
                    localStorage.setItem('vista', 'vistaPerfilUsuario')
                }
            } else {
                console.log('no se pudo eliminar la cuenta');
            }

        }

        botonCancelar.addEventListener('click', () => {
            VistaPerfilUsuario.ocultarCuadroConfirmacion()
        }
        )

    }

    /**
     *Muestra el cuadro de confirmación
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static mostrarCuadroConfirmacion() {
        let cuadro = document.getElementById('cuadroDialogoPerfilUsuario')
        cuadro.style.display = 'block'
    }

    /**
     *Oculta el cuadro de confirmación
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static ocultarCuadroConfirmacion() {
        let cuadro = document.getElementById('cuadroDialogoPerfilUsuario')
        cuadro.style.display = 'none'
    }



    /**
     *Configura el cuadro de confirmación para que sea visible y muestre un mensaje
     *
     * @static
     * @param {string} mensaje
     * @memberof VistaPerfilUsuario
     */
    static actualizacionCuadroConfirmacion(mensaje) {
        let mensajeActualizacion = document.querySelectorAll('#panelPerfilUsuario .cambio')[0]
        mensajeActualizacion.innerHTML = mensaje
        mensajeActualizacion.style.display = 'inline-block'
        VistaPerfilUsuario.mostrarCuadroConfirmacion()
    }


    /**
     *Muestra el cuadro de confirmación del borrado
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static borradoConfirmacion() {
        let mensajeBorrado = document.querySelectorAll('#panelPerfilUsuario .conjuntoBorrado')[0]
        let botonBorrado = document.querySelectorAll('#panelPerfilUsuario #borrarUsuario')[0]
        botonBorrado.onclick = (evento) => {
            mensajeBorrado.style.display = 'inline-block'
            VistaPerfilUsuario.mostrarCuadroConfirmacion()
        }
    }


    /**
     *Deja en blanco los valores del formulario
     *
     * @static
     * @memberof VistaPerfilUsuario
     */
    static limpiarFormulario() {
        let contrasenia = document.getElementById('contraseniaPerfil')
        let contraseniaNueva = document.getElementById('contraseniaNuevaPerfil')
        let contraseniaRepetida = document.getElementById('contraseniaRepetidaPerfil')

        contrasenia.value = ''
        contraseniaNueva.value = ''
        contraseniaRepetida = ''
    }

}