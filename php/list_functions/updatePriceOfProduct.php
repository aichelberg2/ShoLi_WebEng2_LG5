<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
// $inputRaw = '{"listID":"26","productID":"34","price":"1.11"}';

$input = json_decode($inputRaw);

if ($input) {
  $listID = mysqli_real_escape_string($conn, $input->listID);
  $productID = mysqli_real_escape_string($conn, $input->productID);
  $price = mysqli_real_escape_string($conn, $input->price);


  $stmt = $conn->prepare("UPDATE listproduct
                                  SET edited_price=?
                                  WHERE list_id=? AND pr_id=?");
  $stmt->bind_param("dii", $price, $listID, $productID); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
  if ($stmt->execute()) {
    echo 1;
  } else {
    echo 0;
  }
}
