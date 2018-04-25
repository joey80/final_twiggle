<?php

require_once('dev/includes/init.php');
require_once('dev/includes/authInit.php');
$title = 'Index Page';
$user = User::getInstance()->getCurrentUser($userInfo);
require_once('dev/includes/header.php');

?>

  <body class="home"> <!-- ////////////    BREAK THIS INTO 3 DIFERENT INCLUDES     //////////  -->
    <div class="container-fluid">
      <?php if(!$userInfo): ?>
        <?php require_once('dev/includes/authLogin.php'); ?>
      <?php else: ?>
        <div class="jumbotron">
          <h1 class="display-4 text-center">Twiggle</h1>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="What Do You Need To Do?" aria-label="What Do You Need To Do?" aria-describedby="basic-addon2">
            <div class="input-group-append">
              <button class="btn btn-lg" type="button">Add Todo</button>
            </div>
          </div>
        </div>
        <ul class="nav justify-content-center nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" id="pills-todos-tab" data-toggle="pill" href="#pills-todos" role="tab" aria-controls="pills-home" aria-selected="true">Todos</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="pills-stats-tab" data-toggle="pill" href="#pills-stats" role="tab" aria-controls="pills-profile" aria-selected="false">Stats</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-contact" aria-selected="false">Profile</a>
          </li>
        </ul>
        <div class="tab-content text-center" id="pills-tabContent">
          <div class="tab-pane fade show active" id="pills-todos" role="tabpanel" aria-labelledby="pills-todos-tab">
            This is the todo page
          </div>
          <div class="tab-pane fade" id="pills-stats" role="tabpanel" aria-labelledby="pills-stats-tab">
            This is the STATS page<br />
            <?php echo $user->name; ?>
            <?php echo $user->user_id; ?>
            <?php echo $user->email; ?>
          </div>
          <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            This is the user <a href="profile.php">Profile Page</a><br />
            <a class="btn btn-primary" href="/final_twiggle/logout.php">Logout</a>
          </div>
        </div>
      <?php endif ?>
    </div>

    <?php require_once('dev/includes/footer.php'); ?>