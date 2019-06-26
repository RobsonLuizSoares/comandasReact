const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send({message: "Tudo certo com o GET da raiz"})
})

router.post('/', (req, res) => {
  res.send({message: "Tudo certo com o POST da raiz"})
})

module.exports = router