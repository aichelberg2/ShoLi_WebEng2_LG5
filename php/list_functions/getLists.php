<?php
//for cors
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

$data = array(
  "accessGranted" => 0
);

if ($input) {
  try {
    $jwt = $input->jwt;
    $jwtValue = JWT::decode($jwt, new Key($key, 'HS256'));
    //alt: $username = mysqli_real_escape_string($conn, $inputRaw);
    $username = mysqli_real_escape_string($conn, $jwtValue->usr);

    $stmt = $conn->prepare("SELECT userlist.list_id, list.name
                                  FROM userlist
                                  INNER JOIN list ON userlist.list_id=list.list_id
                                  WHERE userlist.user = ?");
    $stmt->bind_param('s', $username); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
    $stmt->execute();
    $result = $stmt->get_result();
    $lists = array();
    while ($row = mysqli_fetch_assoc($result)) {
      $lists[] = $row;
    }

    $data = array(
      "lists" => $lists,
      "accessGranted" => 1
    );
  } catch (Exception $e) {
    $data = array(
      "accessGranted" => 0
    );
  } finally {
    echo json_encode($data);
  }
}
