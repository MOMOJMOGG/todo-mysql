const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
// const FacebookStrategy = require('passport-facebook').Strategy
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, async (req, email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } })

      if (!user) {
        return done(null, false, req.flash('errors', { message: '此信箱尚未註冊，請註冊一組帳號!' }))
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return done(null, false, req.flash('errors', { message: '帳號或密碼錯誤，請重新輸入!' }))
      }

      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  }))

  // passport Facebook 登入策略
  // passport.use(new FacebookStrategy({
  //   clientID: process.env.FACEBOOK_APP_ID,
  //   clientSecret: process.env.FACEBOOK_APP_SECRET,
  //   callbackURL: process.env.FACEBOOK_APP_CALLBACK_URL,
  //   profileFields: ['email', 'displayName']
  // }, async (accessToken, refreshToken, profile, done) => {
  //   try {
  //     const { name, email } = profile._json
  //     let user = await User.findOne({ where: { email } })
  //     if (user) {
  //       return done(null, user)
  //     }

  //     const randomPassword = Math.random().toString(36).slice(-8) // 隨機產生 0~1小數 | 36: 26英文字母 + 10 數字總數 | 擷取最後8碼
  //     const salt = await bcrypt.genSalt(10)
  //     const hash = await bcrypt.hash(randomPassword, salt)
  //     user = await User.create({ name, email, password: hash })
  //     if (user) {
  //       return done(null, user)
  //     }
  //   } catch (err) {
  //     return done(err, false)
  //   }
  // }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    try {
      let user = await User.findByPk(id)
      user = user.toJSON()
      return done(null, user)
    } catch (err) {
      return done(err, null)
    }
  })
}