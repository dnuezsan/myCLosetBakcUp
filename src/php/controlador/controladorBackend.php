<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-with, Content-Type, Accept');
header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE');


require_once "../modelo/metodos.php";


switch ($_POST['propiedad']) {
    case "inicioSesion":
        $usuario = $_POST['user'];
        $password = $_POST['password'];
        sesion($usuario, $password);
        break;
    case "registrarse":
        $nombre = $_POST['nombre'];
        $correo = $_POST['correo'];
        $password = $_POST['password'];
        $rpassword = $_POST['rpassword'];
        registrar($nombre, $correo, $password, $rpassword);
        break;
    case "modificarUsuario":
        $nombre = $_POST['nombre'];
        $correo = $_SESSION['usuario'];
        $password = $_POST['password'];
        $newpassword = $_POST['newpassword'];
        $rnewpassword = $_POST['rnewpassword'];
        modificarUsuario($nombre, $correo, $password, $newpassword, $rnewpassword);
        break;
    case "cargarDatosUsuario":
        $correo = $_SESSION['usuario'];
        cargaDatosUsuario($correo);
        break;
    case "borrarUsuario":
        $correo = $_SESSION['usuario'];
        borrarUsuario($correo);
        break;
    case "subidaDePrenda":

        $correo = $_SESSION['usuario'];
        $talla = $_POST['talla'];
        $descripcion = $_POST['descripcion'];
        $categoria = $_POST['categoria'];
        $subcategoria = $_POST['subcategoria'];
        $nombrePrenda = $_POST['nombrePrenda'];
        $imagen = $_POST['imagen'];

        subidaDePrenda($subcategoria, $descripcion, $talla, $correo, $nombrePrenda, $imagen);
        break;
    case "cargarCategoria":
        cargarCategoria();
        break;
    case "cargarSubCategoria":
        $categoria = $_POST['categoria'];
        $usuario = $_SESSION['usuario'];
        cargarSubCategoria($categoria, $usuario);
        break;
    case "cargarMisPrendas":
        $usuario = $_SESSION['usuario'];
        cargarMisPrenda($usuario);
        break;
    case "modificarPrenda":
        $descripcion = $_POST['descripcion'];
        $talla = $_POST['talla'];
        $idSubCategoria = $_POST['idSubcategoria'];
        $usuario = $_SESSION['usuario'];
        $nombrePrenda = $_POST['nombrePrenda'];
        $idPrenda = $_POST['idPrenda'];
        modificarPrenda($descripcion, $talla, $idSubCategoria, $nombrePrenda, $usuario, $idPrenda);
        break;
    case "borrarPrenda":
        $idPrenda = $_POST['idPrenda'];
        borrarPrenda($idPrenda);
        break;
    case "cargarCategoriasMisPrendas":
        cargarCategoriaMisPrendas();
        break;
    case "filtrarPrendasPorCategoria":
        $usuario = $_SESSION['usuario'];
        $categoria = $_POST["categoria"];
        filtrarPrendasPorCategoria($usuario, $categoria);
        break;
    case "cargarNombresPrendas":
        $usuario = $_SESSION['usuario'];
        $subcategoria = $_POST["subcategoria"];
        cargarNombresPrendas($usuario, $subcategoria);
        break;
    case "insertarSubCategoria":
        $usuario = $_SESSION['usuario'];
        $idSubCategoria = $_POST['idCategoria'];
        $nombreSubCategoria = $_POST['nombreSubcategoria'];
        insertarSubcategoria($nombreSubCategoria, $idSubCategoria, $usuario);
        break;
    case "modificarSubCategoria":
        $nombreSubCategoria = $_POST['nombreSubcategoria'];
        $idCategoria = $_POST['idCategoria'];
        $idSubcategoria = $_POST['idSubcategoria'];
        modificarSubCategoria($nombreSubCategoria, $idCategoria, $idSubcategoria);
        break;
    case "modificarCambioSubCategoria":
        $idCategoria = $_POST['idCategoria'];
        $idSubcategoria = $_POST['idSubcategoria'];
        modificarCambiarSubcategoria($idCategoria, $idSubcategoria);
        break;
    case "borrarSubCategoria":
        $idSubCategoria = $_POST['idSubCategoria'];
        borrarSubCategoria($idSubCategoria);
        break;
    case "cargarOutfits":
        $usuario = $_SESSION['usuario'];
        cargarOutfits($usuario);
        break;
    case "cargarPrendasCabeza":
        $usuario = $_SESSION['usuario'];
        cargarPrendasCabeza($usuario);
        break;
    case "cargarPrendasCabezaOufit":
        $usuario = $_SESSION['usuario'];
        $idOutfit = $_POST['idOutfit'];
        cargarPrendasCabezaOutfit($usuario, $idOutfit);
        break;
    case "cargarPrendasTorsoOufit":
        $usuario = $_SESSION['usuario'];
        $idOutfit = $_POST['idOutfit'];
        cargarPrendasTorsoOutfit($usuario, $idOutfit);
        break;
    case "cargarPrendasPiernasOufit":
        $usuario = $_SESSION['usuario'];
        $idOutfit = $_POST['idOutfit'];
        cargarPrendasPiernasOutfit($usuario, $idOutfit);
        break;
    case "cargarPrendasPiesOufit":
        $usuario = $_SESSION['usuario'];
        $idOutfit = $_POST['idOutfit'];
        cargarPrendasPiesOutfit($usuario, $idOutfit);
        break;
    case "cargarPrendasTorso":
        $usuario = $_SESSION['usuario'];
        cargarPrendasTorso($usuario);
        break;
    case "cargarPrendasPiernas":
        $usuario = $_SESSION['usuario'];
        cargarPrendasPiernas($usuario);
        break;
    case "cargarPrendasPies":
        $usuario = $_SESSION['usuario'];
        cargarPrendasPies($usuario);
        break;
    case "insertarOutfit":
        $usuario = $_SESSION['usuario'];
        $nombreOutfit = $_POST['nombreOutfit'];
        //$fechaCreacion = $_POST['fechaCreacion'];
        $fechaCreacion = "CURDATE()";
        $idPrenda = $_POST['idPrenda'];
        insertarOutfit($usuario, $nombreOutfit, $fechaCreacion, $idPrenda);
        break;
    case "borrarOutfit":
        $idOutfit = $_POST['idOutfit'];
        borrarOutfit($idOutfit);
        break;
    case "modificarOutfit":
        $idPrenda = $_POST['idPrenda'];
        $idPrendaNueva = $_POST['idPrendaNueva'];
        $idOutfit = $_POST['idOutfit'];
        $nombreOutfit = $_POST['nombreOutfit'];
        modificarOutfit($idPrenda, $idPrendaNueva, $idOutfit, $nombreOutfit);
        break;
    case "insertarPrendasOutfit":
        $arrayIdPrendas = $_POST['arrayIdPrendas'];
        $usuario = $_SESSION['usuario'];
        $fechaCreacion = "CURDATE()";
        $nombreOutfit = $_POST["nombreOutfit"];
        insertarPrendasOutfit($arrayIdPrendas, $usuario, $fechaCreacion, $nombreOutfit);
        break;
    case "cerrarSesion":
        session_destroy();
        break;
}



/**
 * @param mixed $usuario
 * @param mixed $password
 * Envia datos del login al formulario y devuelve la respuesta al front
 * @return [type]
 */
function sesion($usuario, $password)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'nombre' => "", 'us_id' => "");

    //$metodo->iniciarSesion($usuario, $password);

    if ($metodo->iniciarSesion($usuario, $password)) {
        $response['success'] = true;
        $response['mensaje'] = 'Todo es correcto';
        $response['usuario'] = $usuario;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "Correo o contraseña incorrecta";
        $response['usuario'] = $usuario;
    }
    echo json_encode($response);
}

/**
 * @param mixed $nombre
 * @param mixed $correo
 * @param mixed $password
 * @param mixed $rpassword
 * Pasa los del registro de ususario al modelo y devuelve la respuesta al front
 * @return [type]
 */
function registrar($nombre, $correo, $password, $rpassword)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    if ($metodo->altaUsuario($nombre, $correo, $password, $rpassword)) {
        $response['success'] = true;
        $response['mensaje'] = 'El registro se efectuó correctamente';
        $response['correo'] = $correo;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "El correo introducido ya existe";
        $response['correo'] = $correo;
    }
    echo json_encode($response);
}

/**
 * @param String $nombreUsuario
 * @param String $correo
 * @param String $password
 * @param String $newpassword
 * @param String $rnewpassword
 * Pasa los datos al método del modelo que produce la modificación y procesa y retorna la respuesta
 * @return json_encode
 */
function modificarUsuario($nombreUsuario, $correo, $password, $newpassword, $rnewpassword)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    if ($metodo->modicarUsuario($nombreUsuario, $correo, $password, $newpassword, $rnewpassword)) {
        $response['success'] = true;
        $response['mensaje'] = 'Modificacion es correcta';
        $response['correo'] = $correo;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "Error al modificar tus datos datos";
        $response['correo'] = $correo;
    }
    echo json_encode($response);
}

/**
 * @param String $correo
 * Envía el correo del usuario para obtener su nombre y recibe, procesa y retorna la respuesta
 * @return json_encode
 */
function cargaDatosUsuario($correo)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");
    $arrayAsociativo = $metodo->cagarDatosUsuario($correo);
    //var_dump($arrayAsociativo);
    if ($arrayAsociativo["respuesta"]) {

        $response['success'] = true;
        $response['mensaje'] = 'carga de datos correcto';
        $response['nombreUsuario'] = $arrayAsociativo["respuesta2"];
        $response['correo'] = $arrayAsociativo['respuesta3'];
    } else {
        $response['success'] = false;
        $response['mensaje'] = "Error al modificar tus datos datos";
        $response['nombreUsuario'] = $arrayAsociativo['respuesta2'];
    }
    echo json_encode($response);
}

/**
 * @param String $correo
 * Envía el correo del usuario para borrarlo de la base de datos y recibe, procesa y retorna la respuesta
 * @return json_encode
 */
function borrarUsuario($correo)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    if ($metodo->borrarUsuario($correo)) {
        $response['success'] = true;
        $response['mensaje'] = 'Se borro correctamente el usuario';
        $response['correo'] = $correo;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "Error al borrar el usuario";
        $response['correo'] = $correo;
    }
    echo json_encode($response);
}
/**
 * @param String $subCategoria
 * @param String $descripcion
 * @param String $talla
 * @param String $correo
 * @param String $imagen
 * Envía datos necesarios al modelo para insertar una prenda y recibe, procesa y retorna la respuesta
 * @return json_encode
 */
function subidaDePrenda($subCategoria, $descripcion, $talla, $correo, $nombrePrenda, $imagen)
{

    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    if ($metodo->insertarPrendas($subCategoria, $descripcion, $talla, $correo, $nombrePrenda, $imagen)) {
        $response['success'] = true;
        $response['mensaje'] = 'Se ha guardado su prenda correctamente';
        $response['correo'] = '';
        //echo $imagen;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "No se ha guardado su prenda correctamente";
        $response['correo'] = '';
    }
    echo json_encode($response);
}

/**
 * Carga de Categorias
 * @return JSON
 */
function cargarCategoria()
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    echo json_encode($metodo->cargarCategorias());
}

/**
 * Carga de mis prendas
 * @return JSON
 */
function cargarCategoriaMisPrendas()
{
    $metodo = new Metodos();

    echo json_encode($metodo->cargarCategoriasMisPrendas());
}

/**
 * @param $categoria
 * @param $usuario
 * Carga de SubCategorias
 * @return JSON
 */
function cargarSubCategoria($categoria, $usuario)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");
    //$metodo->cargarSubcategorias($categoria, $usuario);

    echo json_encode($metodo->cargarSubcategorias($categoria, $usuario));
}

/**
 * @param $usuario
 * @param $subcategoria
 * Carga de nombre de las prendas
 * @return JSON
 */
function cargarNombresPrendas($usuario, $subcategoria)
{

    $metodo = new Metodos();

    echo json_encode($metodo->cargarNombrePrendas($usuario, $subcategoria));
}

/**
 * @param $usuario
 * Carga de las prendas del usuario
 * @return JSON
 */
function cargarMisPrenda($usuario)
{
    $metodo = new Metodos();

    echo json_encode($metodo->cargarMisPrendas($usuario));
}

/**
 * @param $usuario
 * @param $categoria
 * Fitro de las prendas por Categorias
 * @return JSON
 */
function filtrarPrendasPorCategoria($usuario, $categoria)
{
    $metodo = new Metodos();

    echo json_encode($metodo->filtrarPrendasPorCategoria($usuario, $categoria));
}

/**
 * @param $descripcion
 * @param $talla
 * @param $idSubcategoria
 * @param $nombrePrenda
 * @param $usuario
 * @param $idPrenda
 * Modificamos las Prendas del usuario
 * @return JSON
 */
function modificarPrenda($descripcion, $talla, $idSubcategoria, $nombrePrenda, $usuario, $idPrenda)
{
    $metodo = new Metodos();

    if ($metodo->modificarPrenda($descripcion, $talla, $idSubcategoria, $nombrePrenda, $usuario, $idPrenda)) {
        $response['success'] = true;
        $response['mensaje'] = 'Se ha modificado su prenda correctamente';

        //echo $imagen;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "No se ha modificado su prenda";
    }

    echo json_encode($response);
}

/**
 * @param $idPrenda
 * Borrado de la prenda
 * @return JSON
 */
function borrarPrenda($idPrenda)
{
    $metodo = new Metodos();
    echo json_encode($metodo->borrarPrenda($idPrenda));
}

/**
 * @param $nombreCategoria
 * @param $idCategoria
 * @param $usuario
 * Insertamos las nuevas SubCategorias
 * @return JSON
 */
function insertarSubcategoria($nombreCategoria, $idCategoria, $usuario)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    if ($metodo->insertarSubcategoria($nombreCategoria, $idCategoria, $usuario)) {
        $response['success'] = true;
        $response['mensaje'] = 'Se ha guardado su categoría correctamente';

        //echo $imagen;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "No se ha guardado su categoría correctamente";
    }
    echo json_encode($response);
}

/**
 * @param $nombreSubCategoria
 * @param $idCategoria
 * @param $idSubcategoria
 * Modificamos las subCategorias del usuario
 * @return JSON
 */
function modificarSubCategoria($nombreSubCategoria, $idCategoria, $idSubcategoria)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    if ($metodo->modificarSubCategoria($nombreSubCategoria, $idCategoria, $idSubcategoria)) {
        $response['success'] = true;
        $response['mensaje'] = 'Se ha modificado su categoría correctamente';

        //echo $imagen;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "No se ha modificado su categoría correctamente";
    }
    echo json_encode($response);
}

/**
 * @param $idCategoria
 * @param $idSubcategoria
 * Modificamos las subcategorias de la Categoria que pertenece
 * @return JSON
 */
function modificarCambiarSubcategoria($idCategoria, $idSubcategoria)
{

    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    if ($metodo->modificarCambiarDeSubCategoria($idCategoria, $idSubcategoria)) {
        $response['success'] = true;
        $response['mensaje'] = 'Se ha modificado su categoría correctamente';

        //echo $imagen;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "No se ha modificado su categoría correctamente";
    }
    echo json_encode($response);
}

/**
 * @param $idSubCategoria
 * Borrado de las subcategoria
 * @return JSON
 */
//Borramos las subucategorias
function borrarSubCategoria($idSubCategoria)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    if ($metodo->borrarSubCategoria($idSubCategoria)) {
        $response['success'] = true;
        $response['mensaje'] = 'Se ha borrado su categoría correctamente';

        //echo $imagen;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "No se ha podido borrar su categoría. Comprueba que no haya prendas que tengan esa categoría asignada";
    }
    echo json_encode($response);
}

/**
 * @param $usuario
 * Carga de los Outfit
 * @return JSON
 */
function cargarOutfits($usuario)
{
    $metodo = new Metodos();

    echo json_encode($metodo->cargarOutfits($usuario));
}

/**
 * @param $usuario
 * Cargamoas las prendas de la Cabeza
 * @return JSON
 */
function cargarPrendasCabeza($usuario)
{
    $metodo = new Metodos();

    echo json_encode($metodo->cargarPrendasCabeza($usuario));
}

/**
 * @param $usuario
 * Cargamoas las prendas de la Torso
 * @return JSON
 */
function cargarPrendasTorso($usuario)
{
    $metodo = new Metodos();

    echo json_encode($metodo->cargarPrendasTorso($usuario));
}

/**
 * @param $usuario
 * Cargamoas las prendas de la Piernas
 * @return JSON
 */
function cargarPrendasPiernas($usuario)
{
    $metodo = new Metodos();

    echo json_encode($metodo->cargarPrendasPiernas($usuario));
}

/**
 * @param $usuario
 * Cargamoas las prendas de la Pies
 * @return JSON
 */
function cargarPrendasPies($usuario)
{
    $metodo = new Metodos();

    echo json_encode($metodo->cargarPrendasPies($usuario));
}

/**
 * @param $usuario
 * @param $idOutfit
 * Cargamos las prendas de Cabeza en los Outfit
 * @return JSON
 */
function cargarPrendasCabezaOutfit($usuario, $idOutfit)
{

    $metodo = new Metodos();

    echo json_encode($metodo->cargarPrendasCabezaOutfit($usuario, $idOutfit));
}

/**
 * @param $usuario
 * @param $idOutfit
 * Cargamos las prendas de Torso en los Outfit
 * @return JSON
 *
 */
function cargarPrendasTorsoOutfit($usuario, $idOutfit)
{

    $metodo = new Metodos();

    echo json_encode($metodo->cargarPrendasTorsoOutfit($usuario, $idOutfit));
}

/**
 * @param $usuario
 * @param $idOutfit
 * Cargamos las prendas de Piernas en los Outfit
 * @return JSON
 */
function cargarPrendasPiernasOutfit($usuario, $idOutfit)
{

    $metodo = new Metodos();

    echo json_encode($metodo->cargarPrendasPiernasOutfit($usuario, $idOutfit));
}

/**
 * @param $usuario
 * @param $idOutfit
 * Cargamos las prendas de Pies en los Outfit
 * @return JSON
 */
function cargarPrendasPiesOutfit($usuario, $idOutfit)
{

    $metodo = new Metodos();

    echo json_encode($metodo->cargarPrendasPiesOutfit($usuario, $idOutfit));
}

/**
 * @param $usuario
 * @param $nombreOutfit
 * @param $fechaCreacion
 * @param $idPrenda
 * Insertamos los Outfit
 * @return JSON
 */
function insertarOutfit($usuario, $nombreOutfit, $fechaCreacion, $idPrenda)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    if ($metodo->insertamosOutfit($usuario, $nombreOutfit, $fechaCreacion, $idPrenda)) {
        $response['success'] = true;
        $response['mensaje'] = 'Se ha insertado su outfit correctamente';

        //echo $imagen;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "No se ha guardo su outfit correctamente";
    }
    echo json_encode($response);
}

/**
 * @param $idOutfit
 * Borramos los Outfit
 * @return JSON
 */
function borrarOutfit($idOutfit)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    if ($metodo->borrarOutfit($idOutfit)) {
        $response['success'] = true;
        $response['mensaje'] = 'Se ha borrado su outfit correctamente';

        //echo $imagen;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "No se ha borrado su outfit correctamente";
    }
    echo json_encode($response);
}

/**
 * @param $idPrenda
 * @param $idPrendaNueva
 * @param $idOutfit
 * @param $nombreOutfit
 * Modificamos los outfit del Usuario
 * @return JSON
 */
function modificarOutfit($idPrenda, $idPrendaNueva, $idOutfit, $nombreOutfit)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    if ($metodo->modificarOutfit($idPrenda, $idPrendaNueva, $idOutfit, $nombreOutfit)) {
        $response['success'] = true;
        $response['mensaje'] = 'Se ha modificado su outfit correctamente';

        //echo $imagen;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "No se ha modificado su outfit correctamente";
    }
    echo json_encode($response);
}

/**
 * @param mixed $arrayIdPrendas
 * @param mixed $usuario
 * @param mixed $fechaCreacion
 * @param mixed $nombreOutfit
 * 
 * @return JSON
 */
function insertarPrendasOutfit($arrayIdPrendas, $usuario, $fechaCreacion, $nombreOutfit)
{
    $metodo = new Metodos();
    $response = array('success' => false, 'mensaje' => "", 'correo' => "");

    if ($metodo->insertarPrendasOutfit($arrayIdPrendas, $usuario, $fechaCreacion, $nombreOutfit)) {
        $response['success'] = true;
        $response['mensaje'] = 'Se ha creado su outfit correctamente';

        //echo $imagen;
    } else {
        $response['success'] = false;
        $response['mensaje'] = "No se ha podido crear su outfit correctamente";
    }
    echo json_encode($response);
}
