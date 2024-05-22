import initMyApplication from "./my-application.js";

const initialModel = {
  todoCreation: { state: "INIT" },
  todos: [
    {
      title: "first todo",
      importance: 1,
      description: "this is the first one",
    },
  ],
};

const root = document.querySelector("#todo");

const TodoCreation = ({updateModel}) => ({
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
        const title = form.querySelector('input[name="title"]').value;
        const importance = form.querySelector('input[name="importance"]').value;
        const dueDate = form.querySelector('input[name="dueDate"]').value;
        const description = form.querySelector(
          'textarea[name="description"]'
        ).value;
        updateModel({
          todoCreation: { state: "INIT" },
          todos: [...initialModel.todos, { title, importance, dueDate, description }],
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
  template: (model) => `
        <div class="todocreation">
            ${
              model.todoCreation.state === "INIT"
                ? ` <div class="todo-new-panel">
                        <button class="button" id="btnNew">New</button>
                    </div>`
                : ` <form>
                        <div class="todo-create-panel">
                            <div class="form-input">
                                <label for="title">title </label>
                                <input class="form-input__textbox" type="text" name="title" maxlength="30" required/>
                            </div>
                            <div class="form-input">
                                <label for="importance">importance </label>
                                <input class="form-input__textbox" type="number" name="importance"/>
                            </div>
                            <div class="form-input">
                                <label for="dueDate">due date </label>
                                <input class="form-input__textbox" type="date" name="dueDate" />
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

const App = ({updateModel}) => ({  
    events: [...TodoCreation({updateModel}).events],
    template: (model) => `
        <div class="main">
            <h1>Note App</h1>
            ${TodoCreation({updateModel}).template(model)}
            <div class="todolist">
              ${model.todos.map((todo) => `
                  <div class="todolist__todo">
                      <div class="todo-property">
                        <label for="title">title</label>
                        <p class="todo-property__value" name="title">${todo.title}</p>
                      </div>
                      <div class="todo-property">
                        <label for="importance">importance</label>
                        <p class="todo-property__value" name="importance">${todo.importance}</p>
                      </div>
                      <div class="todo-property">
                        <label for="dueDate">due date</label>
                        <p class="todo-property__value" name="dueDate">${todo.dueDate}</p>
                      </div>
                      <div class="todo-property">
                        <label for="description">description</label>
                        <p class="todo-property__value" name="description">${todo.description}</p>
                      </div>
                  </div>`
              )}
            <div>
        </div>`,
});

const { render } = initMyApplication(initialModel, root, App)
render();