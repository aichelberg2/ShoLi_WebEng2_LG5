<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"productName":"name3","productCategory":"kat2","productPrice":"2.5"}';

$input = json_decode($inputRaw);
$productName = mysqli_real_escape_string($conn, $input->productName);
$productCategory = mysqli_real_escape_string($conn, $input->productCategory);
$productPrice = mysqli_real_escape_string($conn, $input->productPrice);

if ($productName != '')
{
  $stmt = $conn->prepare( "INSERT INTO product(name, price, category)
                                VALUES(?, ?, ?)");
  $stmt->bind_param("sds", $productName,$productPrice, $productCategory);
  if ($stmt->execute()) {
    $productId = $conn->insert_id;
    echo $productId;
  } else {
    echo 0;
  }
} else{
  echo 0;
}
?>
