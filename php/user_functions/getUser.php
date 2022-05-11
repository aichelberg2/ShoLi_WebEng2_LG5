<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"username":"user5"}';
$input = json_decode($inputRaw);
//alt: $username = mysqli_real_escape_string($conn, $inputRaw);
$username = mysqli_real_escape_string($conn, $input->username);

$stmt = $conn->prepare(   "SELECT username, firstname, lastname, email, logged_in
                                FROM user
                                WHERE username=?
                                LIMIT 1");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
if (mysqli_num_rows($result) == 1) {
  $row = $result->fetch_object();
  echo json_encode($row);
} else {
  echo 0;
}
?>
