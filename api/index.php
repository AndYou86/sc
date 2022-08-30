<?php

require __DIR__ . '/config.php';
spl_autoload_register(function ($className) {
    $file = __DIR__ . '/class/' . $className . '.php';
    if (file_exists($file)) {
        include $file;
    }
});

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);
$num_sp = array_search('api', $uri);
array_splice($uri, 0, $num_sp + 1);
$method = $_SERVER["REQUEST_METHOD"];

if (isset($uri[0]) && $uri[0] != 'users' && $uri[0] != 'auth') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

if ($uri[0] == 'auth') {
    $auth = new auth();
    switch ($method) {
        case 'POST':
            header("Access-Control-Allow-Origin: *");
            header("Content-Type: application/json; charset=UTF-8");
            header("Access-Control-Allow-Methods: POST");
            header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
            $_POST = json_decode(file_get_contents('php://input'), true);

            if (!empty($_POST['login']) && !empty($_POST['password'])) {
                $key = ['login', 'password'];
                $data = array_intersect_key($_POST, array_flip($key));
                $result = $auth->login($data);
                http_response_code(200);
                echo json_encode($result);
            }
            break;
        case 'DELETE':
            header("Access-Control-Allow-Origin: *");
            header("Content-Type: application/json; charset=UTF-8");
            header("Access-Control-Allow-Methods: DELETE ");
            header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
            $_DELETE = json_decode(file_get_contents('php://input'),true) ;
            
            if (!empty($_DELETE['id']) && !empty($_DELETE['token'])) {
                $key = ['id', 'token'];
                $data = array_intersect_key($_DELETE, array_flip($key));

                $result = $auth->logout($data);
                http_response_code(200);
                echo json_encode($result);
            }
            break;
        case 'PUT':
            header("Access-Control-Allow-Origin: *");
            header("Content-Type: application/json; charset=UTF-8");
            header("Access-Control-Allow-Methods: PUT ");
            header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
            parse_str(file_get_contents('php://input'), $_PUT);
            if (!empty($_PUT['login']) && !empty($_PUT['password'])) {
                $key = ['login', 'password'];
                $data = array_intersect_key($_PUT, array_flip($key));

                $result = $auth->register($data);
                http_response_code(201);
                echo json_encode($result);
            }
            break;
        case 'GET':
            header("Access-Control-Allow-Origin: *");
            header("Content-Type: application/json; charset=UTF-8");
            header("Access-Control-Allow-Methods: GET ");
            header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
                $result = $auth->check($_GET);
                http_response_code(201);
                echo json_encode($result);
    
            break;
        default:
            http_response_code(400);

            exit();
            break;
    }
}

if ($uri[0] == 'users') {
    $students = new students();
    switch ($method) {
        case 'GET':
            header("Access-Control-Allow-Origin: *");
            header("Content-Type: application/json; charset=UTF-8");
            header("Access-Control-Allow-Methods: GET");
            header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
            if (!isset($_GET['p'])) {
                $data = $students->getStudents();
            } else {
                $data = $students->getStudents((int)$_GET['p']);
            }
            http_response_code(200);
            echo json_encode($data);
            break;
        default:
            http_response_code(400);

            exit();
            break;
    }
}
