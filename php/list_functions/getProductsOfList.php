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
if ($input) {
  try {
    $jwt = $input->jwt;
    $jwtValue = JWT::decode($jwt, new Key($key, 'HS256'));  // encoding for expiry purposes only

    $listID = mysqli_real_escape_string($conn, $input->listID);

    $stmt = $conn->prepare("SELECT  product.pr_id, product.name, listproduct.edited_price, listproduct.ticked
                                FROM listproduct
                                INNER JOIN product ON listproduct.pr_id=product.pr_id
                                WHERE listproduct.list_id = ?");
    $stmt->bind_param('i', $listID); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
    $stmt->execute();
    $result = $stmt->get_result();
    $products = array();
    while ($row = mysqli_fetch_assoc($result)) {
      $products[] = $row;
    }

    $data = array(
      "products" => $products,
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
