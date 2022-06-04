<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"listID":"3"}';

$input = json_decode($inputRaw);

$listID = mysqli_real_escape_string($conn, $input->listID);

$stmt = $conn->prepare(   "SELECT listproduct.pr_id, product.name
                                FROM listproduct
                                INNER JOIN product ON listproduct.pr_id=product.pr_id
                                WHERE listproduct.list_id = ?");
$stmt->bind_param('i', $listID); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
$stmt->execute();
$result = $stmt->get_result();
$products = array();
while($row = mysqli_fetch_assoc($result))
{
  $products[] = $row;
}
echo json_encode($products);
