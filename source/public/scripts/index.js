import initMyApplication from "./my-application.js";
import { TodosLoadedState, TodosNotLoadedState } from "./viewmodel.js";
import todoService from "./todo-service.js";
import TodoCreation from "./TodoCreation.js";
import TodoList from "./TodoList.js";

const initialModel = {
  state: new TodosNotLoadedState(),
  todoCreation: { state: "INIT" },
  todoList: {
    sortBy: {
      state: "SORTED",
      criteria: "title asc",
      criterias: [
        "title asc",
        "title desc",
        "most important",
        "least important",
        "next due",
        "last due",
      ],
    },
    filter: {
      state: "FILTERED",
      criteria: "none",
      criterias: [ "only pending", "only done", "none" ]
    },
    todos: [
      {
        id: 1,
        title: "first todo",
        importance: 1,
        description: "this is the first one",
        dueDate: '2024-04-29'
      },
    ],
  },
};

const root = document.querySelector("#todo");

const App = (applicationContext) => ({
  events: [
    ...TodoCreation(applicationContext).events,
    ...TodoList(applicationContext).events,
  ],
  template: (model) => `
        <div class="main">
            <h1>Note App</h1>
            ${model.state instanceof TodosNotLoadedState
              ? `Loading...`
              : `
                ${TodoCreation(applicationContext).template(model)}
                ${TodoList(applicationContext).template(model)}`
            }
        </div>`,
});

const { render, model, updateModel } = initMyApplication(
  initialModel,
  root,
  App
);
render();

todoService.getTodos()
  .then(todos => 
    updateModel({ 
      ...model, 
      state: new TodosLoadedState(todos),
      todoList: { 
        ...model.todoList, 
        todos 
      } 
  }));