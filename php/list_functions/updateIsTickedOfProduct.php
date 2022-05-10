<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"listID":"1","productID":"1","isTicked":"0"}';
$input = json_decode($inputRaw);
$listID = mysqli_real_escape_string($conn, $input->listID);
$productID = mysqli_real_escape_string($conn, $input->productID);
$isTicked = mysqli_real_escape_string($conn, $input->isTicked);

$updateStatement = "UPDATE userlist SET isTicked='$isTicked' WHERE list_id='$listID' AND pr_id='$productID'";

if ($conn->query($updateStatement) === TRUE) {
  echo 1;
} else {
  echo 0;
}

?>
