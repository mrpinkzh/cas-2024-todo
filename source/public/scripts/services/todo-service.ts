import httpService from './http-service.js';

class TodoService {
    async getTodos () {
        return httpService.get('/api/todos');
    }

    async postTodos(todo): Promise<number> {
        return httpService.post('/api/todos', todo);
    }

    async putTodo(id, todo) {
        return httpService.put(`/api/todos/${id}`, todo);
    }
    
    async deleteTodo(id) {
        return httpService.delete(`/api/todos/${id}`);
    }
}

const todoService = new TodoService();
export default todoService;