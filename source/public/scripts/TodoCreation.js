import todoService from "./services/todo-service.js";
import { TodosNotLoaded, TodosLoaded, CreatingNewTodo } from "./viewmodels/todos-loading-states.js";

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

const TodoCreation = ({model, updateModel}) => ({
    events: [
        {
          selector: "button#btnNew",
          ev: "click",
          handler: () => updateModel({ 
            state: new CreatingNewTodo(
                model.state.todos, 
                model.state.sortBy, 
                model.state.filter) }),
        },
        {
          selector: "button#btnCreate",
          ev: "click",
          handler: async (e) => {
            const form = e.target.closest("form");
    
            const { valid, todo } = validateAndDeconstructForm(form);

            if (valid) {
                await todoService.postTodos(todo)
                updateModel({ state: new TodosNotLoaded()});
                const todos = await todoService.getTodos()
                updateModel({ state: new TodosLoaded(todos)})
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
                await todoService.postTodos(todo)
                updateModel({ state: new TodosNotLoaded()});
                const todos = await todoService.getTodos()
                updateModel({ state: new CreatingNewTodo(todos)})
            }
            else
                form.reportValidity();
          },
        },
        {
          selector: "button#btnCancel",
          ev: 'click',
          handler: () => { updateModel({ state: new TodosLoaded(model.state.todos) }); }
        }
      ],
      template: (m) => `
            <div class="todocreation">
                ${m.state instanceof CreatingNewTodo
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