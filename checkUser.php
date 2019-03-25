<?php

	/**
	* checkUser.php
	*
	* After logging in the user gets redirected to this page.
	* First we check to see if any name indexes are undefined and
	* then we send all of the user data to the DB to check if
	* the user has signed up before. If not, we add them and
	* then redirect to the index page.
	*/

	spl_autoload_register(function ($class) {
		include $_SERVER [ 'DOCUMENT_ROOT' ] . '/dev/classes/' . $class . '.class.php';
	});

	require_once($_SERVER [ 'DOCUMENT_ROOT' ] . '/dev/includes/authInit.php');

	// Check for Undefined fields for the first and last names
	if (!isset($userInfo['given_name'])) {
	    $userInfo['given_name'] = 'Todo';
	}
	if (!isset($userInfo['family_name'])) {
	    $userInfo['family_name'] = 'User';
	}

	$auth0_email = $userInfo['email'];
	$auth0_picture = $userInfo['picture'];
	$auth0_firstName = $userInfo['given_name'];
	$auth0_lastName = $userInfo['family_name'];
	$auth0_fullName = '' . $auth0_firstName . ' ' . $auth0_lastName . '';

	// User data
	$userData = [
	  'email'       => $auth0_email,
	  'picture'     => $auth0_picture,
	  'given_name'  => $auth0_firstName,
	  'family_name' => $auth0_lastName,
	  'full_name'   => $auth0_fullName
	];

	// Instantiate Users
	$user = User::getInstance();

	// Get the email from auth0 and see if they are in our database
	// If they aren't then create a new user using auth0 info
	// If they are then pass the result of the check back to the app
	$user->handleUser($userData);

	//Util::redirect('index.php');

?>