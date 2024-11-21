const inputForm = document.querySelector("form");
const todoInput = document.querySelector("#todo-input");
const todoUL = document.querySelector("#todo-list");
const addButton = document.querySelector("#add-button");

const allTodos = getTodos();
updateTodoList();

inputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const todoText = todoInput.value.trim();
  todoInput.value = "";
  if (todoText) {
    const todo = {
      text: todoText,
      completed: false,
    };
    allTodos.push(todo);
    setTodos();
    updateTodoList();
  }
});

function setTodos() {
  const allTodosString = JSON.stringify(allTodos);
  localStorage.setItem("todos", allTodosString);
}

function getTodos() {
  const allTodosString = localStorage.getItem("todos");
  if (allTodosString) {
    return JSON.parse(allTodosString);
  }
  return [];
}

function updateTodoList() {
  todoUL.innerHTML = "";
  allTodos.forEach((todo, todoIndex) => {
    createTodoElement(todo, todoIndex);
  });
}

function createTodoElement(todo, todoIndex) {
  const todoLI = document.createElement("li");
  const todoID = `todo-${todoIndex}`;
  const todoText = todo.text;
  todoLI.innerHTML = `
    <input type="checkbox" id="${todoID}" />
    <label for="${todoID}" class="custom-checkbox">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        fill="var(--secondary-color)"
      >
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
      </svg>
    </label>
    <label for="${todoID}" class="todo-text">${todoText}</label>
    <button class="delete-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
        fill="var(--accent-color)"
      >
        <path
          d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"
        />
      </svg>
    </button>
  `;
  todoLI.className = "todo";
  const deleteButton = todoLI.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => {
    deleteTodoElement(todoIndex);
  });
  const checkButton = todoLI.querySelector("input");
  checkButton.checked = todo.completed;
  checkButton.addEventListener("change", () => {
    allTodos[todoIndex].completed = checkButton.checked;
    setTodos();
  });
  todoUL.append(todoLI);
}

function deleteTodoElement(todoIndex) {
  allTodos.splice(todoIndex, 1);
  setTodos();
  updateTodoList();
}
