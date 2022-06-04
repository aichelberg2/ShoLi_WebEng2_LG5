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
    //alt: $username = mysqli_real_escape_string($conn, $inputRaw);
    $creator = mysqli_real_escape_string($conn, $jwtValue->usr);
    $listID = mysqli_real_escape_string($conn, $input->listID);

    $stmt = $conn->prepare("SELECT *
                                FROM list
                                WHERE creator=? AND list_id=?");
    $stmt->bind_param("si", $creator, $listID); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
    $stmt->execute();
    $result = $stmt->get_result();
    if (mysqli_num_rows($result) == 1) {
      echo 1;
    } else {
      echo 0;
    }
  } catch (Exception $e) {
    echo 0;
  }
}
