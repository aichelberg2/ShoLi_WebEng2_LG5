<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"listID":"5"}';

$input = json_decode($inputRaw);
$listID = mysqli_real_escape_string($conn, $input->listID);

$deleteStatement = " DELETE FROM list
                            WHERE list_id= '$listID'";
$result = mysqli_query($conn, $deleteStatement);
if(mysqli_affected_rows($conn) > 0) {
  echo 1;
  } else {
  echo 0;
}
?>
