import todoService from "../services/todo-service.js";
import { ShowCreationForm } from "../viewmodels/todos-creation-states.js";

const validateAndDeconstructForm = (form) => {
    if (form.checkValidity())
        return {
            valid: true,
            todo: {
                title: form.querySelector('input[name="title"]').value,
                importance: form.querySelector('input[name="importance"]').value,
                dueDate: form.querySelector('input[name="dueDate"]').value,
                description: form.querySelector('textarea[name="description"]').value,
                done: false
            }
        }
    return { valid: false };
}

const TodoCreation = ({model, render}) => ({
    events: [
        {
          selector: "button#btnNew",
          ev: "click",
          handler: () => {
            model.showCreationForm();
            render() 
          },
        },
        {
          selector: "button#btnCreate",
          ev: "click",
          handler: async (e) => {
            const form = e.target.closest("form");
    
            const { valid, todo } = validateAndDeconstructForm(form);

            if (valid) {
                model.creatingTodo()
                render()
                await todoService.postTodos(todo)
                model.todoCreated()
                render()
                model.loadingTodos()
                render()
                const todos = await todoService.getTodos()
                model.receivedTodos(todos)
                model.showNewButton();
                render()
            }
            else 
                form.reportValidity();
          },
        },
        {
          selector: "button#btnCreateAndNew",
          ev: "click",
          handler: async (e) => {
            const form = e.target.closest("form");

            const { valid, todo } = validateAndDeconstructForm(form);

            if (valid) {
                model.creatingTodo()
                render()
                await todoService.postTodos(todo)
                model.todoCreated()
                render()
                model.loadingTodos()
                render()
                const todos = await todoService.getTodos()
                model.receivedTodos(todos)
                model.showCreationForm()
                render()
            }
            else
                form.reportValidity();
          },
        },
        {
          selector: "button#btnCancel",
          ev: 'click',
          handler: () => { 
            model.showNewButton()
            render()
          }
        }
      ],
      template: (m) => `
            <div class="todocreation">
                ${m.creation instanceof ShowCreationForm
                    ? ` <form>
                            <div class="todo-create-panel">
                                <div class="form-input">
                                    <label for="title">title </label>
                                    <input class="textbox" type="text" name="title" required/>
                                </div>
                                <div class="form-input">
                                    <label for="importance">importance </label>
                                    <input class="textbox" type="number" name="importance" min="1" max="10" value="1" required/>
                                </div>
                                <div class="form-input">
                                    <label for="dueDate">due date </label>
                                    <input class="textbox" type="date" name="dueDate" />
                                </div>
                                <div class="todo-create-panel-area form-input">
                                    <label for="description">description </label>
                                    <textarea class="textbox" name="description" rows="4"></textarea>
                                </div>
                                <div class="todo-create-panel-buttons form-input">
                                    <button class="button button-secondary" id="btnCancel">Cancel</button>
                                    <button class="button" id="btnCreate">Create</button>
                                    <button class="button button-secondary" id="btnCreateAndNew">Create & New</button>
                                </div>
                            </div>
                        </form>`
                    : ` <div class="todo-new-panel">
                        <button class="button" id="btnNew">New</button>
                    </div>`
                }
            </div>`
})

export default TodoCreation