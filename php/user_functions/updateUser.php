<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';
require '/vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = "SholiIsJustGreat";
$inputRaw = file_get_contents("php://input");
// echo $inputRaw;
$input = json_decode($inputRaw);
if ($input) {
  try {
    $jwt = $input->jwt;
    $jwtValue = JWT::decode($jwt, new Key($key, 'HS256'));
    // echo json_encode($jwtValue);
    //$inputRaw = '{"username":"user2","firstname":"1","lastname":"1","eMail":"1"}';

    $username = mysqli_real_escape_string($conn, $jwtValue->usr);
    $firstname = mysqli_real_escape_string($conn, $input->firstname);
    $lastname = mysqli_real_escape_string($conn, $input->lastname);
    $email = mysqli_real_escape_string($conn, $input->eMail);

    $stmt = $conn->prepare("UPDATE user SET firstname=?, lastname=?, email=? WHERE username=?");
    $stmt->bind_param("ssss", $firstname, $lastname, $email, $username); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
    if ($stmt->execute()) {
      echo 1;
    } else {
      echo 0;
    }
  } catch (Exception $e) {
    echo $e;
  }
}
