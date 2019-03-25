<?php
 
/**
 * Database class
 *
 * @author Joey Leger
 * @author www.joeyui.com
 */

class Database {

  private static $_db;  // singleton connection object
  private function __construct() {}  // disallow creating a new object of the class with new Database()
  private function __clone() {}  // disallow cloning the class




  /**
  * Get the instance of the PDO connection
  *
  * @return DB  PDO connection
  */

  public static function getInstance() {
    if (static::$_db === NULL) {
      
      $url = parse_url(getenv("CLEARDB_DATABASE_URL"));

      $server = $url["host"];
      $username = $url["user"];
      $password = $url["pass"];
      $db_name = substr($url["path"], 1);
      
      $dsn = 'mysql:host=' . $server . ';dbname=' . $db_name . ';charset=utf8';
      static::$_db = new PDO($dsn, $username, $password);

      // Raise exceptions when a database exception occurs
      static::$_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    return static::$_db;
  }

}
