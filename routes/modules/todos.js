const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/new', (req, res) => {
  const userId = req.user.id
  const name = req.body.name
  // const todo = new Todo({ name })
  // return todo.save()
  //   .then(() => res.redirect('/'))
  //   .catch(err => console.log(err))
  // return Todo.create({ name, userId })
  //   .then(() => res.redirect('/'))
  //   .catch(err => console.log(err))
})

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const todo = await Todo.findByPk(id)
    return res.render('detail', { todo: todo.toJSON() })
  } catch (err) {
    return res.status(422).json(err)
  }
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user.id
  const todoId = req.params.id
  return Todo.findOne({ id: todoId, userId })
    .lean()
    .then(todo => res.render('edit', { todo }))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
  const userId = req.user.id
  const todoId = req.params.id
  const { name, isDone } = req.body // 解構賦值
  return Todo.findOne({ id: todoId, userId })
    .then(todo => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => res.redirect(`/todos/${_id}`))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const userId = req.user.id
  const todoId = req.params.id
  return Todo.findOne({ id: todoId, userId })
    .then(todo => todo.remove())
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

module.exports = router