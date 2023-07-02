#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

async function showTodos() {
  todos.forEach((todo) => {
    console.log(`${chalk.green(todo.done ? "✓" : " ")} | ${todo.todo}`);
  });
}

async function runQustion() {
  console.log(chalk.redBright("-----------------------------------"));
  let answer = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Select",
      choices: ["Done", "Add", "Remove", "Quit"],
    },
  ]);
  switch (answer.action) {
    case "Done":
      return changeDone();
    case "Add":
      return addTodo();
    case "Remove":
      return removeTodo();
    case "Quit":
      running = false;
      break;
  }
}

async function changeDone() {
  let choices = [];
  todos.forEach((todo, index) => {
    choices.push({
      name: todo.todo,
      checked: todo.done,
      value: index,
    });
  });
  let answer = await inquirer.prompt([
    {
      type: "checkbox",
      message: "Select done todos",
      name: "dones",
      choices: choices,
    },
  ]);
  todos.forEach((todo, index) => {
    if (answer.dones.includes(index)) {
      todo.done = true;
    } else {
      todo.done = false;
    }
  });
}
async function addTodo() {
  let answer = await inquirer.prompt([
    { type: "input", message: "Todo name", name: "todo" },
  ]);
  todos.push({ todo: answer.todo, done: false });
}
async function removeTodo() {
  let choices = [];
  todos.forEach((todo, index) =>
    choices.push({ name: todo.todo, value: index })
  );
  let answer = await inquirer.prompt([
    {
      type: "list",
      name: "index",
      message: "Select remove",
      choices: choices,
    },
  ]);
  todos.splice(answer.index, 1);
}

let todos = [
  { todo: "Hello!", done: true },
  { todo: "World!", done: false },
];

let running = true;

while (running) {
  await showTodos();
  await runQustion();
}
