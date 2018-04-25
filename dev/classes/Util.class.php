<?php
 
/**
 * Utilities class
 *
 * @author Joey Leger
 * @author www.joeyui.com
 */

class Util {

  /**
  * Redirect to a different page
  *
  * @param string $url  The relative URL
  * @return void
  */

  public static function redirect($url) {
    header('Location: http://' . $_SERVER['HTTP_HOST'] . '/final_twiggle/' . $url);
    exit;
  }

}

?>