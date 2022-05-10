<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';


$productName = $_GET["product"];
$listName = $_GET["list"];

echo "productName: ", $productName, ", Listname: ", $listName; 

// $insertStatement = " DELETE FROM listproduct
//                           WHERE list_id= '$listID' AND pr_id='$productID'";
// $result = mysqli_query($conn, $insertStatement);
// if (mysqli_affected_rows() > 0) {
//   echo 1;
// } else {
//   echo 0;
// }
