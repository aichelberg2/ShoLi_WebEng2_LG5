<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"username":"lucas234"}';

$input = json_decode($inputRaw);

$username = mysqli_real_escape_string($conn, $input->username);

$query = "SELECT list_id FROM userlist WHERE user='$username'";
$listIDs = array();
$result = mysqli_query($conn,$query) or die(mysqli_error());
while($row = mysqli_fetch_assoc($result))
{
  $listIDs[] = $row;
}
echo json_encode($listIDs);
?>
