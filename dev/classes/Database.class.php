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
      $dsn = 'mysql:host=' . getenv('DB_HOST') . ';dbname=' . getenv('DB_NAME') . ';charset=utf8';
      static::$_db = new PDO($dsn, getenv('DB_USERNAME'), getenv('DB_PASSWORD'));

      // Raise exceptions when a database exception occurs
      static::$_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    return static::$_db;
  }

}
