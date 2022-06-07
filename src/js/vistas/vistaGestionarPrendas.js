'use strict'

import { Controlador } from "../controlador/controlador.js"

export class VistaGestionarPrendas {

    constructor(controlador, base) {
        this.controlador = controlador
        this.base = base
        this.iniciar()
    }

    iniciar() {
        this.cargarFoto()
        this.activarVideo()
        VistaGestionarPrendas.cargarCategoriasYSubcategorias()
    }

    /**
     *Muestra panelGestionPrendas y asigna a la variable de localStorage "vista" el valor "vistaGestionPrendas"
     *
     * @static
     * @memberof VistaGestionarPrendas
     */
    static mostrarGestionarPrendas() {
        let panel = document.getElementById('panelGestionPrendas')
        panel.style.display = 'flex'
        localStorage.setItem('vista', 'vistaGestionarPrendas')
    }

    /**
     *Oculta la vista "panelGestionPrendas" y cierra la cámara y el modal en caso de cambiar de vista
     *
     * @static
     * @memberof VistaGestionarPrendas
     */
    static ocultarGestionarPrendas() {
        let video = document.getElementById('elementoVideoGestionPrendas')
        let panel = document.getElementById('panelGestionPrendas')
        let imagen = document.getElementById('img-cropperGestion')
        panel.style.display = 'none'
        if (video.srcObject != null) {
            VistaGestionarPrendas.cambioDePanelApagar()
        }
        if (imagen.src != null) {
            VistaGestionarPrendas.cambioDePanelCerrarModal()
        }

        VistaGestionarPrendas.limpiarFormulario()
    }

    /**
     *Llama al método que activa la cámara y muestra el panel de video
     *
     * @memberof VistaGestionarPrendas
     */
    activarVideo() {
        /* let snapshot = document.getElementById('snapshotGestionFotos') */
        let snapshot = document.querySelectorAll('.snapshotGestionFotos')
        /* let snapshot = document.getElementById('snapshotGestionFotos') */
        let video = document.getElementById('cajaVideoGestionPrenda')

        snapshot.forEach(icono => {
            icono.onclick = (evento) => {
                video.style.display = 'inline-block'
                this.desaparecerIcono()
                this.realizarVideo()
            }
        })

        /* snapshot.onclick = (evento) => {
            video.style.display = 'inline-block'
            this.realizarVideo()
        } */
    }


    /**
     *Habilita un flujo para grabar, lo asocia a la etiqueta video, e implementa los metodos para capturar una imagen o cerrar el video y el flujo
     *
     * @memberof VistaGestionarPrendas
     */
    realizarVideo() {
        let video = document.getElementById('elementoVideoGestionPrendas')
        navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment'

            },
        })
            .then(
                (flujo) => {
                    video.srcObject = flujo
                    let mediaStream = video.srcObject
                    /*let tracks = mediaStream.getTracks()
                    tracks[0].stop() */

                    let medio = video.srcObject

                    /* Captura una imagen del video */
                    this.tomarInstantanea(video, mediaStream)

                    /* detiene el video */
                    this.cerrarVideo(video, mediaStream)

                }
            ).catch((error) => {
                let videoCaja = document.getElementById('cajaVideoGestionPrenda')
                videoCaja.style.display = 'none'
                console.log(error);
            })

    }


    /**
     *Configura el canvas, dibuja una instantánea del vídeo en este y transmite el resultado al recortador tras apagar la cámara
     *
     * @param {DOM element} video
     * @param {stream} mediaStream
     * @memberof VistaGestionarPrendas
     */
    tomarInstantanea(video, mediaStream) {
        let boton = document.getElementById('capturaGestionPrenda')
        let img = document.getElementById('crop-imageGestion')
        let input = document.getElementById('base64GestionPrenda')

        boton.onclick = () => {
            let canvas = document.getElementById('canvasGestionPrenda')
            let contexto = canvas.getContext('2d')

            /* SOLUCION. USAR CROPPER */
            /* Para que la imagen de canvas tenga altura = anchura usar siguiente linea. Problema relacion de aspecto hace que imagen se vea como presionada*/
            /* video.height = video.width */

            /* Las siquientes lineas son para que la resolucion del canvas se ajuste a la de la camara
            y la imagen se vea con buena relacion de aspecto. problema la imagen no puede formar un circulo perfecto*/
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            contexto.drawImage(video, 0, 0, canvas.width, canvas.height)
            //let imagen = canvas.toDataURL("imagen/jpg")
            /* Se carga la imagen en la etiqueta imagen*/
            //img.src = imagen
            /* Se carga el valor en base64 en el input */
            /* input.value = imagen*/
            this.cerrarVideoApagarCamara(video, mediaStream)
            this.cargarFotoVideo(canvas)
        }
    }


    /**
     *Oculta la etiqueta de video y llama al método que detiene el flujo de la cámara y de la etiqueta video
     *
     * @param {DOM element} video
     * @param {stream} mediaStream
     * @memberof VistaGestionarPrendas
     */
    cerrarVideo(video, mediaStream) {
        let boton = document.getElementById('cerrarVideoGestionPrenda')
        boton.onclick = (evento) => {
            let videoCaja = document.getElementById('cajaVideoGestionPrenda')
            videoCaja.style.display = 'none'

            this.cerrarVideoApagarCamara(video, mediaStream)
        }
    }

    /**
     *Detiene el flujo de la etiqueta video y oculta la caja que contiene la etiqueta de video y sus botones
     *
     * @param {DOM element} video
     * @param {stream} mediaStream
     * @memberof VistaGestionarPrendas
     */
    cerrarVideoApagarCamara(video, mediaStream) {
        let videoCaja = document.getElementById('cajaVideoGestionPrenda')
        let tracks = mediaStream.getTracks()
        tracks.forEach(track => {
            track.stop()
            this.aparecerIcono()
        })

        video.srcObject = null

        videoCaja.style.display = 'none'
    }

    /**
     *Detiene el flujo de la cámara
     *
     * @static
     * @memberof VistaGestionarPrendas
     */
    static cambioDePanelApagar() {
        let video = document.getElementById('elementoVideoGestionPrendas')
        let videoCaja = document.getElementById('cajaVideoGestionPrenda')
        //se corta el flujo

        let tracks = video.srcObject.getTracks()
        tracks.forEach(track => {
            track.stop()
            VistaGestionarPrendas.aparecerIcono()
            videoCaja.style.display = 'none'
            video.srcObject = null
        })

    }

    /**
     *oculta el panel de recorte y limpia su contenido
     *
     * @static
     * @memberof VistaGestionarPrendas
     */
    static cambioDePanelCerrarModal() {
        let modal = document.getElementsByClassName('modal')[1]
        let modalContent = document.getElementsByClassName('modal-content')[1]
        let inputFoto = document.getElementById('imagenGestionPrenda')
        let imagen = document.getElementById('img-cropperGestion')
        imagen.src = ''
        inputFoto.value = ''

        modal.className = 'modal remove'
        modalContent.className = 'modal-content remove'
    }

    /* Recortar imagen de galeria */

    /**
     *Configura y prepara la caja de recorte para recibir una imagen y manipularla
     *
     * @memberof VistaGestionarPrendas
     */
    cargarFoto() {
        let cropper = null
        let inputFoto = document.getElementById('imagenGestionPrenda')
        let modal = document.getElementsByClassName('modal')[1]
        let modalContent = document.getElementsByClassName('modal-content')[1]
        inputFoto.onchange = (evento) => {
            let imagen = document.getElementById('img-cropperGestion')

            let archivos = inputFoto.files
            //Recorta la extensión del archvo
            let extensiones = inputFoto.value.substring(inputFoto.value.lastIndexOf('.'), inputFoto.value.lenght)
            if (archivos == null) {
                imagen.src = ''
                inputFoto.value = ''
            } else if (inputFoto.getAttribute('accept').split(',').indexOf(extensiones) < 0) {
                alert('Debes seleccionar una imagen')
                inputFoto.value = ''
            } else {
                let imagenUrl = URL.createObjectURL(archivos[0])
                console.log(imagenUrl);
                imagen.src = imagenUrl /*  = 'src/img/armario_vertical.jpg' */
                cropper = new Cropper(imagen, {
                    aspectRatio: 1, //es como queremos que recorte
                    preview: '.img-sample', //contenedor donde se va a ir viendo en tiempo real la imagen cortada
                    zoomable: false, //Para que no haga zoom
                    viewMode: 1, //Para que no estire la imagen del contenedor
                    responsive: false, //Para que no reacomode con zoom la imagen al contenedor
                    dragMode: 'none', // Para que al arrastrar no haga nada
                    ready() { //cropper-container es un clase nativ de cropper.js
                        document.querySelector('.cropper-container').style.width = '100%'
                        document.querySelector('.cropper-container').style.height = '100%'
                    }
                })

                modal.className = 'modal active'
                modalContent.className = 'modal-content active'
                console.log(cropper)
                this.cerrarModal(cropper)
                this.recortarFoto(cropper)

            }
        }
    }

    /**
     *Carga la imagen del video en el panel de recorte
     *
     * @param {canvas} canvas
     * @memberof VistaGestionarPrendas
     */
    cargarFotoVideo(canvas) {
        let panel = document.getElementById('panelGestionPrendas')
        let panelDisplay = panel.getAttribute('style')
        let cropper = null
        //let inputFoto = document.getElementById('imagenPrenda')
        let modal = document.getElementsByClassName('modal')[1]
        let modalContent = document.getElementsByClassName('modal-content')[1]
        let imagen = document.getElementById('img-cropperGestion')


        imagen.src = canvas.toDataURL('imagen/png')

        cropper = new Cropper(imagen, {
            aspectRatio: 1, //es como queremos que recorte
            preview: '.img-sample', //contenedor donde se va a ir viendo en tiempo real la imagen cortada
            zoomable: false, //Para que no haga zoom
            viewMode: 1, //Para que no estire la imagen del contenedor
            responsive: false, //Para que no reacomode con zoom la imagen al contenedor
            dragMode: 'none', // Para que al arrastrar no haga nada
            ready() { //cropper-container es un clase nativ de cropper.js
                document.querySelector('.cropper-container').style.width = '100%'
                document.querySelector('.cropper-container').style.height = '100%'
            }
        })

        modal.className = 'modal active'
        modalContent.className = 'modal-content active'
        console.log(cropper)
        this.cerrarModal(cropper)
        this.recortarFoto(cropper)
    }

    /**
     *Vacía la caja de recorte
     *
     * @param {Object} cropper
     * @memberof VistaGestionarPrendas
     */
    cerrarModal(cropper) {
        let modal = document.getElementsByClassName('modal')[1]
        let modalContent = document.getElementsByClassName('modal-content')[1]
        let boton = document.getElementById('closeGestion')
        let inputFoto = document.getElementById('imagenGestionPrenda')

        boton.onclick = (evento) => {
            let imagen = document.getElementById('img-cropperGestion')
            imagen.src = ''
            inputFoto.value = ''

            cropper.destroy()

            modal.className = 'modal remove'
            modalContent.className = 'modal-content remove'
        }
    }

    /**
     *Recorta una imagen del canvas, la muestra, pasa al input correspondiente, y vacia la caja de recorte de imagen
     *
     * @param {Object} cropper
     * @memberof VistaGestionarPrendas
     */
    recortarFoto(cropper) {

        let modal = document.getElementsByClassName('modal')[1]
        let modalContent = document.getElementsByClassName('modal-content')[1]
        let boton = document.getElementById('cutGestion')
        let inputFoto = document.getElementById('imagenGestionPrenda')
        let inputText = document.getElementById('base64GestionPrenda')

        boton.onclick = (evento) => {
            let cropImagen = document.getElementById('crop-imageGestion')
            /* Obtiene la imagen */
            let canvas = cropper.getCroppedCanvas()

            /* Se inserta la imagen obtenida en el canvas en el img */
            /* canvas.toBlob(function (blob) {
                let url = URL.createObjectURL(blob)
                console.log(cropImagen);
                cropImagen.src = url
                console.log(url);
                inputText.value = url
                console.log(inputText.value);
            }) */
            /* Insercion de la imagen en el div y el input */
            let imagenCanvas = canvas.toDataURL('imagen/png')
            console.log(imagenCanvas)
            cropImagen.src = imagenCanvas
            inputText.value = imagenCanvas
            console.log(inputText.value);

            let imagen = document.getElementById('img-cropper')

            imagen.src = ''
            inputFoto.value = ''

            cropper.destroy()

            modal.className = 'modal remove'
            modalContent.className = 'modal-content remove'
        }
    }

    /**
     *Hace desaparecer los iconos para activar el video
     *
     * @memberof VistaGestionarPrendas
     */
    desaparecerIcono() {
        let iconos = document.getElementsByClassName("iconoGestionPrenda")

        iconos[2].style.display = 'none'
        iconos[3].style.display = 'none'
    }

    /**
     *Hace aparecer los iconos para activar el video
     *
     * @memberof VistaGestionarPrendas
     */
    aparecerIcono() {
        let iconos = document.getElementsByClassName("iconoGestionPrenda")

        iconos[2].style.display = 'block'
        iconos[3].style.display = 'block'
    }

    /**
     *Hace desaparecer los iconos para activar el video
     *
     * @static
     * @memberof VistaGestionarPrendas
     */
    static desaparecerIcono() {
        let iconos = document.getElementsByClassName("iconoGestionPrenda")

        iconos[2].style.display = 'none'
        iconos[3].style.display = 'none'
    }

    /**
     *Hace aparecer los iconos para activar el video
     *
     * @static
     * @memberof VistaGestionarPrendas
     */
    static aparecerIcono() {
        let iconos = document.getElementsByClassName("iconoGestionPrenda")

        iconos[2].style.display = 'block'
        iconos[3].style.display = 'block'
    }

    static limpiarFormulario() {

        let inputs = document.querySelectorAll('#panelGestionPrendas input')
        let selectores = document.querySelectorAll('#panelGestionPrendas select')
        let img = document.getElementById('crop-imageGestion')

        img.src = "src/img/mi-armario-subir-prenda/subir-prenda-prueba.jpg"

        inputs.forEach(input => {
            input.value = ''
        })

        selectores.forEach(selector => {
            selector.value = ''
        });

    }

    static async cargarCategoriasYSubcategorias() {
        let selectCategorias = document.getElementById('categoriasGestionPrendas')
        let selectSubcategorias = document.getElementById('subCategoriasGestionPrendas')
        let selectCategoriaModificable = document.getElementById('categoriaPrendaGestionPrendas')
        let selectSubcategoriaModificable = document.getElementById('subCategoriasPrendaGestionPrendas')
        let selectNombrePrendaModificable = document.getElementById('nombrePrendaGestionPrendas')
        /* Se cargan las categorias */
        let categorias = await Controlador.cargarCategoriasPrendas()

        /* Se generan las categorias en su select */
        for (let i = 0; i < categorias.length; i++) {
            VistaGestionarPrendas.cargaCategorias(categorias[i], i, selectCategorias)
            VistaGestionarPrendas.cargaCategorias(categorias[i], i, selectCategoriaModificable)
        }
        /* Se generan las subcategorias correspondientes a la categoría elegida cada vez que esta cambia */
        selectCategorias.addEventListener('change', async () => {
            let subcategorias = await Controlador.cargarSubcategoriasPrendas(selectCategorias.value)
            let opciones = document.querySelectorAll('#subCategoriasGestionPrendas option')
            /* Se borran las subcategorias anteriores */
            if (opciones.length > 1) {
                let listaSubcategorias = document.getElementsByClassName('subcategoriaGestionPrendas')

                while (listaSubcategorias.length > 0) {
                    selectSubcategorias.removeChild(listaSubcategorias[0])
                }
            }
            /* Se cargan las nuevas subcategorias */
            for (let i = 0; i < subcategorias.length; i++) {
                VistaGestionarPrendas.cargaSubCategorias(subcategorias[i], selectSubcategorias)
            }
            $('#subCategoriasGestionPrendas').formSelect()
        })
        /* Método optimizado en relación al resto de carga dinámica de categorias */
        selectCategoriaModificable.addEventListener('change', async () => {
            let subcategorias = await Controlador.cargarSubcategoriasPrendas(selectCategoriaModificable.value)
            if (selectSubcategoriaModificable.childElementCount > 1) {
                while (selectSubcategoriaModificable.children.length > 1) {
                    selectSubcategoriaModificable.removeChild(selectSubcategoriaModificable.children[1])
                }
            }
            for (let i = 0; i < subcategorias.length; i++) {
                VistaGestionarPrendas.cargaSubCategorias(subcategorias[i], selectSubcategoriaModificable)
            }
            $('#subCategoriasPrendaGestionPrendas').formSelect()
        })

        selectSubcategoriaModificable.addEventListener('change', async () => {
            let subcategorias = await Controlador.cargarNombresPrendas(selectSubcategoriaModificable.value)
            if (selectNombrePrendaModificable.childElementCount > 1) {
                while (selectNombrePrendaModificable.children.length > 1) {
                    selectNombrePrendaModificable.removeChild(selectNombrePrendaModificable.children[1])
                }
            }
            for (let i = 0; i < subcategorias.length; i++) {
                VistaGestionarPrendas.cargaNombresPrendas(subcategorias[i], selectNombrePrendaModificable)
            }
            $('#nombrePrendaGestionPrendas').formSelect()
        })

        $('#categoriasGestionPrendas').formSelect()
        $('#categoriaPrendaGestionPrendas').formSelect()
    }



    static cargaCategorias(datos, iterador, nodoPadre) {
        let categoria = document.createElement('option')
        let valor = iterador + 1

        categoria.value = valor
        categoria.textContent = datos[valor]

        nodoPadre.appendChild(categoria)
    }

    static cargaSubCategorias(datos, nodoPadre) {

        let subCategoria = document.createElement('option')
        subCategoria.classList.add('subcategoriaGestionPrendas')

        subCategoria.value = datos.idSubcategoria
        subCategoria.textContent = datos.nombreSubcategoria

        nodoPadre.appendChild(subCategoria)
    }

    static cargaNombresPrendas(datos, nodoPadre){
        let prenda = document.createElement('option')

        prenda.value = datos.idPrenda
        prenda.textContent = datos.nombrePrenda
        nodoPadre.appendChild(prenda)
    }

    static precargaDatos(idPrenda, nombrePrenda, tallaPrenda, descripcionPrenda, idCategoria, nombreCategoria, idSubcategoria, subcategoriaPrenda){

    }
}