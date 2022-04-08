<?php
//for cors
require '..\db_connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-
Requested-With");

//$inputRaw = file_get_contents("php://input");
$inputRaw = '{"username":"lucas123","firstname":"Lucas","eMail":"lucas@lucas.de","password":"test123"}';
$input = json_decode($inputRaw);

$username = $input->username;
$pw = $input->pw;

//for security: https://stackoverflow.com/questions/97984/how-to-secure-database-passwords-in-php
//https://www.tutorialrepublic.com/php-tutorial/php-mysql-login-system.php

//$data = array('username' => 'lucas123', 'firstname' => 'Lucas', 'eMail' => 'lucas@lucas.de', 'password' => 'test123');

if ($username == $data['username'] && $pw == $data['password']) {
  echo 1;
} else {
  echo 0;
}
//echo json_encode($data);
?>

