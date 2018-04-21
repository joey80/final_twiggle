<?php

require_once('dev/includes/init.php');
require_once('dev/includes/authInit.php');
$title = 'Index Page';
$user = User::getInstance()->getCurrentUser($userInfo);
require_once('dev/includes/header.php');

?>

  <body class="home">
    <div class="container">
      <?php if(!$userInfo): ?>
        <?php require_once('dev/includes/authLogin.php'); ?>
      <?php else: ?>
        <div class="logged-in-box auth0-box logged-in">
          <?php echo $user->name; ?>
          <?php echo $user->user_id; ?>
          <?php echo $user->email; ?>
          <a href="profile.php">Profile Page</a>
          <a class="btn btn-warning btn-logout" href="/demo/logout.php">Logout</a>
        </div>
      <?php endif ?>
    </div>
  </body>

</html>