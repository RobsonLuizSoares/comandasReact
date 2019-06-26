const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./models/users')

const PORT = process.env.PORT || 3001

const url = 'mongodb+srv://robson:lya250916@comandasreact-oatun.mongodb.net/test?retryWrites=true&w=majority'

const options = { reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true }

mongoose.connect(url, options).then(() => { 
  createInitialUser() 
})

mongoose.set('useCreateIndex', true)

mongoose.connection.on('error', (err) => {
  console.log('erro na conexão do banco de dados ', err)
})
mongoose.connection.on('connected', () => {
  console.log('Aplicação conectada do banco de dados')
})
mongoose.connection.on('disconnected', () => {
  console.log('Aplicação desconectada do banco de dados')
} )

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// Routes
const indexRoute = require('./routes/index')
const usersRoute = require('./routes/users')
const adminRoute = require('./routes/admin')

app.use('/', indexRoute)
app.use('/users', usersRoute)
app.use('/admin', adminRoute)

//Mongo

const createInitialUser = async() => {
  const total = await User.countDocuments({ username: 'robly', username: 'lya', username: 'dafne'})
  if(total===0){
      const user = new User({
          user: 'Robson Luiz',
          username: 'robly',
          password: '1234',
          roles: ['user', 'admin']
      })
      await user.save() 

      const user2 = new User({
          user: 'Lya Petry',
          username: 'lya',
          password: '1234',
          roles: ['admin']
      })
      await user2.save()

      const user3 = new User({
          user: 'Dafne',
          username: 'dafne',
          password: '1234',
          roles: ['user']
      })
      await user3.save()   

      console.log('Usuário criado com sucesso')
  }else{
      console.log('Não foi necessário criar usuário')
  }
}


app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT)
})

module.exports = app

