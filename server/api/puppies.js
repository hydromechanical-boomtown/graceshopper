const router = require('express').Router()
const {Puppy, User, Guest} = require('../db/models') //make sure that when Puppy model is created, that it is exported in the right place
module.exports = router
// these routes are already mounted on /api/puppies
router.get('/', async (req, res, next) => {
  try {
    const puppies = await Puppy.findAll({
      where: {
        userId: null,
        guestId: null
      }
    })
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
    if (req.body.isUser) {
      const puppy = await Puppy.findById(req.body.puppyId)
      const user = await User.findById(req.body.userId)

      if (puppy && user) {
        if (puppy.userId || puppy.guestId) {
          res.status(412).send()
        } else {
          await puppy.setUser(user)
          const updatedPuppy = await puppy.update({soldToken: req.body.token})
          res.status(200).json(updatedPuppy)
        }
      }
    } else {
      const puppy = await Puppy.findById(req.body.puppyId)
      const guest = await Guest.findById(req.body.userId)
      if (puppy && guest) {
        if (puppy.userId || puppy.guestId) {
          res.status(412).send()
        } else {
          await puppy.setGuest(guest)
          const updatedPuppy = await puppy.update({soldToken: req.body.token})
          res.status(200).json(updatedPuppy)
        }
      }
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newPuppy = await Puppy.create(req.body)
    res.status(201).json(newPuppy)
  } catch (err) {
    next(err)
  }
})

router.delete('/:puppyId', async (req, res, next) => {
  try {
    const puppy = await Puppy.findById(req.params.puppyId)
    await puppy.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.get('/mypuppies', async (req, res, next) => {
  try {
    const myPuppies = await Puppy.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.json(myPuppies)
  } catch (err) {
    next(err)
  }
})
