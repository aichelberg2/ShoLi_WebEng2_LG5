<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"listID":"3","productID":"1","isTicked":"1"}';

$input = json_decode($inputRaw);
$listID = mysqli_real_escape_string($conn, $input->listID);
$productID = mysqli_real_escape_string($conn, $input->productID);
$isTicked = mysqli_real_escape_string($conn, $input->isTicked);

$stmt = $conn->prepare("UPDATE listproduct
                                SET ticked=?
                                WHERE list_id=? AND pr_id=?");
$stmt->bind_param("iii", $isTicked, $listID, $productID); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
if ($stmt->execute()) {
  echo 1;
} else {
  echo 0;
}
