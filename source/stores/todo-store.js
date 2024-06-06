import Datastore from 'nedb-promises'

const db = new Datastore({filename: './data/todos.db', autoload: true});

export const getTodos = async () => db.find().exec()

export const saveTodo = async (todo) => db.insert(todo)