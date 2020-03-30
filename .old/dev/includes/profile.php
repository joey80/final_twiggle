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
  <div id="profile-picture-container">
    <img class="card-img-top todo-profile-image" src="<?php echo $user->picture ?>" alt="Profile Picture">
  </div>
  <div class="card-body">
    <h3 class="card-title"><?php echo $user->name ?></h3>
    <?php echo $user->email ?>
    <p class="card-text">User Since: <?php echo date("F Y", $mysqlDate); ?></p>
    <p><a class="btn btn-dark btn-sm" href="/logout.php">Logout</a></p>
    <hr>
    <form method="post" enctype="multipart/form-data">
      <label><strong>Change Profile Picture</strong></label><br />
      <label><span class="small text-muted">Must be a .JPG, .PNG, or .GIF and 5MB or less in size</span></label><br />
      <input type="file" class="filestyle" data-placeholder="No file" name="file" id="todo-image-file" hidden><br />
      <button class="btn btn-outline-primary" id="update-profile-picture-button" type="submit" name="submit" value="Upload Profile Picture">Upload</button>
    </form>
  </div>
</div>