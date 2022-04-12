<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Allow-Headers: *");

//$postdata = file_get_contents("php://input");
//$request = json_decode($postdata);
//$username = $request->username;
//$pw = $request->pw;
$data = array(
                array('username' => 'lucas123', 'firstname' => 'Lucas', 'eMail' => 'lucas@lucas.de', 'password' => 'test123'),
                array('username' => 'alex123', 'firstname' => 'Alex', 'eMail' => 'alex@alex.de', 'password' => 'test123'),
                array('username' => 'jonas123', 'firstname' => 'Jonas', 'eMail' => 'jonas@jonas.de', 'password' => 'test123'),
                array('username' => 'thomas123', 'firstname' => 'Thomas', 'eMail' => 'thomas@thomas.de', 'password' => 'test123'),
                array('username' => 'freddy123', 'firstname' => 'Freddy', 'eMail' => 'freddy@freddy.de', 'password' => 'test123')
);

//if ($username == $data['username'] && $pw == $data['password']) {
//    echo 1;
//} else {
//    echo 0;
//}
echo json_encode($data);
?>
