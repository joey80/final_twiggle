<?php

	/**
	* getLastTodo.php
	*
	* First we get the current logged in user's id and send that
	* to the database class. The user data gets sent in and the
	* last todo from that user gets returned as a JSON object.
	*/

	include $_SERVER [ 'DOCUMENT_ROOT' ] . '/demo/dev/includes/authInit.php';
	spl_autoload_register(function ($class) {
	  include $_SERVER [ 'DOCUMENT_ROOT' ] . '/demo/dev/classes/' . $class . '.class.php';
	});

	$user = User::getInstance()->getCurrentUser($userInfo);
	$user_id = $user->user_id;

	// User data
	$userData = [
		'user_id' => $user_id
	];

	// Instantiate todos
	$todos = Todo::getInstance();

	// Return the last todo entered
	$results = $todos->getLastTodo($userData);

	// Display it in JSON format
	echo json_encode($results);

?>