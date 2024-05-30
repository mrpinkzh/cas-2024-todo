
const validateAndDeconstructForm = (form) => {
    if (form.checkValidity())
        return {
            valid: true,
            todo: {
                title: form.querySelector('input[name="title"]').value,
                importance: form.querySelector('input[name="importance"]').value,
                dueDate: form.querySelector('input[name="dueDate"]').value,
                description: form.querySelector('textarea[name="description"]').value
            }
        }
    return { valid: false };
}

const TodoCreation = ({model, updateModel}) => ({
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
    
            const { valid, todo } = validateAndDeconstructForm(form);

            if (valid){
                updateModel({
                    todoCreation: { state: "INIT" },
                    todoList: { ...model.todoList, todos: [ ...model.todoList.todos, todo ] }
                  });
            } else {
                form.reportValidity();
            }
          },
        },
        {
          selector: "button#btnCreateAndNew",
          ev: "click",
          handler: (e) => {
            const form = e.target.closest("form");

            const { valid, todo } = validateAndDeconstructForm(form);

            if (valid){
                updateModel({ todoList: { ...model.todoList, todos: [ ...model.todoList.todos, todo ] } });
            } else {
                form.reportValidity();
            }
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
                                    <input class="form-input__textbox" type="date" name="dueDate" />
                                </div>
                                <div class="todo-create-panel__area form-input">
                                    <label for="description">description </label>
                                    <textarea class="form-input__textbox" name="description" rows="4"></textarea>
                                </div>
                                <div class="todo-create-panel__button form-input">
                                    <button class="button button-secondary" id="btnCancel">Cancel</button>
                                    <button class="button" id="btnCreate">Create</button>
                                    <button class="button button-secondary" id="btnCreateAndNew">Create & New</button>
                                </div>
                            </div>
                        </form>`
                }
            </div>`
})

export default TodoCreation