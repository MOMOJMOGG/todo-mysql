const express = require('express')
const router = express.Router()

const passport = require('passport')
const bcrypt = require('bcryptjs')

const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/users/register', (req, res) => {
  res.render('register')
})

router.post('/users/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    let user = await User.findOne({ where: { email } })
    if (user) {
      console.log(user)
      console.log('User already exists')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    user = await User.create({
      name,
      email,
      password: hash
    })
    console.log(user)
    return res.redirect('/')
  } catch (err) {
    return res.status(422).json(err)
  }
})

router.get('/logout', (req, res) => {
  req.logout() // passport 會自動把使用者在 seesion 中的資訊清掉
  // req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router