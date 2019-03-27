<?php

	/**
	* getUserStats.php
	*
	* First we get the current logged in user's id and send that
	* to the database class. The user data gets sent in and the
	* stats from the user get sent back as a JSON object.
	* IE: todos created, todos completed, todos deleted
	*/

	include $_SERVER [ 'DOCUMENT_ROOT' ] . '/dev/includes/authInit.php';
	spl_autoload_register(function ($class) {
	  include $_SERVER [ 'DOCUMENT_ROOT' ] . '/dev/classes/' . $class . '.class.php';
	});

	$user = User::getInstance();
	$user->getCurrentUser($userInfo);
	//$user_id = $user->user_id;

	// User data
	$userData = [
		'user_id' => $user['user_id']
	];

	// Instantiate user
	//$user = User::getInstance();

	// Return a list of all stats for the user
	$results = $user->getUserStats($userData);

	// Display them in JSON format
	echo json_encode($results);

?>