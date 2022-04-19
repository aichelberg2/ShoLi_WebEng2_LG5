<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

//$inputRaw = file_get_contents("php://input");
//$input = json_decode($inputRaw);
//$username = mysqli_real_escape_string($conn, $input->username);
//
//
//$query = "SELECT * FROM user WHERE username='$username'";
//$result = mysqli_query($conn,$query) or die(mysqli_error());
//$row = mysqli_fetch_assoc($result);
//
//echo json_encode($row);
echo 1;
?>
