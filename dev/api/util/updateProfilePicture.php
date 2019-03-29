<?php

	/**
	* updateProfilePicture.php
	*
	*/

	require $_SERVER [ 'DOCUMENT_ROOT' ] . '/vendor/autoload.php';
	include $_SERVER [ 'DOCUMENT_ROOT' ] . '/dev/includes/authInit.php';

	spl_autoload_register(function ($class) {
	  include $_SERVER [ 'DOCUMENT_ROOT' ] . '/dev/classes/' . $class . '.class.php';
	});

	if (isset($_FILES['myFile'])) {

		$user = User::getInstance()->getCurrentUser($userInfo);
		$user_id = $user->user_id;
		$filename = $_FILES['myFile']['name'];
	    $file_basename = substr($filename, 0, strripos($filename, '.')); // get file name
	    $file_ext = substr($filename, strripos($filename, '.')); // get file extention
		//$newfilename = md5($file_basename) . $file_ext;
		$newfilename = $file_basename . $file_ext;
        //$url_to_uploads = 'public/uploads/';

        // $userData = [
        // 	'user_id' => $user_id,
		// 	'picture' => $newfilename
		// 	// 'picture' => $url_to_uploads . $newfilename
        // ];

        // // Instantiate Users
		// $user = User::getInstance();

		// // Update the profile picture URL
		// $user->addProfilePicture($userData);
		\Cloudinary\Uploader::upload($_FILES['myFile']);

        // if (file_exists($_SERVER [ 'DOCUMENT_ROOT' ] . "/public/uploads/" . $newfilename)) {
        //     exit;
        // } else {
        // 	move_uploaded_file($_FILES["myFile"]["tmp_name"], $_SERVER [ 'DOCUMENT_ROOT' ] . "/public/uploads/" . $newfilename);
	    // 	exit;
		// }
	}
?>