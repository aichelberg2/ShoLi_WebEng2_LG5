<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
require '../db_connection.php';

//$inputRaw = file_get_contents("php://input");
$inputRaw = '{"listname":"List1","isListShared":"true","creator":"user1","usernames":{"0":"user2","1":"user4"}}';
echo "inputRaw: $inputRaw";

$input = json_decode($inputRaw);
$listname = mysqli_real_escape_string($conn, $input->listname);
$isListShared = mysqli_real_escape_string($conn, $input->isListShared);
if ($isListShared == "true") {
  $isListSharedBool = 1;
} else
{
  $isListSharedBool = 0;
}
$creator = mysqli_real_escape_string($conn, $input->creator);
$usernames = $input->usernames;

$listInsertStatement = "INSERT INTO list (name, shared, creator)
                        VALUES ('$listname', '$isListSharedBool', '$creator')";
echo "listInsertStatement: $listInsertStatement";
$last_id = null;
if ($conn->query($listInsertStatement) === TRUE) {
  $last_id = $conn->insert_id;
  echo "New record created successfully. Last inserted ID is: " . $last_id;

  $userlistInsertStatement = "INSERT INTO userlist(list_id, user)
                    VALUES('$last_id', '$creator')";
  $result = mysqli_query($conn, $userlistInsertStatement);
  if (!$result) {
    echo 0;
  }
  foreach ($usernames as $username) {
    $userlistInsertStatement = "INSERT INTO userlist(list_id, user)
                    VALUES('$last_id', '$username')";
    $result = mysqli_query($conn, $userlistInsertStatement);
    if (!$result) {
      echo 0;
    }
  }
}else {
    echo 0;
}
?>
