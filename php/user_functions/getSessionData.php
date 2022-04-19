<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';
session_start();
$data = array(
  'username' => $_SESSION['username'], 'firstname' => $_SESSION['firstname'],'lastname' => $_SESSION['lastname'], 'eMail' => $_SESSION['lastname'],
);

echo json_encode($data);
?>
