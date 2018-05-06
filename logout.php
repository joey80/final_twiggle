<?php

session_start();

require_once('dev/includes/authInit.php');

$auth0->logout(); 
session_destroy();
header('Location: http://' . $_SERVER['HTTP_HOST'] . '/final_twiggle/');
die();

?>