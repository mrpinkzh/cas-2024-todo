import initMyApplication from "./my-application.js";
import todoService from "./services/todo-service.js";
import TodoCreation from "./TodoCreation.js";
import TodoList from "./TodoList.js";
import { TodosNotLoaded, TodosLoaded } from "./viewmodels/todos-loading-states.js"

const initialModel = {
  state: new TodosNotLoaded(),
};

const App = (applicationContext) => ({
  events: [
    ...TodoCreation(applicationContext).events,
    ...TodoList(applicationContext).events,
  ],
  template: (model) => `
        <div class="main">
            <h1>Note App</h1>
            ${model.state instanceof TodosNotLoaded
              ? `Loading...`
              : `
                ${TodoCreation(applicationContext).template(model)}
                ${TodoList(applicationContext).template(model)}`
            }
        </div>`,
});

const { render, updateModel } = initMyApplication(initialModel, '#todo', App);
render();

todoService.getTodos()
  .then(todos => 
    updateModel({ state: new TodosLoaded(todos) }));