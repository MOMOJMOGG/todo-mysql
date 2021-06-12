const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User
module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        return done(null, false, { message: 'That email is not registered!' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, { message: 'Email or Password incorrect.' })
      }

      return done(null, user)
    } catch (err) {
      return console.warn(err)
    }
  }))
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findByPk(id)
      user = user.toJSON()
      return done(null, user)
    } catch (err) {
      return console.warn(err)
    }
  })
}