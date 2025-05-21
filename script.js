document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("todo-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const renderTasks = () => {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  };

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newTask = taskInput.value.trim();
    if (newTask) {
      tasks.push(newTask);
      saveTasks();
      renderTasks();
      taskInput.value = "";
    }
  });

  renderTasks();
});
