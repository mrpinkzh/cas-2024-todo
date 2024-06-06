import initMyApplication from "./my-application.js";
import todoService from "./services/todo-service.js";
import TodoCreation from "./views/TodoCreation.js";
import TodoList from "./views/TodoList.js";
import TodosModel from "./viewmodels/todos-model.js"
import { TodoApplicationContext } from "./controllers/TodoApplicationContext.js";

const App = (applicationContext : TodoApplicationContext) => ({
  events: [
    ...TodoCreation(applicationContext).events,
    ...TodoList(applicationContext).events,
  ],
  template: (model : TodosModel) => `
        <div class="main">
            <h1>Note App</h1>
            ${TodoCreation(applicationContext).template(model)}
            ${TodoList(applicationContext).template(model)}
        </div>`,
});

const { render, model } : TodoApplicationContext = initMyApplication(new TodosModel(), '#todo', App);
render();

todoService.getTodos()
  .then(todos => 
    {
      model.receivedTodos(todos)
      render()
    });