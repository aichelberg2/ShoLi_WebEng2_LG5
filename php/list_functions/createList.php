<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"listname":"Listname","isListShared":"true","usernames":""}';

$input = json_decode($inputRaw);

$listname = mysqli_real_escape_string($conn, $input->listname);
$isListShared = mysqli_real_escape_string($conn, $input->isListShared);
$usernames = mysqli_real_escape_string($conn, $input->usernames);

$listInsertStatement = "INSERT INTO list (name, shared)
                        VALUES (''$listname'', ''$isListShared'')";
$last_id = null;
if ($conn->query($listInsertStatement) === TRUE) {
  $last_id = $conn->insert_id;
  echo "New record created successfully. Last inserted ID is: " . $last_id;
} else {
  echo "Error: " . $listInsertStatement . "<br>" . $conn->error;
}

foreach ($usernames as $username) {
  $userlistInsertStatement = "INSERT INTO userlist(list_id, user)
                    VALUES('$last_id', '$username')";
  $result = mysqli_query($conn, $userlistInsertStatement);
  if ($result) {
    echo 1;
  } else {
    echo 0;
  }
}
?>
