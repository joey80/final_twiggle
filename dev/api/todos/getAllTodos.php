<?php

	require_once('../dev/includes/init.php');

	$userId = $userInfo['user_id'];

	// User data
	$userData = [
		'userId' => $userId
	];

	// Instantiate todos
	$todos = Todo::getInstance();

	// Return a list of all todos
	$results = $todos->getAllTodos($userData);

	// Display it in JSON format
	echo json_encode($results);

?>