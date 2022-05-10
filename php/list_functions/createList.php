<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"listname":"List2","isListShared":"true","creator":"user1","usernames":{"0":"user2","1":"user3"}}';
//echo "inputRaw: $inputRaw";

$input = json_decode($inputRaw);
$listname = mysqli_real_escape_string($conn, $input->listname);
$isListShared = mysqli_real_escape_string($conn, $input->isListShared);
if ($isListShared == "true") {
  $isListSharedBool = 1;
} else {
  $isListSharedBool = 0;
}
$creator = mysqli_real_escape_string($conn, $input->creator);
$usernames = $input->usernames;

$listInsertStatement = "INSERT INTO list (name, shared, creator)
                        VALUES ('$listname', '$isListSharedBool', '$creator')";
//echo "listInsertStatement: $listInsertStatement";
$list_id = null;
if ($conn->query($listInsertStatement) === TRUE) {
  $list_id = $conn->insert_id;
  //echo "New record created successfully. Last inserted ID is: " . $list_id;

  $userlistInsertStatement = "INSERT INTO userlist(list_id, user)
                    VALUES('$list_id', '$creator')";
  $result = mysqli_query($conn, $userlistInsertStatement);
  if (!$result) {
    echo 0;
  } else {
    foreach ($usernames as $username) {
      $userlistInsertStatement = "INSERT INTO userlist(list_id, user)
                    VALUES('$list_id', '$username')";
      $result = mysqli_query($conn, $userlistInsertStatement);
      if (!$result) {
        echo 0;
      }
    }
    echo $list_id;
  }
}
?>
