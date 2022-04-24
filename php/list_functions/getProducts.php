<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"listID":"1"}';

$input = json_decode($inputRaw);

$listID = mysqli_real_escape_string($conn, $input->listID);

$query = "SELECT listproduct.pr_id, product.name
            FROM listproduct
            INNER JOIN product ON listproduct.pr_id=product.pr_id
            WHERE listproduct.list_id = '$listID'";
$result = mysqli_query($conn,$query) or die(mysqli_error());
$products = array();
while($row = mysqli_fetch_assoc($result))
{
  $products[] = $row;
}
echo json_encode($products);
?>
