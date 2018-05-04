'use strict';

var DOMController = function () {

	var DOMstrings = {
		todoForm: '.todo-form',
		todoButton: 'todo-button',
		todoInput: 'todo-input',
		todoContainer: 'pills-todos',
		statContainer: 'pills-stats',
		updatePicButton: 'update-profile-picture-button',
		fileInput: 'file'
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
	statContainer = document.getElementById(DOM.statContainer),
	updatePicButton = document.getElementById(DOM.updatePicButton),
	fileInput = document.getElementById(DOM.fileInput);



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

					// statContainer.innerHTML = '';
					var stats = document.querySelector('.todo-stat-card__container');
					if(stats) {
						stats.remove();
					}
					
					var build = `
							<div class="row todo-stat-card__container">
					            <div class="col-sm todo-stat-card">
					              <img src="public/images/created-owl.png" class="todo-stat-card__image">
					              <span class="todo-stat-card__title">Todos Created</span>
					              <span class="todo-stat-card__numbers">${created}</span>
					            </div>
					            <div class="col-sm todo-stat-card">
					              <img src="public/images/completed-owl.png" class="todo-stat-card__image">
					              <span class="todo-stat-card__title">Todos Completed</span>
					              <span class="todo-stat-card__numbers">${completed}</span>
					            </div>
					            <div class="col-sm todo-stat-card">
					              <img src="public/images/deleted-owl.png" class="todo-stat-card__image">
					              <span class="todo-stat-card__title">Todos Deleted</span>
					              <span class="todo-stat-card__numbers">${deleted}</span>
					        	</div>
					        </div>
								`;

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
	var getTodos = function(source) {

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

					// Check to see if the todo has been completed. If it has been we add a strikethrough style to it
					if (done == 1) {
						var isDone = 'todo-item--completed',
						    isChecked = 'checked';
					} else {
						var isDone = '',
						    isChecked = '';
					}

					var todoBuild = `
						<div class="container todo-container" id="todo-container${id}">
							<div class="row">
								<div class="col" id="todo_${id}">
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

  					todoContainer.insertAdjacentHTML('afterbegin', todoBuild);
				}

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
				You need to add some todos!!
				<div class="todo-owl"></div>
			</div>
			`;

		todoContainer.insertAdjacentHTML('afterbegin', zeroBuild);
	};



	// Shows the modal popup and adds error messages for the user
	// The modal is hidden by default
	var modalMessage = function(msg) {

		var modalMessage = msg,
			modalBody = document.querySelector('.modal-body');

		// Clear the node and add the new message
		modalBody.innerHTML = '';
		modalBody.insertAdjacentHTML('afterbegin', modalMessage);

		// Show the modal
		$('#todo-error').modal();
		
	};



	// Process the input of the new todo after being submitted
	var postTodo = function(event) {
		var name = todoInput.value;
		var xhr = new XMLHttpRequest();
		var url = '../final_twiggle/dev/api/todos/addTodo.php';
		var vars = "name=" + name;
		event.preventDefault();

		if (name === '') {
			modalMessage("You forgot to enter a todo. It's ok we all make mistakes.");
		} else {

			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {

					// Check to see if this is the first todo to be added. If so,
					// remove the message asking the user to add a todo and then 
					// display the todo.
					if (todoContainer.querySelector("#add-todo-message") != null) {
						todoContainer.querySelector("#add-todo-message").remove();
					}

					// Add the recently added todo to the list and then refresh the stats
					getTodos('getLastTodo');
					getStats();

					//Clear out the input field
					todoInput.value = '';

					//Redirect to the todo tab if not already there
					function activaTab(tabID){
					    $('.todo-nav a[href="#' + tabID + '"]').tab('show');
					};
					activaTab('pills-todos');
				}
			};

			// Add some randomness to the URL to bypass the cache
			xhr.open("POST", url + (/\?/.test(url) ? "&" : "?") + new Date().getTime(), true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(vars);
		};
	};



	// Checks the file that the user has selected and then updates their profile picture
	var updateProfilePicture = function(event) {

		event.preventDefault();

		// fileInput is a HTMLInputElement: <input type="file" multiple id="myfileinput">
		var fileInput = document.getElementById("todo-image-file");

		// files is a FileList object (simliar to NodeList)
		var files = fileInput.files;

		// our application only allows *.png, *.jpeg and *.gif images
		var allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

		// Check if upload field is blank
		if(files[0] == null) {
			modalMessage("Please select a picture to upload");
			return;
		}

		// Check if the right type of file
		for (var i = 0; i < files.length; i++) {
		  if (allowedFileTypes.indexOf(files[i].type) == -1) {
		    modalMessage("Only these file typs are allowed: JPG, PNG, GIF");
		    return;
		  }
		}

		// Check if within size
		for (var i = 0; i < files.length; i++) {
		  if (files[i].size > 5242880) {
		    modalMessage("5MB limit. The file you are trying to upload is too large");
		    return;
		  }
		}

		var url = "../final_twiggle/dev/api/util/updateProfilePicture.php";
        var xhr = new XMLHttpRequest();
        var fd = new FormData();
            
        xhr.open("POST", url, true);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
            }
        };
        fd.append('myFile', files[0]);
        xhr.send(fd);
	};



	// Deletes a todo
	var deleteTodo = function(deleteThis) {

		var id = deleteThis;
		var xhr = new XMLHttpRequest();
		var url = '../final_twiggle/dev/api/todos/deleteTodo.php';
		var vars = "todo_id=" + id;

		xhr.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				var parent = document.getElementById(`todo-container${id}`);
				parent.remove();
				getStats();

				// Check to see if you've deleted the last todo. If so, show the message
				// that you need to add more todos.
				if (todoContainer.children.length < 1) {
					addTodoMessage();
				}
			}
		};

		xhr.open('POST', url, true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(vars);
	};



	// Completes a todo by changing the CSS styling of the name and marking
	// it complete in the database
	var completeTodo = function(completeThis) {

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

		// Posting a new todo item from the input field
		document.querySelector(DOM.todoForm).addEventListener('submit', postTodo);

		// Posting a new todo item from the 'Add Todo' button
		document.getElementById(DOM.todoButton).addEventListener('click', postTodo);

		// Adding a new profile picture from the profile page
		document.getElementById(DOM.updatePicButton).addEventListener('click', updateProfilePicture);

		// Listens for a click on a delete button. This bubbles up by selecting the body instead
		// of looping and adding an event listener for every button
		document.body.addEventListener('click', function (event) {
			if (event.target.classList.contains('todo-delete')) {
				deleteTodo(event.target.id);
			}
		});

		// Listens for a click on a complete checkbox. This bubbles up by selecting the body instead
		// of looping and adding an event listener for every checkbox
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