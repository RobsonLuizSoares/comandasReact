const express = require('express')
const router = express.Router()
const User = require('../models/users')

router.get('/', (req, res) => {
  res.send({message: "Tudo certo com o GET Admin"})
})

router.get('/users', (req, res) => {
  User.find({}, (err, data) => {
    if(err) return res.send({ error: 'Erro na consulta de usuários' })
    return res.send(data)
  })
})

router.post('/create', (req, res) => {
  const { user, username, password, roles } = req.body

  if (!user || !username || !password || !roles) {
    return res.send({ error: 'Dados Insuficientes!' })
  }
  User.findOne({username}, (err, data) => {
    if(err) {
      res.send({error: 'Erro ao buscar usuário'})
    }
    if(data) {
      res.send({ error: 'Usuário já registrado'})
    }

    User.create(req.body, (err, data) => {
      if(err) {
        res.send({error: 'Erro ao criar usuário'})
      }

      data.password = undefined

      return res.send(data)
    })
  })

  
})
module.exports = router