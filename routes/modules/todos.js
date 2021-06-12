const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/new', async (req, res) => {
  try {
    const userId = req.user.id
    const name = req.body.name
    const errors = []

    if (!name) {
      errors.push({ message: '欄位不得為空白!' })
    }
    if (name.length > 30) {
      errors.push({ message: '字數不得超過 30。' })
    }
    if (errors.length) {
      return res.render('new', { errors, name })
    }

    const todo = await Todo.create({ name, UserId: userId })
    console.log(todo.id, todo.UserId)
    req.flash('success_msg', '待辦清單新增成功, 可繼續更新或回到首頁!')
    return res.redirect('/')
  } catch (err) {
    return res.status(422).json(err)
  }


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