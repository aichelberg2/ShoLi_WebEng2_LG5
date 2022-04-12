<?php
//for cors
require '..\db_connection.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-
Requested-With");

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"username":"lucas123","firstname":"Lucas","lastname":"Spaeth","eMail":"lucas@lucas.de","password":"test123"}';
$input = json_decode($inputRaw);

$username = mysqli_real_escape_string($conn, $input->username);
$firstname = mysqli_real_escape_string($conn, $input->firstname);
$lastname = mysqli_real_escape_string($conn, $input->lastname);
$email = mysqli_real_escape_string($conn, $input->eMail);
$password = mysqli_real_escape_string($conn, $input->password);


//for security: https://stackoverflow.com/questions/97984/how-to-secure-database-passwords-in-php
//https://www.tutorialrepublic.com/php-tutorial/php-mysql-login-system.php

//$data = array('username' => 'lucas123', 'firstname' => 'Lucas', 'eMail' => 'lucas@lucas.de', 'password' => 'test123');

$insertStatement = "INSERT INTO user(username, firstname, lastname, email, password)
                    VALUES('$username', '$firstname', '$lastname', '$email', '$password')";
$result = mysqli_query($conn, $insertStatement);
if ($result) {
  echo 1;
} else {
  echo 0;
}
?>