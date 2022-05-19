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

$listIDStmt = $conn->prepare("SELECT list_id 
                                    FROM list 
                                    WHERE name=? AND creator=? 
                                    LIMIT 1");
$listIDStmt->bind_param("ss", $listName, $username); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
$listIDStmt->execute();
$result = $listIDStmt->get_result();
$listIDRow = $result->fetch_object();
$listId = $listIDRow->list_id;

$prodIDStmt = $conn->prepare("SELECT pr_id
                                    FROM product
                                    WHERE name=?
                                    LIMIT 1");
$prodIDStmt->bind_param("s", $productName); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
$prodIDStmt->execute();
$result = $prodIDStmt->get_result();

if ($prodIDRow = $result->fetch_object()) {
  $productId = $prodIDRow->pr_id;
} else {
  $productPrice = 0.0;
  $productCategory = "Fruits & Vegetables";

  $stmt = $conn->prepare("INSERT INTO product(name, price, category)
                                VALUES(?, ?, ?)");
  $stmt->bind_param("sds", $productName, $productPrice, $productCategory);
  if ($stmt->execute()) {
    $productId = $conn->insert_id;
    echo $productId;
  } else {
    echo 0;
  }
}


$stmt = $conn->prepare("DELETE FROM listproduct(list_id, pr_id)
                                VALUES(?, ?)");
$stmt->bind_param("ii", $listId, $productId); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
if (!$stmt->execute()) {
  echo 0;
} else {
  echo 1;
}
