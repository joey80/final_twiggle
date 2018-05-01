'use strict';

var DOMController = function () {

	var DOMstrings = {
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
	todoForm = document.querySelector(DOM.todoForm),
	todoButton = document.getElementById(DOM.todoButton),
	todoInput = document.getElementById(DOM.todoInput),
	todoContainer = document.getElementById(DOM.todoContainer),
	statContainer = document.getElementById(DOM.statContainer);



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

				if (todoObj.length == 0) {
					addTodoMessage();
					return;				
				}

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
						var isDone = 'todo-item--completed',
						    isChecked = 'checked';
					} else {
						var isDone = '',
						    isChecked = '';
					}

					var build = `
						<div class="container todo-container" id="todo-container${id}">
							<div class="row">
								<div class="col" "id="todo_${id}">
      								<label><input type="checkbox" class="check" id="check${id}" ${isChecked}><span></span></label>
	      						</div>
	    						<div class="col-6 ${isDone} name${id}">
	      							<span class="todo-name">${name}</span>
	      							<span class="todo-date">${todoMonth} - ${todoDay}</span>
	    						</div>
	    						<div class="col">
	      							<i class="fa fa-trash-o todo-delete" id="${id}"></i>
	    						</div>
							</div>
  						</div>`;
				}

				todoContainer.insertAdjacentHTML('afterbegin', build);
			}
		}

		// Add some randomness to the URL to bypass the cache
		xhr.open("GET", url + (/\?/.test(url) ? "&" : "?") + new Date().getTime(), true);
		xhr.send();
	};



	// The message that gets displayed if the user hasn't added any todos
	var addTodoMessage = function() {

		var zeroBuild = `
			<div id="add-todo-message">
				<img src="../final_twiggle/public/images/owl.png" />
				<h2>You need to add some todos!!</h2>
			</div>
			`;
		todoContainer.insertAdjacentHTML('afterbegin', zeroBuild);
	};



	// Process the input of the new todo after being submitted
	var postTodo = function (event) {
		var name = todoInput.value;
		var xhr = new XMLHttpRequest();
		var url = '../final_twiggle/dev/api/todos/addTodo.php';
		var vars = "name=" + name;
		event.preventDefault();

		// Check to see if this is the first todo to be added. If so,
		// remove the message asking the user to add a todo and then 
		// display the todo.
		if (todoContainer.querySelector("#add-todo-message") != null) {
			todoContainer.querySelector("#add-todo-message").remove();
		}

		if (name === '') {
			$('#todo-error').modal();
		} else {

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
		};
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

			// Check to see if you've deleted the last todo. If so, show the message
			// that you need to add more todos.
			if (todoContainer.querySelector("#add-todo-message") == null) {
				addTodoMessage();
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
		var url = '../final_twiggle/dev/api/todos/completeTodo.php';

		if (name.classList.contains('todo-item--completed')) {
			var complete = 'notdone';
			name.classList.remove('todo-item--completed');
		} else {
			var complete = 'done';
			name.classList.add('todo-item--completed');
		}

		var vars = `todo_id=${id}&complete=${complete}`;

		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				getStats();
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
		document.body.addEventListener('click', function (event) {
			if (event.target.classList.contains('check')) {

				//Strip out everything but the id itself. The raw output for example is 'check54'
				var oldid = event.target.id;
				var newid = oldid.replace(/\D/g, '');
				completeTodo(newid);
			}
		});
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