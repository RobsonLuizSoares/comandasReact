const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
  res.send({message: "Tudo certo com o GET do users"})
})

router.post('/', (req, res) => {
  res.send({message: "Tudo certo com o POST do users"})
})

module.exports = router