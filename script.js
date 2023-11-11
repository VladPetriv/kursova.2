document.addEventListener("DOMContentLoaded", function () {
  loadTodos();
});

function loadTodos() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://jsonplaceholder.typicode.com/todos/", true);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      displayTodos(data);
    } else {
      console.error("Error fetching todos:", xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Network error while fetching todos");
  };

  xhr.send();
}

function displayTodos(todos) {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    if (index <= 10) {
      const li = document.createElement("li");
      li.textContent = todo.title;
      todoList.appendChild(li);
    }
  });
}

function addTodo() {
  const newTodoInput = document.getElementById("newTodo");
  const newTodoTitle = newTodoInput.value.trim();

  if (newTodoTitle !== "") {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        newTodoInput.value = "";
        const data = JSON.parse(xhr.responseText)
        const todoList = document.getElementById("todoList");
        const li = document.createElement("li");
        li.textContent = data.todo;
        todoList.appendChild(li);
      } else {
        console.error("Error adding todo:", xhr.statusText);
      }
    };

    xhr.onerror = function () {
      console.error("Network error while adding todo");
    };

    const requestBody = JSON.stringify({
      userId: 1288,
      todo: newTodoTitle,
      userId: 1288,
    });
    xhr.send(requestBody);
  }
}
