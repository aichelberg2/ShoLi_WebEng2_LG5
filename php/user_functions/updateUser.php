<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

//$inputRaw = '{"username":"user2","firstname":"3","lastname":"1","eMail":"a@a.a"}';
$inputRaw = file_get_contents("php://input");
$input = json_decode($inputRaw);
$username = mysqli_real_escape_string($conn, $input->username);
$firstname = mysqli_real_escape_string($conn, $input->firstname);
$lastname = mysqli_real_escape_string($conn, $input->lastname);
$email = mysqli_real_escape_string($conn, $input->eMail);



$stmt = $conn->prepare("UPDATE user SET firstname=?, lastname=?, email=? WHERE username=?");
$stmt->bind_param("ssss", $firstname,$lastname, $email, $username); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
if ($stmt->execute()) {
  echo 1;
} else {
  echo 0;
}
?>
