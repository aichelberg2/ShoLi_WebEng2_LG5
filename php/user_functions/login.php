<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';
$inputRaw = file_get_contents("php://input");
//$inputRaw = '{"username":"user1","pw":"1"}';
$input = json_decode($inputRaw);

$username = mysqli_real_escape_string($conn, $input->username);
$passwordInput = mysqli_real_escape_string($conn, $input->pw);

$loginStmt = $conn->prepare(  "SELECT password as pw
                                    FROM user
                                    WHERE username=?
                                    LIMIT 1");
$loginStmt->bind_param('s', $username); // 's' specifies the variable type => 'string'
$loginStmt->execute();
$result = $loginStmt->get_result();

if (mysqli_num_rows($result) == 1) {
  $row = $result->fetch_object();
  $savedHash = $row->pw;
  $boolv = password_verify($passwordInput, $savedHash);
  if (password_verify($passwordInput, $savedHash)) {
    $updateStmt = $conn->prepare(  "UPDATE user
                                        SET logged_in = 1
                                        WHERE username=?");
    $updateStmt->bind_param('s', $username); // 's' specifies the variable type => 'string'
    if ($updateStmt->execute()) {
      echo 1;
    } else {
      echo 0;
    }
  } else {
    echo 0;
  }
} else {
  echo 0;
}
?>
