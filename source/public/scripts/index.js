import initMyApplication from "./my-application.js";
import TodoList from "./TodoList.js";
import { now } from "./utils.js";

const initialModel = {
  todoCreation: { state: "INIT" },
  todoList : {
    sortBy: { state: "SORTED", criteria: "title asc", criterias: [ "title asc", "title desc", "most important", "least important" ] },
    todos: [
      {
        title: "first todo",
        importance: 1,
        description: "this is the first one",
      }
    ]
  }
};

const root = document.querySelector("#todo");

const TodoCreation = ({ model, updateModel }) => ({
  events: [
    {
      selector: "button#btnNew",
      ev: "click",
      handler: () => updateModel({ todoCreation: { state: "CREATE" } }),
    },
    {
      selector: "button#btnCreate",
      ev: "click",
      handler: (e) => {
        const form = e.target.closest("form");

        if (!form.checkValidity()){
          form.reportValidity();
          return;
        }

        const title = form.querySelector('input[name="title"]').value;
        const importance = form.querySelector('input[name="importance"]').value;
        const dueDate = form.querySelector('input[name="dueDate"]').value;
        const description = form.querySelector(
          'textarea[name="description"]'
        ).value;

        updateModel({
          todoCreation: { state: "INIT" },
          todoList: { ...model.todoList, todos: [ ...model.todoList.todos, { title, importance, dueDate, description } ] }
        });
      },
    },
    {
      selector: "button#btnCancel",
      ev: 'click',
      handler: (e) => {
          updateModel({
              todoCreation: { state: 'INIT' }
          })
      }
    }
  ],
  template: (m) => `
        <div class="todocreation">
            ${m.todoCreation.state === "INIT"
                ? ` <div class="todo-new-panel">
                        <button class="button" id="btnNew">New</button>
                    </div>`
                : ` <form>
                        <div class="todo-create-panel">
                            <div class="form-input">
                                <label for="title">title </label>
                                <input class="form-input__textbox" type="text" name="title" required/>
                            </div>
                            <div class="form-input">
                                <label for="importance">importance </label>
                                <input class="form-input__textbox" type="number" name="importance" min="1" max="10" value="1" required/>
                            </div>
                            <div class="form-input">
                                <label for="dueDate">due date </label>
                                <input class="form-input__textbox" type="date" name="dueDate" value=${now()} required/>
                            </div>
                            <div class="todo-create-panel__area form-input">
                                <label for="description">description </label>
                                <textarea class="form-input__textbox" name="description" rows="4"></textarea>
                            </div>
                            <div class="todo-create-panel__button form-input">
                                <button class="button" id="btnCancel">Cancel</button>
                                <button class="button" id="btnCreate">Create</button>
                            </div>
                        </div>
                    </form>`
            }
        </div>`,
});

const App = (applicationContext) => ({  
    events: [
      ...TodoCreation(applicationContext).events,
      ...TodoList(applicationContext).events
    ],
    template: (model) => `
        <div class="main">
            <h1>Note App</h1>
            ${TodoCreation(applicationContext).template(model)}
            ${TodoList(applicationContext).template(model)}
        </div>`,
});

const { render } = initMyApplication(initialModel, root, App);
render();