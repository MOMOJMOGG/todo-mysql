const express = require('express')
const router = express.Router()

const db = require('../../models')
const Todo = db.Todo

// router.get('/', (req, res) => {
//   const userId = req.user._id
//   Todo.find({ userId }) // 從資料庫找出資料
//     .lean()   // 把資料轉換成單純的 JS 物件
//     .sort({ _id: 'asc' }) // 在 DB 中, 以正序排序 (反序排序為 'desc')
//     .then(todos => res.render('index', { todos })) // 接著把資料送給前端樣板
//     .catch(err => console.log(err)) // 如果發生意外, 執行錯誤處理
// })

router.get('/', async (req, res) => {
  try {
    const userId = req.user.id
    const todos = await Todo.findAll({
      raw: true,
      nest: true
    })
    return res.render('index', { todos: todos })
  } catch (err) {
    return res.status(422).json(err)
  }
})

module.exports = router