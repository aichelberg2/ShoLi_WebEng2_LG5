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
$inputRaw = file_get_contents("php://input");
// echo $inputRaw;
$input = json_decode($inputRaw);

if ($input) {
  try {
    $jwt = $input->jwt;
    $jwtValue = JWT::decode($jwt, new Key($key, 'HS256'));
    //alt: $username = mysqli_real_escape_string($conn, $inputRaw);
    $creator = mysqli_real_escape_string($conn, $jwtValue->usr);
    $listname = mysqli_real_escape_string($conn, $input->listname);
    $isListShared = mysqli_real_escape_string($conn, $input->isListShared);
    if ($isListShared == true) {
      $isListSharedBool = 1;
    } else {
      $isListSharedBool = 0;
    }
    $usernames = $input->usernames;

    $listInsertStmt = $conn->prepare("INSERT INTO list (name, shared, creator)
                                        VALUES (?, ?, ?)");
    $listInsertStmt->bind_param("sis", $listname, $isListSharedBool, $creator); // 's' => 'string', 'i' => 'integer', 'd' => 'double'

    //echo "listInsertStatement: $listInsertStatement";
    $list_id = null;
    if ($listInsertStmt->execute()) {
      $list_id = $conn->insert_id;
      //echo "New record created successfully. Last inserted ID is: " . $list_id;

      $creatorInsertStmt = $conn->prepare("INSERT INTO userlist(list_id, user)
                                                VALUES(?, ?)");
      $creatorInsertStmt->bind_param("is", $list_id, $creator); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
      if (!$creatorInsertStmt->execute()) {
        echo 0;
      } else {
        foreach ($usernames as $username) {
          $usersInsertStmt = $conn->prepare("INSERT INTO userlist(list_id, user)
                                                VALUES(?, ?)");
          $usersInsertStmt->bind_param("is", $list_id, $username); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
          if (!$usersInsertStmt->execute()) {
            echo 0;
          }
        }
        echo $list_id;
      }
    } else {
      echo 0;
    }
  } catch (Exception $e) {
    echo 0;
  }
}
