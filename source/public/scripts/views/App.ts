import { TodoApplicationContext } from "../controllers/TodoApplicationContext.js";
import TodosModel from "../viewmodels/todos-model";
import { TodoApplicationView } from "./TodoApplicationView.js";
import TodoCreation from "./TodoCreation.js";
import TodoList from "./TodoList.js";

const App = (context: TodoApplicationContext): TodoApplicationView => {
    const todoCreation = TodoCreation(context);
    const todoList = TodoList(context);

    return ({
        events: [
            ...todoCreation.events,
            ...todoList.events,
            {
                selector: '#btnTheme',
                ev: 'click',
                handler() {
                    context.model.switchTheme()
                    context.render()
                },
            }
        ],
        template: (model: TodosModel) => `
          <div class="layout ${model.theme}">
            <div class="main">
              <h1>Note App</h1>
              <div>
                <button class="button" id="btnTheme">Theme</button>
              </div>
              ${todoCreation.template(model)}
              ${todoList.template(model)}
            </div>
          </div>`,
    });
};

export default App