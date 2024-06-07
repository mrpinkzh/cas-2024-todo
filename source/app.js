import express from 'express';
import bodyParser from 'body-parser';
import { getTodos, insertTodo, updateTodo, deleteTodo } from './stores/todo-store.js';

const app = express();
const router = express.Router();

router.get('/api/todos', async (_req, res) => {
    const todos = await getTodos();
    res.json(todos)
    res.end()
})

router.post('/api/todos', async (req, res) => {
    await insertTodo(req.body);
    res.sendStatus(201);
})

router.put('/api/todos/:id', async (req, res) => {
    const { id } = req.params;
    await updateTodo(id, req.body);
    res.sendStatus(200);
})

router.delete('/api/todos/:id', async(req, res) => {
    const { id } = req.params;
    await deleteTodo(id);
    res.sendStatus(200);
})

app.use(express.static('source/public'));
app.use(bodyParser.json());
app.use(router);

export default app;