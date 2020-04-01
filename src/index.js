import {
  todoArr,
  displayFilterTodos,
  hideCompleted,
  newTodoText
} from "./todoElements";
import {
  displayTodos,
  isCheckedState,
  getThingsTodo,
  filterTodos,
  addingTodoFunc
} from "./todoFunctions";
("use strict");
// Main-Content
//Filtering Todos
displayFilterTodos.addEventListener("input", e => {
  let query = e.target.value;
  if (isCheckedState.check) {
    let remainingTodosArray = getThingsTodo(todoArr);
    let incompleteTodoArray = filterTodos(remainingTodosArray, query);
    displayTodos(incompleteTodoArray);
  } else {
    let searchArray = filterTodos(todoArr, query);
    displayTodos(searchArray);
  }
});

//Hide Completed
hideCompleted.addEventListener("change", e => {
  isCheckedState.check = e.target.checked;
  if (isCheckedState.check) {
    let remainingTodosArray = getThingsTodo(todoArr);
    displayTodos(remainingTodosArray);
  } else {
    displayTodos(todoArr);
  }
});
//All the todos
displayTodos(todoArr);

//Adding new Todo
newTodoText.addEventListener("submit", e => {
  e.preventDefault();
  let newTodos = e.target.elements.text.value;
  let isNewTodoCheck = newTodos.trim().split("");
  if (isNewTodoCheck.length > 0) {
    e.target.elements.text.value = "";
    if (newTodos != "") {
      addingTodoFunc(todoArr, newTodos);
      displayTodos(todoArr);
      newTodos = "";
    }
  }
});
