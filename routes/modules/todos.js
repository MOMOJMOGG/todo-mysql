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
    req.flash('success_msg', '待辦清單新增成功, 可繼續更新或回到首頁!')
    return res.redirect(`/todos/${todo.toJSON().id}/edit`)
  } catch (err) {
    return res.status(422).json(err)
  }
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

router.get('/:id/edit', async (req, res) => {
  try {
    const id = req.params.id
    const todo = await Todo.findByPk(id)
    return res.render('edit', { todo: todo.toJSON() })
  } catch (err) {
    return res.status(422).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    let { name, isDone } = req.body
    const errors = []
    if (!name) {
      errors.push({ message: '欄位不得為空白!' })
    }
    if (name.length > 30) {
      errors.push({ message: '字數不得超過 30。' })
    }
    if (errors.length) {
      req.flash('errors', errors)
      return res.redirect(`/todos/${id}/edit`)
    }

    isDone = true ? isDone === 'on' : false

    await Todo.update({ name, isDone }, { where: { id } })

    req.flash('success_msg', '待辦事項更新成功, 可繼續更新或回到首頁!')
    return res.redirect(`/todos/${id}/edit`)
  } catch (err) {
    return res.status(422).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Todo.destroy({ where: { id } })
    req.flash('success_msg', '待辦清單刪除成功!')
    return res.redirect('/')
  } catch (err) {
    return res.status(422).json(err)
  }
})

module.exports = router