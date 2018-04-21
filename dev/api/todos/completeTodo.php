<?php


	// NEED TO LOOK AT HOW TODO ID IS BEING HANDLED

	require_once('../dev/includes/init.php');

	// Sanatize the post request
	$POST     = filter_var_array($_POST, FILTER_SANITIZE_STRING);
	$id       = $POST['id'];
	$complete = $POST['complete'];
	$userId   = $userInfo['user_id'];

	// User data
	$userData = [
		'user_id'  => $userId,
		'todo_id'  => $id,
		'complete' => $complete
	];

	// Instantiate User
	$user = User::getInstance();

	// Complete a todo
	$user->completeTodo($userData);

	// Update completed total
	$user->updateCompleteCount($userData);

?>