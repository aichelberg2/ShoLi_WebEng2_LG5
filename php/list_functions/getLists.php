<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"username":"user1"}';

$input = json_decode($inputRaw);

$username = mysqli_real_escape_string($conn, $input->username);

$query = "SELECT userlist.list_id, list.name
            FROM userlist
            INNER JOIN list ON userlist.list_id=list.list_id
            WHERE userlist.user = '$username'";
$result = mysqli_query($conn,$query) or die(mysqli_error());
$lists = array();
while($row = mysqli_fetch_assoc($result))
{
  $lists[] = $row;
}
echo json_encode($lists);
?>
