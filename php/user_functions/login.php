<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';
$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"username":"lucario1234","pw":"123"}';
$input = json_decode($inputRaw);

$username = mysqli_real_escape_string($conn, $input->username);
$password = mysqli_real_escape_string($conn, $input->pw);
//for security: https://stackoverflow.com/questions/97984/how-to-secure-database-passwords-in-php
//https://www.tutorialrepublic.com/php-tutorial/php-mysql-login-system.php

//$data = array('username' => 'lucas123', 'firstname' => 'Lucas', 'eMail' => 'lucas@lucas.de', 'password' => 'test123');

$query = "SELECT * FROM user WHERE username='$username' AND password='$password'";
$result = mysqli_query($conn,$query);
if (mysqli_num_rows($result) == 1) {
  $row = mysqli_fetch_assoc($result);
  session_start();
  $_SESSION['username']=$row['username'];
  $_SESSION['firstname']=$row['firstname'];
  $_SESSION['lastname']=$row['lastname'];
  $_SESSION['email']=$row['email'];
  echo 1;
} else {
  echo 0;
}
?>


