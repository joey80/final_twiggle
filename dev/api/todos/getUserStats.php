<?php

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

	// Instantiate user
	$user = User::getInstance();

	// Return a list of all stats for the user
	$results = $user->getUserStats($userData);

	// Display them in JSON format
	echo json_encode($results);

?>