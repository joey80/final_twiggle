<?php

	require_once('../dev/includes/init.php');

	// Sanatize the post request
	$POST    = filter_var_array($_POST, FILTER_SANITIZE_STRING);
	$name    = $POST['name'];
	$userId  = $userInfo['user_id'];
	$created = date("Y-m-d H:i:s");

	// User data
	$userData = [
		'name'    => $name,
		'user_id' => $userId,
		'created' => $created
	];

	// Instantiate Users
	$user = User::getInstance();

	// Add todo
	$user->addTodo($userData);

	// Update Created total
	$user->updateCreateCount($userData);
?>