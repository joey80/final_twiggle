<?php

	require_once('../dev/includes/init.php');

	$userId = $userInfo['user_id'];

	// User data
	$userData = [
		'userId' => $userId
	];

	// Instantiate user
	$user = User::getInstance();

	// Return a list of all stats for the user
	$results = $user->getUserStats($userData);

	// Display them in JSON format
	echo json_encode($results);

?>