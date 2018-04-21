<?php

spl_autoload_register(function ($class) {
  include 'dev/classes/' . $class . '.class.php';
});

?>