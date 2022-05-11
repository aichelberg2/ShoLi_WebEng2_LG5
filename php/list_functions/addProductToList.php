<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"listID":"3","productIDs":{"0":"1","1":"2"}}';

$input = json_decode($inputRaw);
$listID = mysqli_real_escape_string($conn, $input->listID);
$productIDs = $input->productIDs;

foreach ($productIDs as $productID){
  $stmt = $conn->prepare( "INSERT INTO listproduct(list_id, pr_id)
                                VALUES(?, ?)");
  $stmt->bind_param("ii", $listID,$productID);
  if (!$stmt->execute()) {
    echo 0;
  }
}
echo 1;
?>
