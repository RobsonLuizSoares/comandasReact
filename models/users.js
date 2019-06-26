const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: { 
    type: String,
    required: true,
    select: false
  },
  roles: {
    type: [String],
    enumValues: ['user','admin']
}
})
UserSchema.pre('save', function(next){
  const user = this
  
  if(!user.isModified('password')){
      return next()
  }
  
  bcrypt.genSalt((err, salt) => { 
     bcrypt.hash(user.password, salt, (err, hash) => {
         user.password = hash
         next()
         })
      })
  })
  
  UserSchema.methods.checkPassword = function(password){
      return new Promise((resolve, reject) => {
          bcrypt.compare(password, this.password, (err, isMatch) => {
              if(err) {
                  reject(err)
              }else{
                  resolve(isMatch)
                  }
          })
      })    
  }
  
  const User = mongoose.model('User', UserSchema)
  
  module.exports = User

