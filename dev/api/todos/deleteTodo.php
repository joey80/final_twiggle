<?php

	/**
	* deleteTodo.php
	*
	* First we get the current logged in user's id and the id
	* of the todo that we want to delete and then send that
	* to the database class. The user data gets sent in and the
	* todo gets deleted from the database and the delete count from
	* the user's stats gets updated as well.
	*/

	include $_SERVER [ 'DOCUMENT_ROOT' ] . '/dev/includes/authInit.php';
	spl_autoload_register(function ($class) {
	  include $_SERVER [ 'DOCUMENT_ROOT' ] . '/dev/classes/' . $class . '.class.php';
	});

	$user = User::getInstance()->getCurrentUser($userInfo);
	$user_id = $user->user_id;

	// Sanatize the post request
	$POST = filter_var_array($_POST, FILTER_SANITIZE_STRING);
	$todo_id = $POST['todo_id'];

	// User data
	$userData = [
		'user_id' => $user_id,
		'todo_id' => $todo_id
	];

	// Instantiate User
	$user = User::getInstance();

	// Delete todo
	$user->deleteTodo($userData);

	// Update deleted total
	$user->updateDeleteCount($userData);

?>