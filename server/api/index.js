const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/puppies', require('./puppies'))
router.use('/carts', require('./carts'))
router.use('/guests', require('./guests'))
router.use('/checkout', require('./checkout'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
