import httpService from './http-service.js';

class TodoService {
    async getTodos(): Promise<Todo[]> {
        return httpService.get('/api/todos');
    }

    async postTodos(todo): Promise<number> {
        return httpService.post('/api/todos', todo);
    }

    async putTodo(id, todo): Promise<number> {
        return httpService.put(`/api/todos/${id}`, todo);
    }

    async deleteTodo(id): Promise<number> {
        return httpService.delete(`/api/todos/${id}`);
    }
}

export interface Todo {
    _id: string;
    title: string;
    importance: number;
    dueDate: Date;
    description: string;
    done: boolean;
}

const todoService = new TodoService();
export default todoService;