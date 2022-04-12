<?php
//for cors
require '..\db_connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-
Requested-With");

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"username":"lucas123","password":"test123"}';
$input = json_decode($inputRaw);

$username = mysqli_real_escape_string($conn, $input->username);
$password = mysqli_real_escape_string($conn, $input->password);

//for security: https://stackoverflow.com/questions/97984/how-to-secure-database-passwords-in-php
//https://www.tutorialrepublic.com/php-tutorial/php-mysql-login-system.php

//$data = array('username' => 'lucas123', 'firstname' => 'Lucas', 'eMail' => 'lucas@lucas.de', 'password' => 'test123');

$query = "SELECT * FROM user WHERE username='$username' AND password='$password'";
$result = mysqli_query($conn,$query) or die(mysqli_error());
if (mysqli_num_rows($result) == 1) {
  $row = $result->fetch_row();
  $firstname = $row[1];
  $lastname = $row[2];
  $email = $row[3];
  session_start();
  $_SESSION['username']=$username;
  $_SESSION['firstname']=$firstname;
  $_SESSION['lastname']=$lastname;
  $_SESSION['email']=$email;
  echo 1;
} else {
  echo 0;
}
//echo json_encode($data);
?>

