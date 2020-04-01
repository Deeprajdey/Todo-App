// Todo Data
import { v4 as uuidv4 } from "uuid";
import { todoArr, todoContent, todoLeft } from "./todoElements";
("use strict");

function userJSONTodoArr() {
  try {
    let output = localStorage.getItem("todos");
    if (output === "" || output === null) {
      return [];
    } else {
      return JSON.parse(output);
    }
  } catch (e) {
    return [];
  }
}

//Checked State
let isCheckedState = {
  check: false
};

//Sorting Todos
function sortedTodos(todoArr) {
  let myArr = [...todoArr];
  let sortedArr = myArr.sort((a, b) => {
    if (!a.completed && b.completed) {
      return -1;
    } else if (a.completed && !b.completed) {
      return 1;
    } else {
      return 0;
    }
  });
  return sortedArr;
}

//Incomplete Todos

function getThingsTodo(todoArr) {
  return todoArr.filter(todo => {
    return !todo.completed;
  });
}

//Add todos
function addingTodoFunc(todoArr, newTodo) {
  todoArr.unshift({
    id: uuidv4(),
    text: newTodo,
    completed: false
  });
  let localData = JSON.stringify(todoArr);
  localStorage.setItem("todos", localData);
}

//Filter Todos
function filterTodos(todoArr, query) {
  return todoArr.filter(todo => {
    let isText = todo.text.toLowerCase().includes(query.toLowerCase());
    return isText;
  });
}

//Deleting Todo Func
function removeTodo(todoArr, id) {
  let index = todoArr.findIndex(todos => {
    return todos.id === id;
  });
  if (index !== -1) {
    todoArr.splice(index, 1);
  }
  let localData = JSON.stringify(todoArr);
  localStorage.setItem("todos", localData);
  displayTodos(todoArr);
}

//Remaining Todos
function remainingTodosFunc(todoArr) {
  let remainingTodos = getThingsTodo(todoArr);
  if (remainingTodos.length != 0 && remainingTodos.length === 1) {
    todoLeft.classList.add("list-title");
    todoLeft.textContent = `You have ${remainingTodos.length} todo left`;
  } else if (remainingTodos.length > 1) {
    todoLeft.classList.add("list-title");
    todoLeft.textContent = `You have ${remainingTodos.length} todos left`;
  } else {
    todoLeft.classList.add("empty-message");
    todoLeft.textContent = `You have no todos left`;
  }
}

//Completed Todos
function completeTodoFunc(todoArr, todo, value) {
  todo.completed = value;
  let localData = JSON.stringify(todoArr);
  localStorage.setItem("todos", localData);
  if (isCheckedState.check) {
    let remainingTodosArray = getThingsTodo(todoArr);
    displayTodos(remainingTodosArray);
  } else {
    displayTodos(todoArr);
  }
}

// DisplayTodos
function displayTodos(arr) {
  todoContent.textContent = "";
  remainingTodosFunc(arr);
  todoContent.appendChild(todoLeft);
  let sortedArr = sortedTodos(arr);
  sortedArr.forEach(todo => {
    //Elements
    let todoLabel = document.createElement("label");
    let todoContainer = document.createElement("div");
    let todoCheckbox = document.createElement("input");
    let deleteTodo = document.createElement("button");
    let todoText = document.createElement("span");

    //Element contents and attr

    todoText.textContent = todo.text;
    deleteTodo.textContent = "remove";
    deleteTodo.classList.add("button", "button--text");
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.checked = todo.completed;
    todoLabel.classList.add("list-item");
    todoContainer.classList.add("list-item__container");
    //Elements Appends
    todoContent.appendChild(todoLabel);
    todoLabel.appendChild(todoContainer);
    todoContainer.appendChild(todoText);
    todoContainer.prepend(todoCheckbox);
    todoLabel.appendChild(deleteTodo);

    //Deleting Todo
    deleteTodo.addEventListener("click", () => {
      removeTodo(todoArr, todo.id);
    });

    //Completed Todo
    todoCheckbox.addEventListener("click", e => {
      let value = e.target.checked;
      completeTodoFunc(arr, todo, value);
    });
  });
  return true;
}

export {
  userJSONTodoArr,
  isCheckedState,
  getThingsTodo,
  addingTodoFunc,
  filterTodos,
  displayTodos
};
