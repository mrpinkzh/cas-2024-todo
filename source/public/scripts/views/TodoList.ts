import { TodoApplicationContext } from "../controllers/TodoApplicationContext.js";
import todoService from "../services/todo-service.js";
import { filterPredicate, sortFunction } from "../utils.js";
import { TodosFiltered, TodosFiltering } from '../viewmodels/todos-filtering-states.js'
import { TodosLoaded } from "../viewmodels/todos-loading-states.js";
import TodosModel from "../viewmodels/todos-model.js";
import { TodosSorted, TodosSorting } from '../viewmodels/todos-sorting-states.js'
import Todo, { validateAndDeconstructForm } from "./Todo.js";
import { TodoApplicationView } from "./TodoApplicationView.js";
import { TodoModel } from "../viewmodels/todo-model.js";
import todolistController from "../controllers/todolist-controller.js";

const TodoList = ({ model, render }: TodoApplicationContext): TodoApplicationView => {
    const controller = todolistController({ model, render })

    const handleButtonDone = async (e) => {
        if (model.todoList instanceof TodosLoaded) {
            const todoId = e.target.dataset.id;
            const todo = model.todoList.todos.find(x => x._id === todoId);
            await todoService.putTodo(todoId, { ...todo, done: true });
            model.loadingTodos();
            render();
            const todos = await todoService.getTodos();
            model.receivedTodos(todos);
            render();
        }
    }

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
            {
                selector: 'button#btnSort',
                ev: 'click',
                handler: () => {
                    if (model.todoList instanceof TodosLoaded) {
                        model.todoList.showSortCriterias();
                        render();
                    }
                }
            },
            {
                selector: '#sortButtonList',
                ev: 'click',
                handler: (e) => {
                    if (model.todoList instanceof TodosLoaded) {
                        const criteria = e.target.dataset.sorting;
                        model.todoList.sortWith(criteria);
                        render();
                    }
                }
            },
            {
                selector: 'button#btnFilter',
                ev: 'click',
                handler: () => {
                    if (model.todoList instanceof TodosLoaded) {
                        model.todoList.showFilterCriterias();
                        render();
                    }
                }
            },
            {
                selector: '#filterButtonList',
                ev: 'click',
                handler: (e) => {
                    if (model.todoList instanceof TodosLoaded) {
                        const criteria = e.target.dataset.filtering;
                        model.todoList.filterWith(criteria);
                        render();
                    }
                }
            },
            {
                selector: 'div.todolist',
                ev: 'click',
                handler: async (e) => {
                    e.preventDefault();
                    const todoId = e.target.dataset.id;
                    if (e.target.matches('button#btnDone'))
                        await handleButtonDone(e)
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
                  <div class="todolist-sorting">
                    ${model.todoList.sortBy instanceof TodosSorted
                        ? ` <button class="button" id="btnSort">Sort by: ${model.todoList.sortBy.criteria}</button>`
                        : model.todoList.sortBy instanceof TodosSorting
                            ? ` <label for="sortButtonList">Sort by:</label>
                      <div id="sortButtonList" class="button-list">
                      ${model.todoList.sortBy.criterias.map(criteria => `
                          <button data-sorting="${criteria}" class="button">${criteria}</button>`)
                                .join('')}
                      </div>`
                            : ``}
                    ${model.todoList.filter instanceof TodosFiltered
                        ? ` <button class="button" id="btnFilter">Filter: ${model.todoList.filter.criteria}</button>`
                        : model.todoList.filter instanceof TodosFiltering
                            ? ` <label>Filter: </label>
                      <div id="filterButtonList" class="button-list">
                      ${model.todoList.filter.criterias.map(criteria => `
                          <button data-filtering="${criteria}" class="button">${criteria}</button>`)
                                .join('')}
                      </div>`
                            : ``}
                  </div>
                  ${model.todoList.todos
                        .filter(filterPredicate(model.todoList.filter.criteria))
                        .sort(sortFunction(model.todoList.sortBy.criteria))
                        .map((todo) => {
                            if (model.todoList instanceof TodosLoaded) {
                                return Todo(new TodoModel(todo, model.todoList.itemAction.evaluateTodoStateFor(todo._id)))
                            }
                        })}
                </div>`
                : ` <div class="temporary-message border">
                <p>Loading...</p>
              </div>`}
        <div>`
    });
}

export default TodoList