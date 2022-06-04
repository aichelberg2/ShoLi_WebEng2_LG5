<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';
require '/vendor/autoload.php';

use \Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = "SholiIsJustGreat";

$productName = $_GET["product"];
$listName = $_GET["list"];
$jwtInput = $_GET["jwt"];
$alexaKey = $_GET["key"];
$timestamp = $_GET["timestamp"];
$jwt = json_decode($jwtInput);


if ($jwt) {
  try {
    $jwtValue = JWT::decode($jwt->token, new Key($key, 'HS256'));
    //alt: $username = mysqli_real_escape_string($conn, $inputRaw);
    if ($jwtValue->key == $alexaKey) {
      $username = mysqli_real_escape_string($conn, $jwtValue->usr);

      $listIDStmt = $conn->prepare("SELECT list_id 
                                      FROM list 
                                      WHERE name=? AND creator=? 
                                      LIMIT 1");
      $listIDStmt->bind_param("ss", $listName, $username); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
      $listIDStmt->execute();
      $result = $listIDStmt->get_result();
      $listIDRow = $result->fetch_object();
      $listId = $listIDRow->list_id;

      if (
        !str_contains($productName, " assistent") &&
        !str_contains($productName, " füg") &&
        !str_contains($prodcutName, " mein")
      ) {  // in case alexa triggered with the wrong words
        // in following versions this should be done by alexa:
        $productName = strtolower($productName);    // alexa can have own filters with word that belong in a 
        // variable and the ones that don't
        $prodIDStmt = $conn->prepare("SELECT pr_id
                                        FROM product
                                        WHERE LOWER(name)=?
                                        LIMIT 1");
        $prodIDStmt->bind_param("s", $productName); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
        $prodIDStmt->execute();
        $result = $prodIDStmt->get_result();

        if ($prodIDRow = $result->fetch_object()) {
          $productId = $prodIDRow->pr_id;

          $stmt = $conn->prepare("DELETE FROM listproduct
                                          WHERE list_id=? AND pr_id=?");
          $stmt->bind_param("ii", $listId, $productId); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
          if (!$stmt->execute()) {
            $result = "0";
          } else {
            $result = "1";
          }
        }
      } else {
        $result = "0";
      }
    }
  } catch (Exception $e) {
    $result = "0";
  } finally {
    $fp = fopen("./responses/" . $timestamp . ".txt", 'w');
    fwrite($fp, $result);
    fclose($fp);
  }
} else {
  if ($timestamp) {
    $fp = fopen("./responses/" . $timestamp . ".txt", 'w');
    fwrite($fp, "0");
    fclose($fp);
  }
}
