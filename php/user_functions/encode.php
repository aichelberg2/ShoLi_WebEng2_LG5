<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';
require '../../../vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;


$key = "SholiIsJustGreat";
$jwt = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJjaHJpcyIsImlzcyI6MTY1NDI3MDM4MywiZXhwIjoxNjU0MjczOTgzfQ.e9zrqTC4ZXgSVBJUrmgPMZIKxYgk91QXIP0kVq43iOI";

$jwtValue = JWT::decode($jwt, new Key($key, 'HS256'));
echo $jwtValue->usr;
echo "<br>";
echo $jwtValue->iss;
echo "<br>";
echo $jwtValue->exp;
echo "<br>";
echo json_encode($jwtValue);
