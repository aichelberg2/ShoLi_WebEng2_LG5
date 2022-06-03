<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';
require '../../../vendor/autoload.php';

use \Firebase\JWT\JWT;

$inputRaw = file_get_contents("php://input");
// $inputRaw = '{"username":"chris","password":"asd123"}';
$input = json_decode($inputRaw);

$username = mysqli_real_escape_string($conn, $input->username);
$passwordInput = mysqli_real_escape_string($conn, $input->password);

$loginStmt = $conn->prepare("SELECT password as password
                                    FROM user
                                    WHERE username=?
                                    LIMIT 1");
$loginStmt->bind_param('s', $username); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
$loginStmt->execute();
$result = $loginStmt->get_result();

if (mysqli_num_rows($result) == 1) {
  $row = $result->fetch_object();
  $savedHash = $row->password;
  $boolv = password_verify($passwordInput, $savedHash);
  if (password_verify($passwordInput, $savedHash)) {
    $key = "SholiIsJustGreat";
    $issuedAt = time();
    $expirationTime = $issuedAt + 60 * 60;
    $payload = array(
      "usr" => $username,
      "iss" => $issuedAt,
      "exp" => $expirationTime
    );
    $jwtValue = JWT::encode($payload, $key, 'HS256');

    $updateStmt = $conn->prepare("UPDATE user
                                        SET logged_in = 1
                                        WHERE username=?");
    $updateStmt->bind_param('s', $username); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
    if ($updateStmt->execute()) {
      echo json_encode(
        array(
          "token" => $jwtValue,
          "expiry" => $payload["exp"]
        )
      );
    } else {
      echo 0;
    }
  } else {
    echo 0;
  }
} else {
  echo 0;
}
