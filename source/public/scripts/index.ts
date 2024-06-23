import initMyApplication from "./my-application.js";
import todoService from "./services/todo-service.js";
import App from "./views/App.js"
import TodosModel from "./viewmodels/todos-model.js"
import { TodoApplicationContext } from "./controllers/TodoApplicationContext.js";

const { render, model }: TodoApplicationContext = initMyApplication(new TodosModel(), '#app', App);
render();

todoService.getTodos()
  .then(todos => {
    model.receivedTodos(todos)
    render()
  });