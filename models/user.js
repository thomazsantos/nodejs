import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const salt = 10

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  password2: {
    type: String,
    required: true,
    minlength: 8

  },
  token: {
    type: String
  }
})

userSchema.pre('save', function (next) {
  const user = this

  if (user.isModified('password')) {
    bcrypt.genSalt(salt, function (error, salt) {
      if (error) {
        return next(error)
      }

      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) {
          return next(error)
        }
        user.password = hash
        user.password2 = hash
        next()
      })
    })
  } else {
    next()
  }
})

userSchema.methods.comparepassword = function (passwordForCheck, cb) {
  bcrypt.compare(passwordForCheck, this.password, function (error, isMatch) {
    if (error) {
      return cb(error)
    }
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function (cb) {
  const user = this
  const token = jwt.sign(user._id.toHexString(), 'root')

  user.token = token
  user.save(function (err, user) {
    if (err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken = function (token, cb) {
  const user = this
  jwt.verify(token, 'root', (error, decode) => {
    if (error) {
      return cb(error)
    }
    user.findOne({ _id: decode, token: token }, function (error, user) {
      if (error) {
        return cb(error)
      }
      cb(null, user)
    })
  })
}

userSchema.methods.deleteToken = function (token, cb) {
  const user = this

  user.updateOne({ $unset: { token: 1 } }, function (error, user) {
    if (error) {
      return cb(error)
    }
    cb(null, user)
  })
}

export default mongoose.model('User', userSchema)
