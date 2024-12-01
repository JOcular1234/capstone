// Sample user credentials (to simulate login)
const sampleUser = {
    username: 'admin',
    password: 'password123'
};


let tasks = [];

// Elements from the DOM
const loginForm = document.getElementById('loginForm');
const taskManager = document.getElementById('taskManager');
const taskListContainer = document.getElementById('taskList');
const taskItems = document.getElementById('taskItems');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const logoutButton = document.getElementById('logout');
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskDeadline = document.getElementById('taskDeadline');
const taskPriority = document.getElementById('taskPriority');
const userNameDisplay = document.getElementById('userName');

// Function to toggle between login and task manager
function toggleView() {
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
    if (isLoggedIn) {
        loginForm.style.display = 'none';
        taskManager.style.display = 'block';
        userNameDisplay.textContent = localStorage.getItem('username');
        renderTasks();
    } else {
        loginForm.style.display = 'block';
        taskManager.style.display = 'none';
    }
}

// Function to handle login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Check if login credentials are correct
    if (username === sampleUser.username && password === sampleUser.password) {
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('username', username);
        toggleView();
    } else {
        alert('Incorrect username or password');
    }

    // Clear the input fields
    usernameInput.value = '';
    passwordInput.value = '';
});

// Function to handle logout
logoutButton.addEventListener('click', () => {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('username');
    toggleView();
});

// Function to render tasks on the task list
function renderTasks() {
    taskItems.innerHTML = ''; // Clear existing tasks

    // Check if there are any tasks
    if (tasks.length === 0) {
        taskItems.innerHTML = '<p>No tasks available. Add one!</p>';
    } else {
        // Display tasks
        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.classList.add('taskItem');
            taskDiv.innerHTML = `
                <h4>${task.title}</h4>
                <p>${task.description}</p>
                <p><strong>Deadline:</strong> ${task.deadline}</p>
                <p><strong>Priority:</strong> ${task.priority}</p>
            `;
            taskItems.appendChild(taskDiv);
        });
    }
}

// Function to handle adding a task
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newTask = {
        title: taskTitle.value,
        description: taskDescription.value,
        deadline: taskDeadline.value,
        priority: taskPriority.value
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Clear the form fields
    taskTitle.value = '';
    taskDescription.value = '';
    taskDeadline.value = '';
    taskPriority.value = 'low';

    // Re-render the task list
    renderTasks();
});

// Initialize the app
toggleView();
