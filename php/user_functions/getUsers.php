<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
require '../db_connection.php';

$query = "SELECT username FROM user";
$usernames = array();
$result = mysqli_query($conn,$query) or die(mysqli_error());
while($row = mysqli_fetch_assoc($result))
{
  $usernames[] = $row;
}
echo $usernames;
?>

