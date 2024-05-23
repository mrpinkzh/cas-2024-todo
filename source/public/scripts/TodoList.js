const TodoList = ({model, updateModel}) => ({
    events: [
        {
            selector: 'button#btnSort',
            ev: 'click',
            handler: (e) => {
                updateModel({
                    todoList: {
                        ...model.todoList,
                        state: 'CHOOSE'
                    }
                });
            }
        }
    ],
    template: (model) => `
        <div class="todolist">
            <div class="todolist__sorting">
                ${model.todoList.sortBy.state === "SORTED"
                    ? ` <button class="button" id="#btnSort">Sort by: ${model.todoList.sortBy.criteria}</button>`
                    : ` <label>Sort by:</label>
                        ${model.todoList.sortBy.criterias.map(criteria => 
                            `<button class="button">${criteria}</button>`
                        )}`
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