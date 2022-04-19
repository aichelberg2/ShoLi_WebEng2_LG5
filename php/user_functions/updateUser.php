<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
$input = json_decode($inputRaw);
$username = mysqli_real_escape_string($conn, $input->username);
$firstname = mysqli_real_escape_string($conn, $input->firstname);
$lastname = mysqli_real_escape_string($conn, $input->lastname);
$mail = mysqli_real_escape_string($conn, $input->email);

$stmt = $conn->prepare("UPDATE user SET firstname =? and set SET lastname =? and set email=?  WHERE username=$username");
$stmt->bind_param('sss', $firstname, $lastname, $mail);
$stmt->execute();
?>
