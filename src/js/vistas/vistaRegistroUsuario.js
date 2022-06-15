'use strict'
import { Controlador } from "../controlador/controlador.js";
import { VistaArmario } from "./vistaArmario.js";
import { VistaLogin } from "./vistaLogin.js";
import { VistaMenuPrincipal } from "./vistaMenuPrincipal.js";

/**
 *Clase con los componentes del panel de registro de la aplicación
 *
 * @export
 * @class VistaRegistroUsuario
 */
export class VistaRegistroUsuario {


    /**
     * @constructor
     *
     * @param {Object} controlador
     * @param {Node} base
     * @memberof VistaRegistroUsuario
     */
    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }


    /**
     *Prepara eventos y variables
     *
     * @memberof VistaRegistroUsuario
     */
    iniciar() {
        let resgistro = document.querySelector('#panelRegistro .section span')
        resgistro.addEventListener('click', this.mostrarLogin)

        VistaRegistroUsuario.registroIntro()

        let botonRegistro = document.querySelector("#panelRegistro .section button")
        botonRegistro.addEventListener('click', VistaRegistroUsuario.registrarUsuario)

    }


    /**
     *Muestra la vista del login
     *
     * @memberof VistaRegistroUsuario
     */
    mostrarLogin() {
        let panelLogin = document.getElementById('panelLogin')
        panelLogin.style.display = 'flex'
        VistaRegistroUsuario.esconderRegistro()
        localStorage.setItem('vista', 'vistaLogin')
    }


    /**
     *Muestra el panel de registro
     *
     * @static
     * @memberof VistaRegistroUsuario
     */
    static mostrarRegistro() {
        let panelRegistro = document.getElementById('panelRegistro')
        panelRegistro.style.display = 'flex'
        localStorage.setItem('vista', 'vistaRegistro')

    }


    /**
     *Oculta la vista del registro de usuario
     *
     * @static
     * @memberof VistaRegistroUsuario
     */
    static esconderRegistro() {
        let panelRegistro = document.getElementById('panelRegistro')
        panelRegistro.style.display = 'none'
        VistaRegistroUsuario.limpiarInputs()
        VistaRegistroUsuario.limpiarMensaje()
    }


    /**
     *Ejecuta el método del controlador para registrar un usuario y devuelve un mensaje en caso de ser necesario o dirige al inicio si todo fue correcto
     *
     * @static
     * @memberof VistaRegistroUsuario
     */
    static async registrarUsuario() {
        let nombre = document.getElementById("nombre").value;
        let correo = document.getElementById("correoRegistro").value;
        let password = document.getElementById("password").value;
        let rpassword = document.getElementById("rpassword").value;
        let casilla = document.getElementById('aceptarPoliticaPrivacidad').checked
        if (password != rpassword) {
            let mensaje = document.querySelectorAll('#panelRegistro .mensajeLabel')[0]
            mensaje.innerHTML = "Las contraseñas no coinciden"
        }else{
            
            let respuesta = await Controlador.registraUsuario(nombre, correo, password, rpassword, casilla);

        if (respuesta.success) {
            VistaRegistroUsuario.esconderRegistro()
            VistaLogin.mostrarLogin()
        } else {
            let mensaje = document.querySelectorAll('#panelRegistro .mensajeLabel')[0]
            mensaje.innerHTML = respuesta.mensaje
        }
        }
        

    }


    /**
     *Genera un evento para registrar un usuario cuando se pulsa intro en un input de la vista
     *
     * @static
     * @memberof VistaRegistroUsuario
     */
    static registroIntro() {

        let inputs = document.querySelectorAll('#panelRegistro .section input')

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].onkeydown = (evento) => {
                if (evento.key === "Enter") {
                    VistaRegistroUsuario.registrarUsuario()
                }
            }

        }

    }


    /**
     *Elimina el contenido de los mensajes del registro
     *
     * @static
     * @memberof VistaRegistroUsuario
     */
    static limpiarMensaje(){
        let mensaje = document.querySelectorAll('#panelRegistro .mensajeLabel')[0]
            mensaje.innerHTML = ''
    }

    /**
     *Elimina el contenido de los inputs del registro
     *
     * @static
     * @memberof VistaRegistroUsuario
     */
    static limpiarInputs(){
        let inputs = document.querySelectorAll('#panelRegistro input')
        inputs.forEach(input => {
            input.value = ''
        })  
    }

}