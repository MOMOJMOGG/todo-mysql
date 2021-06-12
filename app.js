const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const usePassport = require('./config/passport')


const app = express()
const PORT = 3000

const db = require('./models')
const Todo = db.Todo
const User = db.User

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

usePassport(app)

const passport = require('passport')

app.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll({
      raw: true,
      nest: true
    })
    return res.render('index', { todos: todos })
  } catch (err) {
    return res.status(422).json(err)
  }
})

app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id
    const todo = await Todo.findByPk(id)
    return res.render('detail', { todo: todo.toJSON() })
  } catch (err) {
    return res.status(422).json(err)
  }
})

app.get('/users/login', (req, res) => {
  res.render('login')
})

app.post('/users/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

app.get('/users/register', (req, res) => {
  res.render('register')
})

app.post('/users/register', async (req, res) => {
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

app.get('/users/logout', (req, res) => {
  res.send('logout')
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})