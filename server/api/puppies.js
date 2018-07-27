const router = require('express').Router()
const {Puppy, User} = require('../db/models') //make sure that when Puppy model is created, that it is exported in the right place
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

router.put('/', async (req, res, next) => {
  try {
    const puppy = await Puppy.findById(req.body.puppyId)
    const user = await User.findById(req.body.userId)

    if (puppy && user) {
      if (puppy.userId || puppy.guestUserId) {
        res.status(412).send()
      } else {
        await user.addPuppy(puppy)
        res.status(200).send()
      }
    }
  } catch (err) {
    next(err)
  }
})