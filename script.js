document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (savedTasks) {
        savedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updatesStats();
    }
});

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
};

const addTask = () => {
    const todoinput = document.getElementById('todo-input'); 
    const text = todoinput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        todoinput.value = "";
        updateTasksList();
        updatesStats();
        saveTasks();
    }
};
const toggletaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updatesStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
    updatesStats();
    saveTasks();
};

const editTask = (index) => {
    const todoinput = document.getElementById("todo-input");
    todoinput.value = tasks[index].text;

    tasks.splice(index, 1);
    updateTasksList();
    updatesStats();
    saveTasks();
};

const updatesStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completedTasks / totalTasks) * 100;
    const progressBar = document.getElementById("progressBar");

    progressBar.style.width = `${progress}%`;

    document.getElementById("completedTasks").innerText = `${completedTasks} / ${totalTasks}`; 
};

const updateTasksList = () => {
    const todoList = document.getElementById("todo-list"); 
    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
     <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
            <p>${task.text}</p>
        </div>
        <div class="icons">
            <img src = "./Images/Edit_icon.png" onClick= "editTask(${index})"/>
            <img src = "./Images/bin.png" onClick= "deleteTask(${index})"/>
        </div>
     </div>
        `;

        listItem.addEventListener("change", () => toggletaskComplete(index));
        todoList.append(listItem);
    });
};

document.getElementById("submit-btn").addEventListener("click", function (event) {
    event.preventDefault();

    addTask();
});