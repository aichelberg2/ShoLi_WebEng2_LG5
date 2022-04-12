<?php
$sname = "localhost";
$uname = "root";
$password = "";
$db_name = "sholi";

$conn = mysqli_connect($sname, $uname, $password, $db_name);
if (!$conn) {
  die("Connection failed: " . $conn->connect_error);
}
?>

