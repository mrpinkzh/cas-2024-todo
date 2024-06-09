import { Todo } from "../services/todo-service.js";
import { Show, ShowDeleting, TodoModel, ShowEditing, ShowUpdating } from "../viewmodels/todo-model.js";

export interface TodoFormResult {
  valid: boolean,
  todo: Todo
}

export const validateAndDeconstructForm = (form): TodoFormResult => {
  if (form.checkValidity())
    return {
      valid: true,
      todo: {
        _id: form.querySelector('input[name="id"]').value,
        title: form.querySelector('input[name="title"]').value,
        importance: form.querySelector('input[name="importance"]').value,
        dueDate: form.querySelector('input[name="dueDate"]').value,
        description: form.querySelector('textarea[name="description"]').value,
        done: form.querySelector('input[name="done"]').value === "true",
        creationDate: form.querySelector('input[name="creationDate"]').value
      }
    }
  return { valid: false, todo: null };
}

const Todo = (todo: TodoModel) => (`
    ${todo.todoState instanceof ShowDeleting
    ? ` <div class="todolist-todo border">
            <div class="temporary-message border-focus">
            Deleting '${todo.title}' ...
            </div>
        </div>`
    : todo.todoState instanceof ShowEditing
      ? `<div class="todo-create-panel border-focus">
          <form class="todo-create-form">
            <input type="hidden" name="id" value="${todo.id}" />
            <input type="hidden" name="done" value="${todo.done}" />
            <input type="hidden" name="creationDate" value="${todo.creationDate}" />
            <div class="form-input">
              <label for="title">title </label>
              <input class="textbox" type="text" name="title" value="${todo.title}" required/>
            </div>
            <div class="form-input">
              <label for="importance">importance </label>
              <input class="textbox" type="number" name="importance" value="${todo.importance}" min="1" max="10" value="1" required/>
            </div>
            <div class="form-input">
              <label for="dueDate">due date </label>
              <input class="textbox" type="date" name="dueDate" value="${todo.dueDate}" />
            </div>
            <div class="todo-create-panel-area form-input">
              <label for="description">description </label>
              <textarea class="textbox" name="description" rows="4">${todo.description}</textarea>
            </div>
            <div class="todo-create-panel-buttons form-input">
              <button class="button button-secondary" id="btnCancelUpdate">Cancel</button>
              <button class="button" id="btnUpdate" data-id="${todo.id}">Update</button>
            </div>
          </form>
        </div>`
      : todo.todoState instanceof ShowUpdating
        ? ` <div class="todolist-todo border">
              <div class="temporary-message border-focus">
                Updating '${todo.title}' ...
              </div>
            </div>`
        : todo.todoState instanceof Show
          ? ` <div class="todolist-todo ${todo.done ? 'todolist-todo-done' : ''}">
          <div class="todo-property">
            <label for="title">title</label>
            <p class="todo-property-value" name="title">${todo.title}</p>
          </div>
          <div class="todo-property">
            <label for="importance">importance</label>
            <p class="todo-property-value" name="importance">${todo.importance}</p>
          </div>
          <div class="todo-property">
            <label for="dueDate">due date</label>
            <p class="todo-property-value" name="dueDate">
                ${todo.dueDate ? todo.dueDate : 'Someday'}
            </p>
          </div>
          <div class="todo-property">
            <label for="description">description</label>
            <p class="todo-property-value" name="description">${todo.description}</p>
          </div>
          <div class="todo-property-buttons">
            ${todo.todoState.allowAction
            ? ` <button class="button button-secondary" id="btnDelete" data-id="${todo.id}">
                  Delete
                </button>
                <button class="button button-secondary btnEdit" data-id=${todo.id}>
                  Edit
                </button>
                ${todo.done
              ? ` <span>Done!</span>`
              : ` <button class="button" id="btnDone" data-id="${todo.id}">
                      Done
                    </button>`}`
            : todo.done
              ? ` <span>Done!</span>`
              : ``}
        </div>
      </div>`
          : ``
  }`);

export default Todo;