import { sortTodos, filterTodos } from "./utils.js";

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
                    },
                })
            }
        },
        {
            selector: 'button#btnFilter',
            ev: 'click',
            handler: () => {
                updateModel({ 
                    todoList: { 
                        ...model.todoList, 
                        filter: { ...model.todoList.filter, state: 'CHOOSE' }
                    } 
                })
            }
        },
        {
            selector: '#filterButtonList',
            ev: 'click',
            handler: (e) => {
                const criteria = e.target.dataset.filtering;
                updateModel({
                    todoList: {
                        ...model.todoList,
                        filter: { ...model.todoList.filter, state: 'FILTERED', criteria },
                    },
                })
            }
        },
        {
            selector: 'button#btnDone',
            ev: 'click',
            handler: (e) => {
                const todoId = Number(e.target.dataset.id);
                updateModel({
                    todoList: {
                        ...model.todoList,
                        todos: [
                            ...model.todoList.todos.filter(todo => todo.id !== todoId),
                            ...model.todoList.todos
                                .filter(todo => todo.id === todoId)
                                .map(todo => ({ ...todo, done: true }))
                        ]
                    }
                });
            }
        }
    ],
    template: (m) => `
        <div class="todolist">
            ${m.todoList.todos.length > 0
                ? `
                    <div class="todolist__sorting">
                        ${m.todoList.sortBy.state === "SORTED"
                            ? ` <button class="button" id="btnSort">Sort by: ${m.todoList.sortBy.criteria}</button>`
                            : ` <label for="sortButtonList">Sort by:</label>
                                <div id="sortButtonList" class="button-list">
                                    ${m.todoList.sortBy.criterias.map(criteria => 
                                        `<button data-sorting="${criteria}" class="button">${criteria}</button>`
                                    ).join('')}
                                </div>`
                        }
                        ${m.todoList.filter.state === "FILTERED"
                            ? ` <button class="button" id="btnFilter">Filter: ${m.todoList.filter.criteria}</button>`
                            : ` <label>Filter: </label>
                                <div id="filterButtonList" class="button-list">
                                    ${m.todoList.filter.criterias.map(criteria => 
                                        `<button data-filtering="${criteria}" class="button">${criteria}</button>`
                                    ).join('')}
                                </div>`
                        }
                    </div>
                    ${sortTodos(filterTodos(m.todoList.todos, m.todoList.filter.criteria), m.todoList.sortBy.criteria).map((todo) => `
                        <div class="todolist__todo ${todo.done ? 'todolist__todo--done' : ''}">
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
                                <p class="todo-property__value" name="dueDate">
                                    ${todo.dueDate ? todo.dueDate : 'Someday'}
                                </p>
                            </div>
                            <div class="todo-property">
                                <label for="description">description</label>
                                <p class="todo-property__value" name="description">${todo.description}</p>
                            </div>
                            <div class="todo-property--buttons">
                                ${todo.done 
                                    ? `
                                        <span>Done!</span>`
                                    : `
                                        <button class="button" id="btnDone" data-id="${todo.id}">
                                            Done
                                        </button>`}
                            </div>
                        </div>`
                    )}`
                : `
                    <div class="todolist__empty">
                        <span>Nothing to do. Enjoy your day! :)</span>
                    </div>`
            }
        <div>`
})

export default TodoList