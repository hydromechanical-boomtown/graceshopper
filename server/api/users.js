const router = require('express').Router()
const {User, Puppy} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id, {include: [{model: Puppy}]})
    const updatedUser = await user.update(req.body)
    res.status(202).send(updatedUser)
  } catch (err) {
    next(err)
  }
})
