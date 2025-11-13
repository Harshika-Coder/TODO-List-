let tasks = [];

const addTask = () => {
    const todoinput = document.getElementById('todo-input'); //todoinput = iaskinput
    const text = todoinput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
    }
};
const toggletaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    console.log(tasks);
}
const updateTasksList = () => {
    const todoList = document.getElementById("todo-list"); //todoList =tasklist
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