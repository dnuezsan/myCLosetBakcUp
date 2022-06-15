
/**
 *Clase que gestiona los datos de los outfits
 *
 * @export
 * @class Outfits
 */
export class Outfits {


    /**
     * @constructor
     *Crea una instancia de Outfits
     * @param {String} titulo
     * @param {String} descripcion
     * @memberof Outfits
     */
    constructor(titulo, descripcion) {
        this.titulo = titulo
        this.descripcion = descripcion
    }

    
    /**
     *Envía los datos al servidor para que inserte un outfit y devuelve la respuesta
     *
     * @static
     * @param {int} idPrenda
     * @param {String} nombreOutfit
     * @return {*} 
     * @memberof Outfits
     */
    static async insertarOutfit(idPrenda, nombreOutfit) {
        let insertarOutfit = "insertarOutfit"
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: insertarOutfit,
                    correo: sessionStorage.sesion,
                    nombreOutfit: nombreOutfit,
                    idPrenda: idPrenda
                    
                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía los datos al servidor para que modifique un outfit y devuelve la respuesta
     *
     * @static
     * @param {int} idPrenda
     * @param {int} idPrendaNueva
     * @param {int} idOutfit
     * @param {String} nombreOutfit
     * @return {JSON} 
     * @memberof Outfits
     */
    static async modificarOutfit(idPrenda, idPrendaNueva, idOutfit, nombreOutfit) {
        let modificarOutfit = "modificarOutfit";
        //console.log(idPrenda, idPrendaNueva, idOutfit, nombreOutfit);
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: modificarOutfit,
                    correo: sessionStorage.sesion,
                    idOutfit: idOutfit,
                    idPrenda: idPrenda,
                    idPrendaNueva: idPrendaNueva,
                    nombreOutfit: nombreOutfit

                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }


    /**
     *Envía los datos al servidor para que borre un outfit y devuelve la respuesta
     *
     * @static
     * @param {int} idOutfit
     * @return {JSON} 
     * @memberof Outfits
     */
    static async borrarOutfit(idOutfit) {
        let propiedad = "borrarOutfit"
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    idOutfit: idOutfit


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson

    }

    /**
     *Envía al servidor la petición para que le devuelva todos los outfits de un usuario
     *
     * @static
     * @return {JSON} 
     * @memberof Outfits
     */
    static async cargaOutfits(){
        let propiedad = "cargarOutfits"
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,

                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía al servidor la petición para que le devuelva todas la prendas de la categoría cabeza de un usuario
     *
     * @static
     * @return {JSON} 
     * @memberof Outfits
     */
    static async cargarPrendasCabeza(){
        let propiedad = "cargarPrendasCabeza"
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,



                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía al servidor la petición para que le devuelva todas la prendas de la categoría torso de un usuario
     *
     * @static
     * @return {JSON} 
     * @memberof Outfits
     */
    static async cargarPrendasTorso(){
        let propiedad = "cargarPrendasTorso"
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,



                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía al servidor la petición para que le devuelva todas la prendas de la categoría piernas de un usuario
     *
     * @static
     * @return {JSON} 
     * @memberof Outfits
     */
    static async cargarPrendasPiernas(){
        let propiedad = "cargarPrendasPiernas"
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,



                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía al servidor la petición para que le devuelva todas la prendas de la categoría pies de un usuario
     *
     * @static
     * @return {JSON} 
     * @memberof Outfits
     */
    static async cargarPrendasPies(){
        let propiedad = "cargarPrendasPies"
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,



                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía los datos al servidor para cargar la prenda de cabeza de un determinado outfit
     *
     * @static
     * @param {int} idOutfit
     * @return {JSON} 
     * @memberof Outfits
     */
    static async cargarPrendasCabezaOutfit(idOutfit){
        let propiedad = "cargarPrendasCabezaOufit"
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,
                    idOutfit: idOutfit


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía los datos al servidor para cargar la prenda de torso de un determinado outfit
     *
     * @static
     * @param {int} idOutfit
     * @return {JSON} 
     * @memberof Outfits
     */
    static async cargarPrendasTorsoOutfit(idOutfit){
        let propiedad = "cargarPrendasTorsoOufit"
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,
                    idOutfit: idOutfit


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía los datos al servidor para cargar la prenda de piernas de un determinado outfit
     *
     * @static
     * @param {int} idOutfit
     * @return {JSON} 
     * @memberof Outfits
     */
    static async cargarPrendasPiernasOutfit(idOutfit){
        let propiedad = "cargarPrendasPiernasOufit"
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,
                    idOutfit: idOutfit


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía los datos al servidor para cargar la prenda de pies de un determinado outfit
     *
     * @static
     * @param {int} idOutfit
     * @return {JSON} 
     * @memberof Outfits
     */
    static async cargarPrendasPiesOutfit(idOutfit){
        let propiedad = "cargarPrendasPiesOufit"
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,
                    idOutfit: idOutfit


                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

    /**
     *Envía los datos al servidor para crear un outfit y devuelve la repuesta
     *
     * @static
     * @param {Array} arrayIdPrendas
     * @param {String} nombreOufit
     * @return {*} 
     * @memberof Outfits
     */
    static async insertarPrendasOutfit(arrayIdPrendas, nombreOufit){
        let propiedad = "insertarPrendasOutfit"
        let datos = await $.ajax(
            {
                url:  "https://05.2daw.esvirgua.com/myCloset/src/php/controlador/controladorBackend.php",
                //url: "/DWEC/myCloset/src/php/controlador/controladorBackend.php",
                //url: "https://myclosetss.000webhostapp.com/php/controlador/controladorBackend.php",
                //url: "/myCloset/src/php/controlador/controladorBackend.php",
                type: "POST",
                data:
                {
                    propiedad: propiedad,
                    correo: sessionStorage.sesion,
                    arrayIdPrendas: arrayIdPrendas,
                    nombreOutfit: nombreOufit

                },
            })
        let datosJson = JSON.parse(datos)
        return datosJson
    }

}