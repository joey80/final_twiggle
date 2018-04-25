<?php

	/**
	* Represents a todo item
	*
	* @author Joey Leger
	* @author www.joeyui.com
	*/

	class Todo {

		private $db;
		private static $instance;  // singleton instance
		private function __construct() {}  // disallow creating a new object of the class with new Database()
  		private function __clone() {}  // disallow cloning the class


		/**
   		* Get the singleton instance
		* @param none
		* @return Auth
		*/
		public static function getInstance() {
			if (static::$instance === NULL) {
				static::$instance = new Todo();
		    }
			return static::$instance;
		}


		/**
		* getAllTodos - Get a list of all of the todo items
		* @param none
		* @return $results - Returns a PDO fetch all of all the todos
		*/
		public function getAllTodos($data) {

			try {

				$db = Database::getInstance();

				$stmt = $db->prepare('SELECT * from todo WHERE user_id = :user_id ORDER BY todo_id ASC');
				$stmt->execute(array(':user_id' => $data['user_id']));
				$todos = $stmt->fetchAll(PDO::FETCH_OBJ);

				if($todos !== false) {
					return $todos;
				}
			} catch(PDOException $exception) {
				error_log($exception->getMessage());
			}
		}




		/**
		* getLastTodo - Get the last todo item entered
		* @param none
		* @return $results - Returns a PDO fetch all of the last todo item entered
		*/
		public function getLastTodo($data) {

			try {

				$db = Database::getInstance();

				$stmt = $db->prepare('SELECT * from todo WHERE user_id = :user_id ORDER BY todo_id DESC LIMIT 1');
				$stmt->execute(array(':user_id' => $data['user_id']));
				$todo = $stmt->fetchAll(PDO::FETCH_OBJ);

				if($todo !== false) {
					return $todo;
				}
			} catch(PDOException $exception) {
				error_log($exception->getMessage());
			}
		}

		
	}
?>