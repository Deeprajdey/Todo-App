import { userJSONTodoArr } from "./todoFunctions";
("use strict");
export let todoArr = userJSONTodoArr();
export let todoLeft = document.createElement("h2");
export let todoContent = document.querySelector("#todoContent");
export let newTodoText = document.querySelector("#newTodo");
export let displayFilterTodos = document.querySelector("#filterTodo");
export let hideCompleted = document.querySelector("#hideCompleted");
