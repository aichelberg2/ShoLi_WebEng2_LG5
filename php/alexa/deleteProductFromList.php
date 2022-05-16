<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';


$productName = $_GET["product"];
$listName = $_GET["list"];
$username = $_GET["username"];

$listIDStmt = $conn->prepare("SELECT TOP 1 list_id
                                        FROM list
                                        WHERE name=? AND creator=?");
$listIDStmt->bind_param("ss", $listName, $username); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
$result = $listIDStmt->get_result();
$listIDRow = $result->fetch_object();
$listId = $listIDRow->list_id;

$prodIDStmt = $conn->prepare("SELECT TOP 1 pr_id
                                        FROM product
                                        WHERE name=?");
$prodIDStmt->bind_param("s", $productName); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
$result = $prodIDStmt->get_result();
$prodIDRow = $result->fetch_object();
$productID = $prodIDRow->pr_id;

$stmt = $conn->prepare("DELETE FROM listproduct(list_id, pr_id)
                                VALUES(?, ?)");
$stmt->bind_param("ii", $listId, $productID); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
if (!$stmt->execute()) {
  echo 0;
} else {
  echo 1;
}
