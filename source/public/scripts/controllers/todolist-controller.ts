import todoService, { Todo } from "../services/todo-service.js";
import { TodosLoaded } from "../viewmodels/todos-loading-states.js";
import { TodoApplicationContext } from "./TodoApplicationContext.js";

const todolistController = ({ model, render }: TodoApplicationContext) => ({
    showEditMode(todoId: string): void {
        if (model.todoList instanceof TodosLoaded) {
            model.todoList.showEditMode(todoId);
            render();
        }
    },

    cancelEdit(): void {
        if (model.todoList instanceof TodosLoaded) {
            model.todoList.showReadOnlyMode();
            render();
        }
    },

    async updateTodo(todoId: string, todo: Todo): Promise<void> {
        if (model.todoList instanceof TodosLoaded) {
            model.todoList.showUpdating(todoId)
            render();
            const putResult = await todoService.putTodo(todoId, { ...todo });
            if (putResult === 200) {
                model.loadingTodos();
                render();
                const todos = await todoService.getTodos();
                model.receivedTodos(todos);
                render();
            }
        }
    },

    async setToDone(todoId: string): Promise<void> {
        if (model.todoList instanceof TodosLoaded) {
            const todo = model.todoList.todos.find(x => x._id === todoId);
            model.todoList.showUpdating(todoId);
            render();
            const putResult = await todoService.putTodo(todoId, { ...todo, done: true });
            if (putResult === 200) {
                model.loadingTodos();
                render();
                const todos = await todoService.getTodos();
                model.receivedTodos(todos);
                render();
            }
        }
    },

    async deleteTodo(todoId: string): Promise<void> {
        if (model.todoList instanceof TodosLoaded) {
            model.todoList.deletingTodo(todoId)
            render();
            const deleteStatus = await todoService.deleteTodo(todoId);
            if (deleteStatus === 200) {
                model.loadingTodos();
                render();
                const todos = await todoService.getTodos();
                model.receivedTodos(todos);
                render();
            }
        }
    }
})

export default todolistController