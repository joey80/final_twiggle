<?php

  /**
  * profile.php
  *
  * Include file for profile section inside the app.
  *
  */

  $mysqlDate = strtotime($user->created);

?>

<div class="card">
  <img class="card-img-top" src="<?php echo $user->picture ?>" alt="Profile Picture">
  <div class="card-body">
    <h5 class="card-title"><?php echo $user->name ?></h5>
    <p><a class="btn btn-primary" href="/final_twiggle/logout.php">Logout</a></p>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">User ID: <?php echo $user->user_id ?></li>
    <li class="list-group-item">Email: <?php echo $user->email ?></li>
    <li class="list-group-item">User Since: <?php echo date("F Y", $mysqlDate); ?></li>
  </ul>
</div>
<div class="card">
  <div class="card-body">
    <form action="upload_picture.php" method="post" enctype="multipart/form-data">
      <div class="form-group">
        <label>Upload a Profile Picture:</label>
        <input type="file" name="file" id="file">
        <button class="btn btn-primary" type="submit" name="submit" value="Upload Profile Picture">Upload Profile Picture</button>
      </div>
    </form>
  </div>
</div>