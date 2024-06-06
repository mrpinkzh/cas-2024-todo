import Datastore from 'nedb-promises'

const db = new Datastore({filename: './data/todos.db', autoload: true});

export const getTodos = async () => db.find()

export const saveTodo = (todo) => db.insert(todo)