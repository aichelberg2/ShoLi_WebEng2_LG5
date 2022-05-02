<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"productName":"name2","productCategory":"kat1","productPrice":"2"}';

$input = json_decode($inputRaw);
$productName = mysqli_real_escape_string($conn, $input->productName);
$productCategory = mysqli_real_escape_string($conn, $input->productCategory);
$productPrice = mysqli_real_escape_string($conn, $input->productPrice);

if ($productName != '')
{
  $insertStatement = "INSERT INTO product(name, price, category)
                    VALUES('$productName', '$productPrice', '$productCategory')";
  $result = mysqli_query($conn, $insertStatement);
  if ($result) {
    echo 1;
  } else {
    echo 0;
  }
} else{
  echo 0;
}
?>
