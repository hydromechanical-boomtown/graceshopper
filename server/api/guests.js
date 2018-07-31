const router = require('express').Router()
const {Guest} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const newGuest = await Guest.create(req.body)
    res.status(201).json(newGuest)
  } catch (err) {
    next(err)
  }
})
