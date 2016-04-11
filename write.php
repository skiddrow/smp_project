<?php
$con = new MongoClient();
$collection = $con -> Notes -> users;

$myfile  = fopen("users.txt","w");

$users = $collection -> find();
while($document = $users -> getNext())
{
	$user = "Login: ".$document['login']." | Password: ".$document['password'].";\r\n";
    fwrite($myfile, $user);
}
fclose($myfile);
$con -> close();
?>
