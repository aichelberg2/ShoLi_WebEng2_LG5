<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
require '../db_connection.php';

session_start();
echo($_SESSION['username']);
?>
