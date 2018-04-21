<?php

	require_once('../dev/includes/init.php');

	// Sanatize the post request
	$POST   = filter_var_array($_POST, FILTER_SANITIZE_STRING);
	$id     = $POST['id'];
	$userId = $userInfo['user_id'];

	// User data
	$userData = [
		'userId' => $userId,
		'id'     => $id
	];

	// Instantiate User
	$user = User::getInstance();

	// Delete todo
	$user->deleteTodo($userData);

	// Update deleted total
	$user->updateDeleteCount($userData);

?>