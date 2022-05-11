<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"listID":"4"}';

$input = json_decode($inputRaw);
$listID = mysqli_real_escape_string($conn, $input->listID);

$stmt = $conn->prepare("DELETE FROM list
                             WHERE list_id= ?");
$stmt->bind_param("i", $listID);if ($stmt->execute()) {
  echo 1;
} else {
  echo 0;
}
?>
