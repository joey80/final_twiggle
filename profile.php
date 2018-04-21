<?php

require_once('dev/includes/init.php');
require_once('dev/includes/authInit.php');
$title = 'Profile Page';
$user = User::getInstance()->getCurrentUser($userInfo);
$mysqlDate = strtotime($user->created);
require_once('dev/includes/header.php');

?>

	<body>
		This is the profile page. Back to <a href="index.php">index</a><br />
		User Name: <?php echo $user->name ?><br />
		Email: <?php echo $user->email ?><br />
		User Since: <?php echo date("F Y", $mysqlDate); ?><br />
		Profile Pic:<br />
		<img src="<?php echo $user->picture ?>" />
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<p>&nbsp;</p>
		<form action="upload_picture.php" method="post" enctype="multipart/form-data">
			<label>Upload a Profile Picture:</label>
        	<input type="file" name="file" id="file">
        	<button class="ui primary button" type="submit" name="submit" value="Upload Profile Picture">Upload Profile Picture</button>
    	</form>
	</body>
</html>