<?php

	/**
	* completeTodo.php
	*
	* First we get the current logged in user's id and the id
	* of the todo that we want to complete and then send that
	* to the database class. The user data gets sent in and the
	* todo gets marked as completed in the database and the
	* complete count from the user's stats gets updated as well.
	*/


	include $_SERVER [ 'DOCUMENT_ROOT' ] . '/final_twiggle/dev/includes/authInit.php';
	spl_autoload_register(function ($class) {
	  include $_SERVER [ 'DOCUMENT_ROOT' ] . '/final_twiggle/dev/classes/' . $class . '.class.php';
	});

	$user = User::getInstance()->getCurrentUser($userInfo);
	$user_id = $user->user_id;

	// Sanatize the post request
	$POST = filter_var_array($_POST, FILTER_SANITIZE_STRING);
	$todo_id = $POST['todo_id'];
	$complete = $POST['complete'];

	// User data
	$userData = [
		'user_id'  => $user_id,
		'todo_id'  => $todo_id,
		'complete' => $complete
	];

	// Instantiate User
	$user = User::getInstance();

	// Complete a todo
	$user->completeTodo($userData);

	// Update completed total
	$user->updateCompleteCount($userData);

?>