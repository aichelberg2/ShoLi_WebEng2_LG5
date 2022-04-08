<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Accept, Origin, Authorization, X-
Requested-With");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$username = $request->username;
$pw = $request->pw;
$data = array('username' => 'lucas123', 'firstname' => 'Lucas', 'birthday' => '20.04.2001', 'eMail' => 'lucas@lucas.de', 'password' => 'test123');

if ($username == $data['username'] && $pw == $data['password']) {
  echo 1;
} else {
  echo 0;
}
?>


