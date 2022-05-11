<?php
//for cors
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';

$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"username":"user5"}';

$input = json_decode($inputRaw);

$username = mysqli_real_escape_string($conn, $input->username);

$stmt = $conn->prepare(   "SELECT userlist.list_id, list.name
                                FROM userlist
                                INNER JOIN list ON userlist.list_id=list.list_id
                                WHERE userlist.user = ?");
$stmt->bind_param('s', $username); // 's' specifies the variable type => 'string'
$stmt->execute();
$result = $stmt->get_result();
$lists = array();
while($row = mysqli_fetch_assoc($result))
{
  $lists[] = $row;
}
echo json_encode($lists);
?>
