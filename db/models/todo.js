const mongoose = require('mongoose')
const todoSchema = require('./../schemas/todo.js')

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
