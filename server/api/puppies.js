const router = require('express').Router()
const {Puppy} = require('../db/models') //make sure that when Puppy model is created, that it is exported in the right place
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const puppies = await Puppy.findAll()
    res.json(puppies)
  } catch (err) {
    next(err)
  }
})

router.get('/:puppyId', async (req, res, next) => {
  try {
    const puppy = await Puppy.findById(req.params.puppyId)
    res.json(puppy)
  } catch (err) {
    next(err)
  }
})

