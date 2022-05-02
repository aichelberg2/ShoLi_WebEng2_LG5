<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"productCategory":"kat1"}';

$input = json_decode($inputRaw);

$productCategory = mysqli_real_escape_string($conn, $input->productCategory);

$query = "SELECT pr_id, name
            FROM product
            WHERE category = '$productCategory'";
$result = mysqli_query($conn,$query) or die(mysqli_error());
$lists = array();
while($row = mysqli_fetch_assoc($result))
{
  $lists[] = $row;
}
echo json_encode($lists);
?>
