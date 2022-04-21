<?php
$sname = "localhost";
$uname = "root";
$password = "password123";
$db_name = getenv("DB_PASSWORD");

$conn = mysqli_connect($sname, $uname, $password, $db_name);
if (!$conn) {
  die("Connection failed: " . $conn->connect_error);
}
?>

