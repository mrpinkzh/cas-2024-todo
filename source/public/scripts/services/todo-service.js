import httpService from './http-service.js';

class TodoService {
    async getTodos () {
        return httpService.get('/api/todos');
    }

    async postTodos(todo) {
        httpService.post('/api/todos', todo);
    }
}

const todoService = new TodoService();
export default todoService;