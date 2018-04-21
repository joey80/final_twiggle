<?php

	require_once('../dev/includes/init.php');

	$userId = $userInfo['user_id'];

	// User data
	$userData = [
		'userId' => $userId
	];

	// Instantiate todos
	$todos = Todo::getInstance();

	// Return the last todo entered
	$results = $todos->getLastTodo($userData);

	// Display it in JSON format
	echo json_encode($results);

?>