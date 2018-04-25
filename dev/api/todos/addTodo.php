<?php

	/**
	* addTodo.php
	*
	* First we get the current logged in user's id and the info
	* of the todo that we want to create, then send that
	* to the database class. The user data gets sent in and the
	* todo gets added to the database and the create count from
	* the user's stats gets updated as well.
	*/

	include $_SERVER [ 'DOCUMENT_ROOT' ] . '/demo/dev/includes/authInit.php';
	spl_autoload_register(function ($class) {
	  include $_SERVER [ 'DOCUMENT_ROOT' ] . '/demo/dev/classes/' . $class . '.class.php';
	});

	$user = User::getInstance()->getCurrentUser($userInfo);
	$user_id = $user->user_id;

	// Sanatize the post request
	$POST = filter_var_array($_POST, FILTER_SANITIZE_STRING);
	$name = $POST['name'];
	$created = date("Y-m-d H:i:s");

	// User data
	$userData = [
		'name'    => $name,
		'user_id' => $user_id,
		'created' => $created
	];

	// Instantiate Users
	$user = User::getInstance();

	// Add todo
	$user->addTodo($userData);

	// Update Created total
	$user->updateCreateCount($userData);

?>