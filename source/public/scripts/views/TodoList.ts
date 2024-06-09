import { TodoApplicationContext } from "../controllers/TodoApplicationContext.js";
import { filterPredicate, sortFunction } from "../utils.js";
import { TodosLoaded } from "../viewmodels/todos-loading-states.js";
import TodosModel from "../viewmodels/todos-model.js";
import Todo, { validateAndDeconstructForm } from "./Todo.js";
import { TodoApplicationView } from "./TodoApplicationView.js";
import { TodoModel } from "../viewmodels/todo-model.js";
import todolistController from "../controllers/todolist-controller.js";
import TodoListSorting from "./TodoListSorting.js";

const TodoList = ({ model, render }: TodoApplicationContext): TodoApplicationView => {
    const controller = todolistController({ model, render })

    const handleButtonUpdate = async (e) => {
        const form = e.target.closest("form");

        const { valid, todo } = validateAndDeconstructForm(form);

        if (valid) {
            const todoId = e.target.dataset.id;
            await controller.updateTodo(todoId, todo);
        }
        else
            form.reportValidity();
    }

    return ({
        events: [
            ...TodoListSorting({ model, render }).events,
            {
                selector: 'div.todolist',
                ev: 'click',
                handler: async (e) => {
                    e.preventDefault();
                    const todoId = e.target.dataset.id;
                    if (e.target.matches('button#btnDone'))
                        await controller.setToDone(todoId);
                    if (e.target.matches('button#btnDelete'))
                        await controller.deleteTodo(todoId)
                    if (e.target.matches('button.btnEdit'))
                        controller.showEditMode(todoId);
                    if (e.target.matches('button#btnCancelUpdate'))
                        controller.cancelEdit();
                    if (e.target.matches('button#btnUpdate'))
                        await handleButtonUpdate(e)
                }
            }
        ],
        template: (model: TodosModel) => `
        <div class="todolist">
            ${model.todoList instanceof TodosLoaded
                ? model.todoList.todos.length === 0
                    ? ` <div class="todolist-empty">
                          <span>Nothing to do. Enjoy your day! :)</span>
                        </div>`
                    : ` <div class="todolist-with-data">
                            ${TodoListSorting({ model, render }).template(model)}
                            ${model.todoList.todos
                                .filter(filterPredicate(model.todoList.filter.criteria))
                                .sort(sortFunction(model.todoList.sortBy.criteria))
                                .map((todo: Todo) => {
                                    if (model.todoList instanceof TodosLoaded) {
                                        return Todo(new TodoModel(todo, model.todoList.itemAction.evaluateTodoStateFor(todo._id)))
                                    }
                                })}
                        </div>`
                : ` <div class="temporary-message border">
                        <p>Loading Todos...</p>
                    </div>`}
        <div>`
    });
}

export default TodoList