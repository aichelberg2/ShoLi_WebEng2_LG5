<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';
$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"username":"user3","firstname":"user","lastname":"3","eMail":"user@3.de","password":"user3"}';
$input = json_decode($inputRaw);

$username = mysqli_real_escape_string($conn, $input->username);
$firstname = mysqli_real_escape_string($conn, $input->firstname);
$lastname = mysqli_real_escape_string($conn, $input->lastname);
$email = mysqli_real_escape_string($conn, $input->eMail);
$password = mysqli_real_escape_string($conn, $input->password);


//for security: https://stackoverflow.com/questions/97984/how-to-secure-database-passwords-in-php
//https://www.tutorialrepublic.com/php-tutorial/php-mysql-login-system.php

//$data = array('username' => 'lucas123', 'firstname' => 'Lucas', 'eMail' => 'lucas@lucas.de', 'password' => 'test123');
if ($username != '')
{
  $insertStatement = "INSERT INTO user(username, firstname, lastname, email, password, logged_in)
                    VALUES('$username', '$firstname', '$lastname', '$email', '$password', 0)";
  $result = mysqli_query($conn, $insertStatement);
  if ($result) {
    echo 1;
  } else {
    echo 0;
  }
} else{
  echo 0;
}

?>

