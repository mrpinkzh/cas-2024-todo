import { sortTodos } from "./utils.js";

const TodoList = ({model, updateModel}) => ({
    events: [
        {
            selector: 'button#btnSort',
            ev: 'click',
            handler: (e) => {
                updateModel({
                    todoList: {
                        ...model.todoList,
                        sortBy: { ...model.todoList.sortBy, state: 'CHOOSE' }
                    }
                });
            }
        },
        {
            selector: '#sortButtonList',
            ev: 'click',
            handler: (e) => {
                const criteria = e.target.dataset.sorting;
                updateModel({
                    todoList: {
                        ...model.todoList,
                        sortBy: { ...model.todoList.sortBy, state: 'SORTED', criteria },
                        todos: sortTodos(model.todoList.todos, criteria)
                    },
                })
            }
        }
    ],
    template: (model) => `
        <div class="todolist">
            <div class="todolist__sorting">
                ${model.todoList.sortBy.state === "SORTED"
                    ? ` <button class="button" id="btnSort">Sort by: ${model.todoList.sortBy.criteria}</button>`
                    : ` <label>Sort by:</label>
                        <div id="sortButtonList" style="display: inline">
                            ${model.todoList.sortBy.criterias.map(criteria => 
                                `<button data-sorting="${criteria}" class="button">${criteria}</button>`
                            ).join('')}
                        </div>`
                }
            </div>
            ${model.todoList.todos.map((todo) => `
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
        <div>`
})

export default TodoList