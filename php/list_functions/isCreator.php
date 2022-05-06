<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';
$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"creator":"lucario1234","listID":"123"}';
$input = json_decode($inputRaw);

$creator = mysqli_real_escape_string($conn, $input->creator);
$listID = mysqli_real_escape_string($conn, $input->listID);

$query = "SELECT * FROM list WHERE creator='$creator' AND list_id='$listID'";
$result = mysqli_query($conn,$query);
if (mysqli_num_rows($result) == 1) {
  echo 1;
} else {
  echo 0;
}
?>


