<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"listID":"3","productID":"2"}';

$input = json_decode($inputRaw);
$listID = mysqli_real_escape_string($conn, $input->listID);
$productID = mysqli_real_escape_string($conn, $input->productID);

$stmt = $conn->prepare(   "DELETE FROM listproduct
                                WHERE list_id=? AND pr_id=?");
$stmt->bind_param("ii", $listID,$productID); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
if ($stmt->execute()) {
  if($stmt->affected_rows > 0) {
    echo 1;
  } else {
    echo 0;
  }
} else {
  echo 0;
}
?>
