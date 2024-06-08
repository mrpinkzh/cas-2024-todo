import { TodoModel } from "../viewmodels/todo-model.js";
import { NoItemAction, ShowDeleting } from "../viewmodels/todos-loading-states.js";

const Todo = (todo: TodoModel) => (`
    ${todo.itemAction instanceof ShowDeleting
    ? ` <div class="todolist-todo border">
            <div class="temporary-message border-focus">
            Deleting '${todo.title}' ...
            </div>
        </div>`
    : todo.itemAction instanceof NoItemAction
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
            <button class="button button-secondary" id="btnDelete" data-id="${todo.id}">
                Delete
            </button>
            <button class="button button-secondary btnEdit" data-id=${todo.id}>
                Edit
            </button>
            ${todo.done
            ? ` <span>Done!</span>`
            : ` <button class="button" id="btnDone" data-id="${todo.id}">
                  Done
                </button>`
        }
        </div>
      </div>`
    : ``
    }`);

export default Todo;