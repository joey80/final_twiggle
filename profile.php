<?php

require_once('dev/includes/init.php');
require_once('dev/includes/authInit.php');
$title = 'Profile Page';
$user = User::getInstance()->getCurrentUser($userInfo);
$mysqlDate = strtotime($user->created);
require_once('dev/includes/header.php');

?>

	<body>
		<div class="container-fluid">
			<div class="card">
				<img class="card-img-top" src="<?php echo $user->picture ?>" alt="Profile Picture">
				<div class="card-body">
					<h5 class="card-title"><?php echo $user->name ?></h5>
					<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
				</div>
				<ul class="list-group list-group-flush">
					<li class="list-group-item">Email: <?php echo $user->email ?></li>
					<li class="list-group-item">User Since: <?php echo date("F Y", $mysqlDate); ?></li>
				</ul>
				<div class="card-body">
					<a href="index.php" class="card-link">Back To App</a>
					<a href="#" class="card-link">Another link</a>
				</div>
			</div>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<form action="upload_picture.php" method="post" enctype="multipart/form-data">
				<div class="form-group">
					<label>Upload a Profile Picture:</label>
		        	<input type="file" name="file" id="file">
		        	<button class="btn btn-primary" type="submit" name="submit" value="Upload Profile Picture">Upload Profile Picture</button>
		        </div>
	    	</form>

	    	<!-- <form action="upload_picture.php" method="post" enctype="multipart/form-data">
		    	<div class="custom-file">
		    		<label>Upload a Profile Picture:</label>
		    		<input type="file" class="custom-file-input" id="customFile">
		    		<label class="custom-file-label" for="customFile">Choose file</label>
		    		<button class="btn btn-primary" type="submit" name="submit" value="Upload Profile Picture">Upload Profile Picture</button>
				</div>
			</form> -->
		</div>
		
	<?php require_once('dev/includes/footer.php'); ?>