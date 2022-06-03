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
$jwt = $input->jwt;

try {
  $jwtValue = JWT::decode($jwt, new Key($key, 'HS256'));
  //alt: $username = mysqli_real_escape_string($conn, $inputRaw);
  $username = mysqli_real_escape_string($conn, $jwtValue->usr);

  $stmt = $conn->prepare("SELECT username, firstname, lastname, email, logged_in
                                FROM user
                                WHERE username=?
                                LIMIT 1");
  $stmt->bind_param("s", $username); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
  $stmt->execute();
  $result = $stmt->get_result();
  if (mysqli_num_rows($result) == 1) {
    $row = $result->fetch_object();
    echo json_encode($row);
  } else {
    echo 0;
  }
} catch (Exception $e) {
  echo 0;
}
