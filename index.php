<?php

//require_once('../dev/includes/init.php');
//require_once('../dev/includes/authInit.php');
$title = 'Twiggle - A Todo App';
//$user = User::getInstance()->getCurrentUser($userInfo);
require_once('dev/includes/header.php');

use Auth0\SDK\Auth0;

$auth0 = new Auth0([
  'domain'                => getenv('AUTH0_DOMAIN'),
  'client_id'             => getenv('AUTH0_CLIENT_ID'),
  'client_secret'         => getenv('AUTH0_CLIENT_SECRET'),
  'redirect_uri'          => getenv('AUTH0_CALLBACK_URL'),
  'audience'              => getenv('AUTH0_AUDIENCE'),
  'scope'                 => 'openid profile',
  'persist_id_token'      => true,
  'persist_access_token'  => true,
  'persist_refresh_token' => true,
]);

$userInfo = $auth0->getUser();

?>

  <body class="home">

    <!-- ERROR MODAL -->
    <?php require_once('dev/includes/modal.php'); ?>

    <?php if (!$userInfo) {
        // We have no user info
        // redirect to Login
        echo 'You need to login first';
    } else {
        // User is authenticated
        // Say hello to $userInfo['name']
        // print logout button
        echo 'Hello ' . $userInfo['name'];
    }
    
    ?>

    <!-- START APP CONTAINER -->
    <div class="todo-header fixed-top">

        <!-- START HEADER CONTAINER -->
        <div class="container-fluid">
          
          <!-- LOGO AND TODO INPUT SECTION -->
          <div class="jumbotron">
            <span class="app-title">Twiggle</span><span class="app-subtitle"> - A Todo App</span>
            <form class="input-group todo-form mb-3">
              <input type="text" class="form-control" id="todo-input" autocomplete="off" placeholder="What Do You Need To Do?" aria-label="What Do You Need To Do?" aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn todoButton" id="todo-button" type="button">Add Todo</button>
              </div>
            </form>
          </div>

          <!-- NAVIGATION SECTION -->
          <ul class="nav justify-content-center nav-pills mb-3 todo-nav" id="pills-tab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="pills-todos-tab" data-toggle="pill" href="#pillTodos" role="tab" aria-controls="pills-home" aria-selected="true">Todos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="pills-stats-tab" data-toggle="pill" href="#pillStats" role="tab" aria-controls="pills-profile" aria-selected="false">Stats</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pillProfile" role="tab" aria-controls="pills-contact" aria-selected="false">Profile</a>
            </li>
          </ul>

        <!-- END HEADER CONTAINER -->
        </div>

    <!-- END HEADER -->  
    </div>

    <!-- START CONTENT CONTAINER -->
    <div class="container-fluid todo-content">


      <!-- CONTENT SECTION -->
      <div class="tab-content text-center" id="pills-tabContent">
        <div class="tab-pane fade show active" id="pillTodos" role="tabpanel" aria-labelledby="pills-todos-tab">
          <!-- TODOS -->
        </div>
        <div class="tab-pane fade" id="pillStats" role="tabpanel" aria-labelledby="pills-stats-tab">
          <!-- STATS -->
        </div>
        <div class="tab-pane fade" id="pillProfile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <!-- PROFILE -->
          <?php require_once('dev/includes/profile.php'); ?>
        </div>
      </div>

    <!-- END APP CONTAINER -->
    </div>

  <!-- FOOTER SECTION -->
  <?php require_once('dev/includes/footer.php'); ?>