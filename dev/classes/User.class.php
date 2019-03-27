<?php
 
/**
* Represents a user
*
* @author Joey Leger
* @author www.joeyui.com
*/

class User {

  private static $instance;
  private static $currentUser;
  private function __construct() {}




  /**
  * Get the singleton instance
  *
  * @param none
  * @return class instance
  */

  public static function getInstance() {

    if (static::$instance === NULL) {
      static::$instance = new User();
    }
    return static::$instance;
  }




  /**
  * isAlreadyUser - Find the user with the specified email address
  *
  * @param string $email email address
  * @return mixed User object if found, null otherwise
  */

  public static function isAlreadyAUser($data) {

    try {

      $db = Database::getInstance();

      $stmt = $db->prepare('SELECT * FROM users WHERE email = :email LIMIT 1');
      $stmt->execute([':email' => $data['email']]);
      $result = $stmt->fetchObject('User');

      // Create a new user if we can't find this user in the database
      if (!$result) {
        static::createNewUser($data);

      } else {
        static::$currentUser = $result;
        return static::$currentUser;
      }

    } catch(PDOException $exception) {
      error_log($exception->getMessage());
    }
  }
  



  /**
  * getCurrentUser - Get the current logged in user
  *
  * @return mixed  User object if logged in, null otherwise
  */

  public function getCurrentUser($data) {

    if (static::$currentUser['email'] === $data['email']) {
      return static::$currentUser;

    } else {
      // Check if this user already has an account
      return static::isAlreadyAUser($data);
    }

  }




  /**
  * createANewUser - creates a new user
  *
  * @param array $data POST data
  * @return User
  */

  public static function createNewUser($data) {

    try {

      $db = Database::getInstance();

      $stmt = $db->prepare('INSERT INTO users (name, email, picture) VALUES (:full_name, :email, :picture)');
      $stmt->bindParam(':full_name', $data['full_name']);
      $stmt->bindParam(':email', $data['email']);
      $stmt->bindParam(':picture', $data['picture']);
      $stmt->execute();

      // After creating the user, return the full user object by calling isAlreadyAUser
      isAlreadyAUser($data);

      } catch(PDOException $exception) {
        error_log($exception->getMessage());
      }
  }




  /**
  * handleUser - checks if user exists in our DB. If not, adds the user
  *
  * @param array $data POST data from auth0
  * @return User
  */

  public static function handleUser($data) {

    return static::isAlreadyAUser($data);

  }




  /**
  * addProfilePicture - Creates a new profile picture
  *
  * @param $data - An associative array of user data
  * @return True or false if successful
  */

  public function addProfilePicture($data) {

    $db = Database::getInstance();

    $stmt = $db->prepare('UPDATE users SET picture = :picture WHERE user_id = :user_id');
    $stmt->bindParam(':picture', $data['picture']);
    $stmt->bindParam(':user_id', $data['user_id']);
    $stmt->execute();
  }




  /**
  * getUserStats - Get a list of all of the user's stats (created, completed, deleted)
  *
  * @param $data - An associative array of user data
  * @return $results - Returns a PDO fetch all of all stats for that user
  */

  public function getUserStats($data) {
  
    try {

      $db = Database::getInstance();

      $stmt = $db->prepare('SELECT * from users WHERE user_id = :user_id');
      $stmt->execute(array(':user_id' => $data['user_id']));
      $stats = $stmt->fetchAll(PDO::FETCH_OBJ);

      if($stats !== false) {
        return $stats;
      }

    } catch(PDOException $exception) {
      error_log($exception->getMessage());
    }
  }




  /**
  * addTodo - Creates a new todo item
  *
  * @param $data - An associative array of user data
  * @return True or false if successful
  */
  public function addTodo($data) {

    try {

      $db = Database::getInstance();

      $stmt = $db->prepare('INSERT INTO todo (name, user_id, created) VALUES (:name, :user_id, :created)');
      $stmt->bindParam(':name', $data['name']);
      $stmt->bindParam(':user_id', $data['user_id']);
      $stmt->bindParam(':created', $data['created']);
      $stmt->execute();

    } catch(PDOException $exception) {
      error_log($exception->getMessage());
    }
  }




  /**
  * updateCreateCount - Adds one to the total count of a the todo's a user has created
  *
  * @param $data - An associative array of user data
  * @return True or false if successful
  */

  public function updateCreateCount($data) {

    try {

      $db = Database::getInstance();

      $stmt = $db->prepare('UPDATE users SET todos_created = todos_created + 1 WHERE user_id = :user_id');
      $stmt->bindParam(':user_id', $data['user_id']);
      $stmt->execute();

    } catch(PDOException $exception) {
        error_log($exception->getMessage());
    }
  }




  /**
  * completeTodo - Marks a todo 'done' with a 1 or 0. (1 = completed and 0 = not completed).
  * The user has the option to toggle a todo completed or not so there is a switch statement to determine
  * whether it should be a 1 or 0.
  *
  * @param $data - An associative array of user data
  * @return True or false if successful
  */

  public function completeTodo($data) {

    $db = Database::getInstance();

    switch ($data['complete']) {
      case 'done':
        $stmt = $db->prepare('UPDATE todo SET done = 1 WHERE todo_id = :todo_id');
        $stmt->bindParam(':todo_id', $data['todo_id']);
        $stmt->execute();
        break;
        
      case 'notdone':
        $stmt = $db->prepare('UPDATE todo SET done = 0 WHERE todo_id = :todo_id');
        $stmt->bindParam(':todo_id', $data['todo_id']);
        $stmt->execute();
        break;
    }
  }




  /**
  * updateCompleteCount - Adds or subtracts one to the total count of a the todo's a user has completed.
  * The user has the option to toggle a todo completed or not so there is a switch statement to determine
  * whether we must add or subtract from the total in their stats.
  *
  * @param $data - An associative array of user data
  * @return True or false if successful
  */

  public function updateCompleteCount($data) {

    $db = Database::getInstance();

    switch ($data['complete']) {
      case 'done':
        $stmt = $db->prepare('UPDATE users SET todos_completed = todos_completed + 1 WHERE user_id = :user_id');
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->execute();
        break;
        
      case 'notdone':
        $stmt = $db->prepare('UPDATE users SET todos_completed = todos_completed - 1 WHERE user_id = :user_id');
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->execute();
        break;
    }
  }




  /**
  * deleteTodo - Delete's a todo from the database
  *
  * @param $data - An associative array of user data
  * @return True or false if successful
  */

  public function deleteTodo($data) {

    $db = Database::getInstance();

    $stmt = $db->prepare('DELETE FROM todo WHERE todo_id = :todo_id');
    $stmt->bindParam(':todo_id', $data['todo_id']);
    $stmt->execute();
  }




  /**
  * updateDeleteCount - Adds one to the total count of a the todo's a user has deleted
  *
  * @param $data - An associative array of user data
  * @return True or false if successful
  */

  public function updateDeleteCount($data) {

    $db = Database::getInstance();

    $stmt = $db->prepare('UPDATE users SET todos_deleted = todos_deleted + 1 WHERE user_id = :user_id');
    $stmt->bindParam(':user_id', $data['user_id']);
    $stmt->execute();
  }


}