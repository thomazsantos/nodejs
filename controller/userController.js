import User from './../models/user.js'
import bcrypt from 'bcrypt'

function register (req, res) {
  const newuser = new User(req.body)

  if (newuser.password !== newuser.password2) {
    return res.status(400).json({ message: 'password not match' })
  }

  User.findOne({ email: newuser.email }, function (error, user) {
    if (error) {
      console.log(error.stack)
    }
    if (user) {
      return res.status(400).json({ auth: false, message: 'email exits' })
    }

    newuser.save((err, doc) => {
      if (err) {
        console.log(err)
        return res.status(400).json({ success: false })
      }
      res.status(200).json({
        succes: true,
        user: doc
      })
    })
  })
}

function login (req, res) {
  const token = req.cookies.auth
  User.findOne({ token }, (error, user) => {
    if (error) {
      console.log(error.stack)
    } else {
      User.findOne({ email: req.body.email }, function (error, user) {
        if (error) {
          console.log(error.stack)
        }
        if (!user) {
          return res.json({ isAuth: false, message: ' Auth failed ,email not found' })
        }

        user.comparepassword(req.body.password, (error, isMatch) => {
          if (error) {
            console.log(error.stack)
          }
          if (!isMatch) {
            return res.json({ isAuth: false, message: "password doesn't match" })
          }

          user.generateToken((error, user) => {
            if (error) {
              console.log(error.stack)
            }
            res.cookie('auth', user.token).json({
              isAuth: true,
              id: user._id,
              email: user.email,
              token: user.token
            })
          })
        })
      })
    }
  })
}

function profile (req, res) {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstname + req.user.lastname

  })
}

function listusers (req, res) {
  User.find({}, function (error, result) {
    if (error) {
      return res.status(400).send(error)
    } else {
      res.json(result)
    }
  })
}

function removeuser (req, res) {
  User.findOneAndDelete({ email: req.body.email }, function (error, user) {
    if (error) {
      return res.status(400).send(error)
    }
    if (!user) {
      res.json({ user: 'user not found' })
    } else {
      res.json(user)
    }
  })
}

function updateuser (req, res) {
  const newuser = req.body

  if (newuser.password !== newuser.password2) {
    return res.status(400).json({ message: 'password not match' })
  } else {
    bcrypt.hash(newuser.password, 10, (error, hash) => {
      if (error) {
        console.log(error)
      } else {
        newuser.password = hash
        newuser.password2 = hash
        User.findOneAndUpdate({ email: req.user.email }, { $set: newuser }, function (error, user) {
          if (error) {
            console.log(error.stack)
          }
          res.status(200).json({ newuser })
        })
      }
    })
  }
}

function logout (req, res) {
  const token = req.cookies.auth
  User.findOne({ token }, (error, user) => {
    if (error) {
      return res.status(400).send(error)
    }
    user.deleteToken(token, (error, user) => {
      if (error) {
        return res.status(400).send(error)
      }
      res.status(200).json({ message: 'logout' })
    })
  })
}

function indexof (req, res) {
  res.status(200).send('it\'s run ;D ready for fun!')
}

export default { register, login, logout, profile, listusers, removeuser, updateuser, indexof }
