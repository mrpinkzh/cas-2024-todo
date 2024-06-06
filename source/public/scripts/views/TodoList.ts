import { TodoApplicationContext } from "../controllers/TodoApplicationContext.js";
import todoService from "../services/todo-service.js";
import { filterPredicate, sortFunction } from "../utils.js";
import { TodosFiltered } from '../viewmodels/todos-filtering-states.js'
import TodosModel from "../viewmodels/todos-model.js";
import { TodosSorted } from '../viewmodels/todos-sorting-states.js'

const TodoList = ({model, render} : TodoApplicationContext) => ({
    events: [
        {
            selector: 'button#btnSort',
            ev: 'click',
            handler: () => {
                model.todoList.showSortCriterias();
                render();
            }
        },
        {
            selector: '#sortButtonList',
            ev: 'click',
            handler: (e) => {
                const criteria = e.target.dataset.sorting
                model.todoList.sortWith(criteria)
                render()
            }
        },
        {
            selector: 'button#btnFilter',
            ev: 'click',
            handler: () => {
                model.todoList.showFilterCriterias()
                render()
            }
        },
        {
            selector: '#filterButtonList',
            ev: 'click',
            handler: (e) => {
                const criteria = e.target.dataset.filtering;
                model.todoList.filterWith(criteria)
                render()
            }
        },
        {
            selector: 'button#btnDone',
            ev: 'click',
            handler: async (e) => {
                const todoId = e.target.dataset.id;
                const todo = model.todoList.todos.find(x => x._id === todoId)
                await todoService.putTodo(todoId, { ...todo,  done: true });
                model.loadingTodos()
                render()
                const todos = await todoService.getTodos()
                model.receivedTodos(todos)
                render()
            }
        },
        {
            selector: 'button#btnDelete',
            ev: 'click',
            handler: async (e) => {
                const todoId = e.target.dataset.id;
                await todoService.deleteTodo(todoId);
                model.loadingTodos()
                render()
                const todos = await todoService.getTodos()
                model.receivedTodos(todos)
                render()
            }
        }
    ],
    template: (model : TodosModel) => `
        <div class="todolist">
          ${model.todoList.todos.length > 0
            ? `
                <div class="todolist-sorting">
                  ${model.todoList.sortBy instanceof TodosSorted
                    ? ` <button class="button" id="btnSort">Sort by: ${model.todoList.sortBy.criteria}</button>`
                    : ` <label for="sortButtonList">Sort by:</label>
                          <div id="sortButtonList" class="button-list">
                            ${model.todoList.sortBy.criterias.map(criteria => `
                              <button data-sorting="${criteria}" class="button">${criteria}</button>`)
                              .join('')}
                          </div>`
                        }
                  ${model.todoList.filter instanceof TodosFiltered
                    ? ` <button class="button" id="btnFilter">Filter: ${model.todoList.filter.criteria}</button>`
                    : ` <label>Filter: </label>
                          <div id="filterButtonList" class="button-list">
                            ${model.todoList.filter.criterias.map(criteria => `
                              <button data-filtering="${criteria}" class="button">${criteria}</button>`)
                              .join('')}
                          </div>`
                        }
                </div>
                ${model.todoList.todos
                    .filter(filterPredicate(model.todoList.filter.criteria))
                    .sort(sortFunction(model.todoList.sortBy.criteria))
                    .map((todo) => `
                        <div class="todolist-todo ${todo.done ? 'todolist-todo-done' : ''}">
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
                                ${todo.done 
                                    ? `
                                        <span>Done!</span>`
                                    : `
                                        <button class="button button-secondary" id="btnDelete" data-id="${todo._id}">
                                            Delete
                                        </button>
                                        <button class="button" id="btnDone" data-id="${todo._id}">
                                            Done
                                        </button>`}
                            </div>
                        </div>`
                    )}`
                : `
                    <div class="todolist-empty">
                        <span>Nothing to do. Enjoy your day! :)</span>
                    </div>`
            }
        <div>`
})

export default TodoList