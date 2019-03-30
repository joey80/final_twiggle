'use strict';

/**
* twiggle_DOMController - Raw DOM classes and ID's to help keep the code clean
*
* @param none
* @return getDOMstrings - returns a list of the DOM string names
*/

var twiggle_DOMController = function () {

	var DOMstrings = {
		todoForm: '.todo-form',
		todoButton: 'todo-button',
		todoInput: 'todo-input',
		todoContainer: 'pillTodos',
		statContainer: 'pillStats',
		statCardContainer: '.todo-stat-card__container',
		updatePicButton: 'update-profile-picture-button',
		fileInput: 'file',
		modalTitle: '.modal-title',
		modalBody: '.modal-body',
		modalContainer: 'todo-error',
		addTodoMessage: 'add-todo-message',
		todoImageFile: 'todo-image-file'
	};

	return {
		getDOMstrings: function getDOMstrings() {
			return DOMstrings;
		}
	};
}();

/**
* twiggle_utilityController - Various helper functions
*
* @param none
* @return several public methods
*/

var twiggle_utilityController = function () {

	var DOM = twiggle_DOMController.getDOMstrings(),
	    modalTitle = document.querySelector(DOM.modalTitle),
	    modalBody = document.querySelector(DOM.modalBody),
	    modalContainer = document.getElementById(DOM.modalContainer);

	return {

		// Shows the modal popup and adds error messages for the user
		// The modal is hidden by default
		modalMessage: function modalMessage(title, msg) {

			var modalMessageContent = msg,
			    modalTitleContent = title;

			// Clear the node and add the new message
			modalTitle.innerHTML = '';
			modalTitle.insertAdjacentHTML('afterbegin', modalTitleContent);

			modalBody.innerHTML = '';
			modalBody.insertAdjacentHTML('afterbegin', modalMessageContent);

			// Show the modal
			$(modalContainer).modal();
		},

		// Helper function to return the name of the month when called from getUTCMonth();
		getMonth: function getMonth(position) {

			var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			    theMonth = months[position];

			return theMonth;
		},

		// Checks the file that the user has selected and then updates their profile picture
		updateProfilePicture: function updateProfilePicture(event) {

			// our application only allows *.png, *.jpeg and *.gif images
			// var allowedFileTypes = ["image/png", "image/jpeg", "image/gif"];

			// Check if upload field is blank
			// if (files[0] == null) {
			// 	twiggle_utilityController.modalMessage("Upload Error", "Please select a picture to upload");
			// 	return;
			// }

			// // Check if the right type of file
			// for (var i = 0; i < files.length; i++) {
			// 	if (allowedFileTypes.indexOf(files[i].type) == -1) {
			// 		twiggle_utilityController.modalMessage("Upload Error", "Only these file typs are allowed: JPG, PNG, GIF");
			// 		return;
			// 	}
			// }

			// // Check if within size
			// for (var i = 0; i < files.length; i++) {
			// 	if (files[i].size > 5242880) {
			// 		twiggle_utilityController.modalMessage("Upload Error", "5MB limit. The file you are trying to upload is too large");
			// 		return;
			// 	}
			// }

			// var url = "../dev/api/util/updateProfilePicture.php",
			//     xhr = new XMLHttpRequest(),
			//     fd = new FormData();

			// xhr.onreadystatechange = function () {
			// 	if (xhr.readyState == 4 && xhr.status == 200) {

			// 		twiggle_utilityController.modalMessage("Success!", "Your profile picture has been updated. Please refresh the page to see the changes");
			// 	}
			// };

			// xhr.responseType = "arraybuffer";
			// xhr.open("POST", url, true);
			// fd.append('myFile', files[0]);
			// xhr.send(fd);

			event.preventDefault();

			// fileInput is a HTMLInputElement: <input type="file" multiple id="myfileinput">
			const fileInput = document.getElementById(DOM.todoImageFile);

			// files is a FileList object (simliar to NodeList)
			const files = fileInput.files;
			const profileImage = document.querySelector('.todo-profile-image');

			const formData = new FormData();
			formData.append('file', files[0]);
			formData.append('upload_preset', 'es6n0oaj');

			axios({
				url: 'https://api.cloudinary.com/v1_1/hccowvnww/image/upload',
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: formData
			}).then(function(res) {
				profileImage,src = res.secure_url;
				return axios({
					url: '../dev/api/util/updateProfilePicture.php',
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: res.secure_url
				})
			}).catch(function(err) {
				console.log(err);
			});
		}
	};
}();

/**
* twiggle_todoController - Todo API routing and logic
*
* @param none
* @return several public methods
*/

var twiggle_todoController = function () {

	var DOM = twiggle_DOMController.getDOMstrings(),
	    todoForm = document.querySelector(DOM.todoForm),
	    todoButton = document.getElementById(DOM.todoButton),
	    todoInput = document.getElementById(DOM.todoInput),
	    todoContainer = document.getElementById(DOM.todoContainer),
	    statContainer = document.getElementById(DOM.statContainer),
	    statCardContainer = document.querySelector(DOM.statCardContainer),
	    updatePicButton = document.getElementById(DOM.updatePicButton),
	    fileInput = document.getElementById(DOM.fileInput),
	    addTodoMessage = document.getElementById(DOM.addTodoMessage);

	return {

		getStats: function getStats() {

			var xhr = new XMLHttpRequest(),
			    url = '../dev/api/todos/getUserStats.php';

			xhr.onreadystatechange = function () {

				if (this.readyState == 4 && this.status == 200) {
					var statsObj = JSON.parse(xhr.responseText);

					for (var i = 0; i < statsObj.length; i++) {
						var id = statsObj[i].id,
						    created = statsObj[i].todos_created,
						    completed = statsObj[i].todos_completed,
						    deleted = statsObj[i].todos_deleted;

						var stats = document.querySelector(DOM.statCardContainer);
						if (stats) {
							stats.remove();
						}

						var build = '\n\t\t\t\t\t\t\t\t<div class="row todo-stat-card__container">\n\t\t\t\t\t\t            <div class="col-sm todo-stat-card">\n\t\t\t\t\t\t              <img src="public/images/created-owl.png" class="todo-stat-card__image">\n\t\t\t\t\t\t              <span class="todo-stat-card__title">Todos Created</span>\n\t\t\t\t\t\t              <span class="todo-stat-card__numbers">' + created + '</span>\n\t\t\t\t\t\t            </div>\n\t\t\t\t\t\t            <div class="col-sm todo-stat-card">\n\t\t\t\t\t\t              <img src="public/images/completed-owl.png" class="todo-stat-card__image">\n\t\t\t\t\t\t              <span class="todo-stat-card__title">Todos Completed</span>\n\t\t\t\t\t\t              <span class="todo-stat-card__numbers">' + completed + '</span>\n\t\t\t\t\t\t            </div>\n\t\t\t\t\t\t            <div class="col-sm todo-stat-card">\n\t\t\t\t\t\t              <img src="public/images/deleted-owl.png" class="todo-stat-card__image">\n\t\t\t\t\t\t              <span class="todo-stat-card__title">Todos Deleted</span>\n\t\t\t\t\t\t              <span class="todo-stat-card__numbers">' + deleted + '</span>\n\t\t\t\t\t\t        \t</div>\n\t\t\t\t\t\t        </div>\n\t\t\t\t\t\t\t\t\t';

						statContainer.insertAdjacentHTML('afterbegin', build);
					}
				}
			};

			// Add some randomness to the URL to bypass the cache
			xhr.open("GET", url + (/\?/.test(url) ? "&" : "?") + new Date().getTime(), true);
			xhr.send();
		},

		// Connects to the API which lists all of the todo items
		// 'source' parameter refers to which file to pull the data from
		getTodos: function getTodos(source) {

			var xhr = new XMLHttpRequest(),
			    url = '../dev/api/todos/' + source + '.php';

			xhr.onreadystatechange = function () {

				if (this.readyState == 4 && this.status == 200) {

					var todoObj = JSON.parse(xhr.responseText);

					if (todoObj.length == 0) {
						twiggle_todoController.addTodoMessage();
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
						    todoMonth = twiggle_utilityController.getMonth(finalDate.getUTCMonth());

						// Check to see if the todo has been completed. If it has been we add a strikethrough style to it
						if (done == 1) {
							var isDone = 'todo-item--completed',
							    isChecked = 'checked';
						} else {
							var isDone = '',
							    isChecked = '';
						}

						var todoBuild = '\n\t\t\t\t\t\t\t<div class="container todo-container" id="todo-container' + id + '">\n\t\t\t\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t\t\t\t<div class="col" id="todo_' + id + '">\n\t      \t\t\t\t\t\t\t\t<label><input type="checkbox" class="check" id="check' + id + '" ' + isChecked + '><span></span></label>\n\t\t      \t\t\t\t\t\t</div>\n\t\t    \t\t\t\t\t\t<div class="col-6 ' + isDone + ' name' + id + '">\n\t\t      \t\t\t\t\t\t\t<span class="todo-name">' + name + '</span>\n\t\t      \t\t\t\t\t\t\t<span class="todo-date">' + todoMonth + ' - ' + todoDay + '</span>\n\t\t    \t\t\t\t\t\t</div>\n\t\t    \t\t\t\t\t\t<div class="col">\n\t\t      \t\t\t\t\t\t\t<i class="fa fa-trash-o todo-delete" id="' + id + '"></i>\n\t\t    \t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t</div>\n\t  \t\t\t\t\t\t</div>';

						todoContainer.insertAdjacentHTML('afterbegin', todoBuild);
					}
				}
			};

			// Add some randomness to the URL to bypass the cache
			xhr.open("GET", url + (/\?/.test(url) ? "&" : "?") + new Date().getTime(), true);
			xhr.send();
		},

		// Process the input of the new todo after being submitted
		postTodo: function postTodo(event) {
			var name = todoInput.value,
			    xhr = new XMLHttpRequest(),
			    url = '../dev/api/todos/addTodo.php',
			    vars = "name=" + name;

			event.preventDefault();

			if (name === '') {
				twiggle_utilityController.modalMessage("Whoopsie!", "You forgot to enter a todo. It's ok we all make mistakes");
			} else {

				xhr.onreadystatechange = function () {
					if (this.readyState == 4 && this.status == 200) {

						//Redirect to the todo tab if not already there
						var activaTab = function activaTab(tabID) {
							$('.todo-nav a[href="#' + tabID + '"]').tab('show');
						};

						// Check to see if this is the first todo to be added. If so,
						// remove the message asking the user to add a todo and then 
						// display the todo.
						if (todoContainer.querySelector('#add-todo-message') != null) {
							todoContainer.querySelector('#add-todo-message').remove();
						}

						// Add the recently added todo to the list and then refresh the stats
						twiggle_todoController.getTodos('getLastTodo');
						twiggle_todoController.getStats();

						//Clear out the input field
						todoInput.value = '';;
						activaTab('pillTodos');
					}
				};

				// Add some randomness to the URL to bypass the cache
				xhr.open("POST", url + (/\?/.test(url) ? "&" : "?") + new Date().getTime(), true);
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.send(vars);
			};
		},

		// Deletes a todo
		deleteTodo: function deleteTodo(deleteThis) {

			var id = deleteThis,
			    xhr = new XMLHttpRequest(),
			    url = '../dev/api/todos/deleteTodo.php',
			    vars = "todo_id=" + id;

			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					var parent = document.getElementById('todo-container' + id);
					parent.remove();
					twiggle_todoController.getStats();

					// Check to see if you've deleted the last todo. If so, show the message
					// that you need to add more todos.
					if (todoContainer.children.length < 1) {
						twiggle_todoController.addTodoMessage();
					}
				}
			};

			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(vars);
		},

		// Completes a todo by changing the CSS styling of the name and marking
		// it complete in the database
		completeTodo: function completeTodo(completeThis) {

			var id = completeThis,
			    name = document.querySelector('.name' + id),
			    xhr = new XMLHttpRequest(),
			    url = '../dev/api/todos/completeTodo.php';

			if (name.classList.contains('todo-item--completed')) {
				var complete = 'notdone';
				name.classList.remove('todo-item--completed');
			} else {
				var complete = 'done';
				name.classList.add('todo-item--completed');
			}

			var vars = 'todo_id=' + id + '&complete=' + complete;

			xhr.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					twiggle_todoController.getStats();
				}
			};

			xhr.open('POST', url, true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.send(vars);
		},

		// The message that gets displayed if the user hasn't added any todos
		addTodoMessage: function addTodoMessage() {

			var zeroBuild = '\n\t\t\t\t<div id="add-todo-message">\n\t\t\t\t\tYou need to add some todos!!\n\t\t\t\t\t<div class="todo-owl"></div>\n\t\t\t\t</div>\n\t\t\t\t';

			todoContainer.insertAdjacentHTML('afterbegin', zeroBuild);
		}

	};
}();

/**
* twiggle_globalController - Sets the event listeners and init method
*
* @param none
* @return several public methods
*/

var twiggle_globalController = function (twiggle_DOMController, twiggle_todoController) {

	var DOM = twiggle_DOMController.getDOMstrings();

	var setupEventListeners = function setupEventListeners() {

		// Posting a new todo item from the input field
		document.querySelector(DOM.todoForm).addEventListener('submit', twiggle_todoController.postTodo);

		// Posting a new todo item from the 'Add Todo' button
		document.getElementById(DOM.todoButton).addEventListener('click', twiggle_todoController.postTodo);

		// Adding a new profile picture from the profile page
		document.getElementById(DOM.updatePicButton).addEventListener('click', twiggle_utilityController.updateProfilePicture);

		// Listens for a click on a delete button. This bubbles up by selecting the body instead
		// of looping and adding an event listener for every button
		document.body.addEventListener('click', function (event) {
			if (event.target.classList.contains('todo-delete')) {
				twiggle_todoController.deleteTodo(event.target.id);
			}
		});

		// Listens for a click on a complete checkbox. This bubbles up by selecting the body instead
		// of looping and adding an event listener for every checkbox
		document.body.addEventListener('click', function (event) {
			if (event.target.classList.contains('check')) {

				//Strip out everything but the id itself. The raw output for example is 'check54'
				var oldid = event.target.id,
				    newid = oldid.replace(/\D/g, '');
				twiggle_todoController.completeTodo(newid);
			}
		});
	};

	return {

		init: function init() {
			setupEventListeners();
			twiggle_todoController.getTodos('getAllTodos');
			twiggle_todoController.getStats();
		}
	};
}(twiggle_DOMController, twiggle_todoController);

twiggle_globalController.init();

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