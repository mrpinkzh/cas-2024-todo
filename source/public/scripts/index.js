import initMyApplication from "./my-application.js";
import { TodosLoadedState, TodosNotLoadedState, TodosSortingState, TodosSorted } from "./viewmodel.js";
import todoService from "./services/todo-service.js";
import TodoCreation from "./TodoCreation.js";
import TodoList from "./TodoList.js";

const initialModel = {
  state: new TodosNotLoadedState(),
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
      state: new TodosLoadedState(
        todos,
        new TodosSorted(TodosSortingState.TITLE_ASC())),
      todoList: { 
        ...model.todoList, 
        todos 
      } 
  }));