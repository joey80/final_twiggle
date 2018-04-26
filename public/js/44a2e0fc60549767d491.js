/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	// import $ from 'jquery';

	'use strict';

	var DOMController = function () {

		var DOMstrings = {
			// menuButton: '.container__header__button',
			// aside: '.aside',
			// container: '.container',
			// containerMove: '.container--move',
			// containerTodo: '.container__todo',
			// submitButton: '.container__header__button2',
			// deleteButton: '.container__todo__delete',
			// todoForm: 'form',
			// checkBox: '.check',
			todoForm: '.todo-form',
			todoButton: 'todo-button',
			todoInput: 'todo-input',
			todoContainer: 'pills-todos',
			statContainer: 'pills-stats'
		};

		return {
			getDOMstrings: function () {
				return DOMstrings;
			}
		};
	}();

	var MenuController = function () {

		var DOM = DOMController.getDOMstrings(),


		// menuButton = document.querySelector(DOM.menuButton),
		// aside = document.querySelector(DOM.aside),
		// container = document.querySelector(DOM.container),
		// containerClass = document.querySelector(DOM.container).classList,
		// containerMove = document.querySelector(DOM.containerMove),
		// containerTodo = document.querySelector(DOM.containerTodo),
		// todoName = document.querySelector(DOM.todoName),
		// todoForm = document.getElementById(DOM.todoForm),
		// submitButton = document.querySelector(DOM.submitButton),
		// deleteButton = document.querySelectorAll(DOM.deleteButton),
		// checkBox = document.querySelector(DOM.checkBox),

		todoForm = document.querySelector(DOM.todoForm),
		    todoButton = document.getElementById(DOM.todoButton),
		    todoInput = document.getElementById(DOM.todoInput),
		    todoContainer = document.getElementById(DOM.todoContainer),
		    statContainer = document.getElementById(DOM.statContainer);

		// Helper function to check to see if something is visible
		var isVisible = function (e) {
			return !!(e.offsetWidth || e.offsetHeight);
		};

		var menuToggle = function () {
			container.classList.toggle('container--move');
		};

		// This will make sure that the aside and the main container always have the same height
		var matchHeight = function (div1, div2) {

			var elHeight1 = parseFloat(window.getComputedStyle(div1).getPropertyValue("height"));
			var elHeight2 = parseFloat(window.getComputedStyle(div2).getPropertyValue("height"));
			var viewPort = window.innerHeight;
			var heights = [viewPort, elHeight1, elHeight2];
			var newHeight = 0;

			for (var i = 0; i < heights.length; i++) {
				if (heights[i] > newHeight) {
					newHeight = heights[i];
				}
			}

			div1.style.height = `${newHeight}px`;
			div2.style.height = `${newHeight}px`;
		};

		// Helper function to return the name of the month when called from getUTCMonth();
		var getMonth = function (position) {

			var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			    theMonth = months[position];

			return theMonth;
		};

		var getStats = function () {

			var xhr = new XMLHttpRequest();
			var url = '../final_twiggle/dev/api/todos/getUserStats.php';

			xhr.onreadystatechange = function () {

				if (this.readyState == 4 && this.status == 200) {
					var statsObj = JSON.parse(xhr.responseText);

					for (var i = 0; i < statsObj.length; i++) {
						var id = statsObj[i].id,
						    created = statsObj[i].todos_created,
						    completed = statsObj[i].todos_completed,
						    deleted = statsObj[i].todos_deleted;

						statContainer.innerHTML = '';

						var build = `<p>Total of todos created: ${created}</p>
									<p>Total of todos completed: ${completed}</p>
									<p>Total of todos deleted: ${deleted}</p>`;

						statContainer.insertAdjacentHTML('afterbegin', build);
					}
				}
			};

			// Add some randomness to the URL to bypass the cache
			xhr.open("GET", url + (/\?/.test(url) ? "&" : "?") + new Date().getTime(), true);
			xhr.send();
		};

		// Connects to the API which lists all of the todo items
		// 'source' parameter refers to which file to pull the data from
		var getTodos = function (source) {

			var xhr = new XMLHttpRequest();
			var url = `../final_twiggle/dev/api/todos/${source}.php`;

			xhr.onreadystatechange = function () {

				if (this.readyState == 4 && this.status == 200) {
					var todoObj = JSON.parse(xhr.responseText);

					for (var i = 0; i < todoObj.length; i++) {
						var id = todoObj[i].todo_id,
						    name = todoObj[i].name,
						    user = todoObj[i].user_id,
						    done = todoObj[i].done,
						    created = todoObj[i].created,
						    rawDate = created.substring(0, 10),
						    finalDate = new Date(rawDate),
						    todoDay = finalDate.getUTCDate(),
						    todoMonth = getMonth(finalDate.getUTCMonth());

						if (done == 1) {
							var isDone = 'container__todo__name--completed',
							    isChecked = 'checked';
						} else {
							var isDone = '',
							    isChecked = '';
						}

						var build = `
							<div class="container" id="todo-container${id}">
	  							<div class="row" "id="todo_${id}">
	    							<div class="col">
	      								<label><input type="checkbox" class="check" id="check${id}" ${isChecked}><span></span></label>
	   	 							</div>
	    							<div class="col-6 ${isDone} name${id}">
	      								${name}<br />
	      								${todoMonth} - ${todoDay}
	    							</div>
	    							<div class="col">
	      								<button class="todo-delete btn btn-primary" id="${id}">Delete</button>
	    							</div>
	  							</div>
	  						</div>`;

						todoContainer.insertAdjacentHTML('afterbegin', build);
					}
				}
			};

			// Add some randomness to the URL to bypass the cache
			xhr.open("GET", url + (/\?/.test(url) ? "&" : "?") + new Date().getTime(), true);
			xhr.send();
		};

		// Process the input of the new todo after being submitted
		var postTodo = function (event) {
			var name = todoInput.value;
			var xhr = new XMLHttpRequest();
			var url = '../final_twiggle/dev/api/todos/addTodo.php';
			var vars = "name=" + name;

			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					getTodos('getLastTodo');
					getStats();

					//Clear out the input field
					todoInput.value = '';
				}
			};

			// Add some randomness to the URL to bypass the cache
			xhr.open("POST", url + (/\?/.test(url) ? "&" : "?") + new Date().getTime(), true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(vars);
			event.preventDefault();
		};

		// Deletes a todo
		var deleteTodo = function (deleteThis) {

			var id = deleteThis;
			var xhr = new XMLHttpRequest();
			var url = '../final_twiggle/dev/api/todos/deleteTodo.php';
			var vars = "todo_id=" + id;

			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					var parent = document.getElementById(`todo-container${id}`);
					parent.remove();
					getStats();
				}
			};

			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(vars);
		};

		// Completes a todo by changing the CSS styling of the name and marking
		// it complete in the database
		var completeTodo = function (completeThis) {

			var id = completeThis;
			var name = document.querySelector(`.name${id}`);
			var xhr = new XMLHttpRequest();
			var url = 'done.php';

			if (name.classList.contains('container__todo__name--completed')) {
				var complete = 'notdone';
				name.classList.remove('container__todo__name--completed');
			} else {
				var complete = 'done';
				name.classList.add('container__todo__name--completed');
			}

			var vars = `id=${id}&complete=${complete}`;

			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					getStats();
					console.log(`updated post with the id of ${id} with a status of ${complete}`);
				}
			};

			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(vars);
		};

		// Sets up all of the event listener for the header and menu DOM items
		var setupEventListeners = function () {

			document.querySelector(DOM.todoForm).addEventListener('submit', postTodo);
			document.getElementById(DOM.todoButton).addEventListener('click', postTodo);

			// // Listens for a click on a delete button. This bubbles up by selecting the body instead
			// // of looping and adding an event listener for every button
			document.body.addEventListener('click', function (event) {
				if (event.target.classList.contains('todo-delete')) {
					deleteTodo(event.target.id);
				}
			});

			// // Listens for a click on a complete checkbox. This bubbles up by selecting the body instead
			// // of looping and adding an event listener for every checkbox
			// document.body.addEventListener('click', function (event) {
			// 	if (event.target.classList.contains('check')) {

			// 		//Strip out everything but the id itself. The raw output for example is 'check54'
			// 		var oldid = event.target.id;
			// 		var newid = oldid.replace(/\D/g, '');
			// 		completeTodo(newid);
			// 	}
			// });
		};

		return {
			init: function () {
				setupEventListeners();
				getTodos('getAllTodos');
				getStats();
			}
		};
	}();

	MenuController.init();

	// Fixes the iOS rotation zoom bug
	// CREDIT: http://adactio.com/journal/4470/
	if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
		var viewportmeta = document.querySelector('meta[name="viewport"]');
		if (viewportmeta) {
			viewportmeta.content = 'width=device-width, minimum-scale=.25, maximum-scale=1.6, initial-scale=1.0, user-scalable=no';
			document.body.addEventListener('gesturestart', function () {
				viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6, user-scalable=no';
			}, false);
		}
	}

/***/ })
/******/ ]);