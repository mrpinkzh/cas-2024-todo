import express from 'express';
import bodyParser from 'body-parser';
import { getTodos, saveTodo } from './stores/todo-store.js';

const app = express();
const router = express.Router();

router.get('/api/todos', async (req, res) => {
    const todos = await getTodos();
    res.json(todos)
    res.sendStatus(200);
})

router.post('/api/todos', async (req, res) => {
    await saveTodo(req.body);
    res.sendStatus(200);
})

app.use(express.static('source/public'));
app.use(bodyParser);
app.use(router);

export default app;