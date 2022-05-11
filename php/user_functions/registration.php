<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';
$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"username":"user1","firstname":"user","lastname":"1","eMail":"user@1.de","password":"1"}';
$input = json_decode($inputRaw);

$username = mysqli_real_escape_string($conn, $input->username);
$firstname = mysqli_real_escape_string($conn, $input->firstname);
$lastname = mysqli_real_escape_string($conn, $input->lastname);
$email = mysqli_real_escape_string($conn, $input->eMail);
$password = mysqli_real_escape_string($conn, $input->password);
$hash = password_hash($password, PASSWORD_DEFAULT);
$bul = password_verify($password, $hash);

if ($username != '')
{
  $stmt = $conn->prepare("INSERT INTO user(username, firstname, lastname, email, password, logged_in)
                                VALUES(?, ?, ?, ?, ?, 0)");
  $stmt->bind_param("sssss", $username,$firstname, $lastname, $email, $hash);
  if ($stmt->execute()) {
    echo 1;
  } else {
    echo 0;
  }
} else{
  echo 0;
}

?>

