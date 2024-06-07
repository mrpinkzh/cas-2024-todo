import { TodoApplicationContext } from "../controllers/TodoApplicationContext.js";
import todoService from "../services/todo-service.js";
import { CreatingTodo, ShowCreateButton, ShowCreationForm, ShowNewButton, TodoCreated } from "../viewmodels/todos-creation-states.js";
import TodosModel from "../viewmodels/todos-model.js";

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

const TodoCreation = ({model, render} : TodoApplicationContext) => ({
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
            if (model.creation instanceof ShowCreationForm){
                const form = e.target.closest("form");
                const { valid, todo } = validateAndDeconstructForm(form);
            
                if (valid) {
                    model.creation.creatingTodo(todo.title);
                    render()
                    const postStatus = await todoService.postTodos(todo)
                    if (postStatus === 201){
                        model.creation.todoCreated(todo.title)
                        render()
                        model.loadingTodos()
                        render()
                        const todos = await todoService.getTodos()
                        model.receivedTodos(todos)
                        model.showNewButton();
                        render()
                    }
                }
                else 
                    form.reportValidity();
            }
          },
        },
        {
          selector: "button#btnCreateAndNew",
          ev: "click",
          handler: async (e) => {
            if (model.creation instanceof ShowCreationForm){
                const form = e.target.closest("form");
                const { valid, todo } = validateAndDeconstructForm(form);
            
                if (valid) {
                    model.creation.creatingTodo(todo.title);
                    render()
                    const postStatus = await todoService.postTodos(todo)
                    if (postStatus === 201){
                        model.creation.todoCreated(todo.title)
                        render()
                        model.loadingTodos()
                        render()
                        const todos = await todoService.getTodos()
                        model.receivedTodos(todos)
                        model.showCreationForm()
                        render()
                    }
                }
                else 
                    form.reportValidity();
            }
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
    template: (model : TodosModel) => `
      <div class="todocreation">
        ${model.creation instanceof ShowNewButton
          ? ` <div class="todo-new-panel">
                <button class="button" id="btnNew">New</button>
              </div>`          
          : model.creation instanceof ShowCreationForm
            ? model.creation.buttonState instanceof ShowCreateButton
              ? ` <div class="todo-create-panel border-focus">
                    <form class="todo-create-form">
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
                    </form>
                  </div>` 
              : 
              model.creation.buttonState instanceof CreatingTodo
              ? ` <div class="todo-create-panel border">
                        <div class="temporary-message border-focus">
                        <p>Creating Todo '${model.creation.buttonState.title}' ...</p>
                        </div>
                    </div>`
              : 
              model.creation.buttonState instanceof TodoCreated
              ? ` <div class="todo-create-panel border">
                    <div class="temporary-message border-focus">
                      <p>Created Todo '${model.creation.buttonState.title}' ...</p>
                    </div>
                  </div>`
              : ''
            : ''
        }
       </div>`})

export default TodoCreation