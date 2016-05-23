<?php 
$con = new MongoClient();
$coll = $con -> snotes -> customers;
$con -> close;

if($_POST['for'] == "signup") {
	$login = $_POST['login'];
	$pass = sha1($_POST['password']);
	$user = $coll -> findOne(array('login' => $login));
	if(!is_null($user)) {
		echo "Профіль вже існує";
		exit();
	}

	$newUser = array('login' => $login, 'password' => $pass);
	$coll -> insert($newUser);
	$cust = $coll -> findOne(array("login" => $login));
	$hash = sha1(genCode());
	setcookie('id', $cust["_id"], time()+18000);
	setcookie('hash', $hash, time()+18000);
	$coll -> update(array('login' => $login), array('$set' => array('hash' => $hash)), array('upsert' => false));
	echo "ok";
}

if($_POST['for'] == "login") {
	$login = $_POST['login'];
	$pass = sha1($_POST['password']);
	$user = $coll -> findOne(array('login' => $login));
	if($user['password'] === $pass) {
		$hash = sha1(genCode());
		setcookie('id', $user["_id"], time()+18000);
		setcookie('hash', $hash, time()+18000);
		$coll -> update(array('login' => $login), array('$set' => array('hash' => $hash)), array('upsert' => false));
		echo "ok";
	}
	else {
		echo "Логін або пароль невірні";
	}
}

if($_POST['for'] == "checkauth") {
	if(isset($_COOKIE['id']) && isset($_COOKIE['hash'])) {
		$user = $coll -> findOne(array("_id" => new MongoId($_COOKIE['id'])));
		if($user['hash'] !== $_COOKIE['hash']) {
			echo "error";
		} 
		else {
			echo $user['login'];
		}
	}
	else {
		echo "error";
	}
}

if($_POST['for'] == "logout") {
	setcookie('id', "", time()-5000);
	setcookie('hash', "", time()-5000);
}

function genCode($length = 15) {
	$chars = "ZXCVBNMASDFGHJKLQWERTYUIOP1234567890xcvbnmasdfghjklqwertyuiop";
	$code = "";
	while (strlen($code) < $length) {
		$char = $chars[mt_rand(0, strlen($chars)-1)];
		$code .= $char;
	}
	return $code;
}
?>