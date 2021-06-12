const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo


router.get('/', async (req, res) => {
  try {
    const userId = req.user.id
    const todos = await Todo.findAll({
      raw: true,
      nest: true,
      where: { UserId: userId }
    })
    return res.render('index', { todos: todos })
  } catch (err) {
    return res.status(422).json(err)
  }
})

module.exports = router