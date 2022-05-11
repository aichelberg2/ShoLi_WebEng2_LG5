<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"creator":"user3","listID":"4"}';
$input = json_decode($inputRaw);

$creator = mysqli_real_escape_string($conn, $input->creator);
$listID = mysqli_real_escape_string($conn, $input->listID);

$stmt = $conn->prepare(   "SELECT *
                                FROM list
                                WHERE creator=? AND list_id=?");
$stmt->bind_param("si", $creator,$listID); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
$stmt->execute();
$result = $stmt->get_result();
if (mysqli_num_rows($result) == 1) {
  echo 1;
} else {
  echo 0;
}
?>


