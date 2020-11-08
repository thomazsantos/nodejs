import User from './../models/user.js'

const auth = (req, res, next) => {
  const token = req.cookies.auth
  User.findByToken(token, (err, user) => {
    if (err) {
      console.log(err)
      throw err
    }
    if (!user) {
      console.log(err)
      return res.json({
        error: true,
        user: 'user not found!'
      })
    }
    req.token = token
    req.user = user
    next()
  })
}

export default auth
