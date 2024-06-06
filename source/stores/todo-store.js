import Datastore from 'nedb-promises'

const db = new Datastore({filename: './data/todos.db', autoload: true});

export const getTodos = async () => db.find()

export const getTodo = async id => db.findOne({_id: id})

export const insertTodo = (todo) => db.insert(todo)

export const updateTodo = (id, update) => db.update({_id: id}, {$set: update})

export const deleteTodo = (id) => db.deleteOne({_id: id});