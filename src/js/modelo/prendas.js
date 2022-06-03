


/**
 *Clase que gestiona los datos de las prendas
 *
 * @export
 * @class Prendas
 */
export class Prendas {


    /**
     * @constructor
     *Crea una instancia de Prendas
     * @param {String} titulo
     * @param {String} descripcion
     * @memberof Prendas
     */
    constructor(titulo, descripcion) {
        this.titulo = titulo
        this.descripcion = descripcion
    }


    /**
     *Metodo que envia datos al servidor para la inserción de una prenda, procesa la respuesta y la devuelve
     *
     * @static
     * @param {string} talla
     * @param {string} descripcion
     * @param {string} categoria
     * @param {string} subcategoria
     * @param {string} imagen
     * @return {JSON} 
     * @memberof Prendas
     */
    static async subidaDePrenda(talla, descripcion, categoria, subcategoria, imagen){
        let subidaDePrenda = 'subidaDePrenda'
        let error

        if (talla == '') {
            error = {
                success: false,
                mensaje: 'Por favor introduce la talla'
            }
            return error
        } else if(categoria == '' || categoria == null){
            error = {
                success: false,
                mensaje: 'Por favor selecciona el tipo de prenda'
            }
            return error
        } else if (subcategoria == '' || subcategoria ==null) {
            error = {
                success: false,
                mensaje: 'Por favor selecciona una categoría'
            }
            return error
        } else if (imagen == '') {
            error = {
                success: false,
                mensaje: 'Por favor selecciona una imagen'
            }
            return error
        }
        console.log(talla, descripcion, categoria, subcategoria, imagen);
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                    {
                        propiedad: subidaDePrenda,
                        correo:  sessionStorage.sesion,
                        talla: talla,
                        descripcion: descripcion,
                        categoria: categoria,
                        subcategoria: subcategoria,
                        imagen: imagen
                    },
            })
            //console.log(datos);
        let datosJson = JSON.parse(datos)
            //console.log(datosJson);
        return datosJson
    }


    static async cargarCategoria(){

        let cargarCategoria = 'cargarCategoria'
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                    {
                        propiedad: cargarCategoria,
                        correo:  sessionStorage.sesion,

                    },
            })
        //console.log(datos);
        let datosJson = JSON.parse(datos)
        //console.log(datosJson);
        return datosJson
    }



    static async cargarSubCategoria(categoria,usuario){
        let cargarSubCategoria = 'cargarSubCategoria'
        let datos = await $.ajax(
            {
                //url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                    {
                        propiedad: cargarSubCategoria,
                        correo:  sessionStorage.sesion,
                        categoria: categoria,

                    },
            })
        //console.log(datos);
        let datosJson = JSON.parse(datos)
        //console.log(datosJson);
        return datosJson
    }






}