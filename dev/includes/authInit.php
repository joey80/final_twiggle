<?php

  // Require composer autoloader
  require_once($_SERVER [ 'DOCUMENT_ROOT' ] . '/vendor/autoload.php');

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