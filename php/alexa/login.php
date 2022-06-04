<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");
require '../db_connection.php';
require '/vendor/autoload.php';

use \Firebase\JWT\JWT;

$alexaKey = $_GET["key"];
$alexaUsername = $_GET["username"];
$alexaPassword = $_GET["password"];

$username = mysqli_real_escape_string($conn, $alexaUsername);
$passwordInput = mysqli_real_escape_string($conn, $alexaPassword);

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
    $expirationTime = $issuedAt + 60 * 5; // alexa will refresh the expirationTime before
    $payload = array(                       // every call, so 5min are more than enough
      "usr" => $username,
      "iss" => $issuedAt,
      "exp" => $expirationTime,
      "key" => $alexaKey
    );
    $jwtValue = JWT::encode($payload, $key, 'HS256');

    $updateStmt = $conn->prepare("UPDATE user
                                        SET logged_in = 1
                                        WHERE username=?");
    $updateStmt->bind_param('s', $username); // 's' => 'string', 'i' => 'integer', 'd' => 'double'
    if ($updateStmt->execute()) {
      $data = json_encode(array(
        "token" => $jwtValue,
        "expiry" => $payload["exp"]
      ));
    } else {
      $data = null;
    }
  } else {
    $data = null;
  }
} else {
  $data = null;
}

$fp = fopen("./tokens/" . $username . ".json", 'w');
fwrite($fp, json_encode($data));
fclose($fp);
