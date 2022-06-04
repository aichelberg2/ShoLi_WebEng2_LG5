<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
// $inputRaw = '{"listID":"3","productIDs":{"0":"29","1":"27"}}';

$input = json_decode($inputRaw);
$listID = mysqli_real_escape_string($conn, $input->listID);
$productIDs = $input->productIDs;

foreach ($productIDs as $productID) {
  $stmt = $conn->prepare("SELECT * FROM product WHERE pr_id = ?");
  $stmt->bind_param("i", $productID); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
  $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_object();
  $price = $row->price;
  echo $price;
  $stmt = $conn->prepare("INSERT INTO listproduct(list_id, pr_id, edited_price)
                                VALUES(?, ?, ?)");
  $stmt->bind_param("iid", $listID, $productID, $price); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
  if (!$stmt->execute()) {
    echo 0;
  }
}
echo 1;
