<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';
//$inputRaw = file_get_contents("php://input");
$inputRaw = '{"username":"lucario1234","pw":"123"}';
$input = json_decode($inputRaw);

$username = mysqli_real_escape_string($conn, $input->username);
$password = mysqli_real_escape_string($conn, $input->pw);
$hash = password_hash($password, PASSWORD_DEFAULT);


$loginQuery = "SELECT * FROM user WHERE username='$username' AND password='$hash'";
$result = mysqli_query($conn,$loginQuery);
if (mysqli_num_rows($result) == 1) {
  $updateLoggedInStatement = "UPDATE user
                                SET logged_in = 1
                                WHERE username='$username'";
  $result = mysqli_query($conn,$updateLoggedInStatement);

  echo 1;
} else {
  echo 0;
}
?>
