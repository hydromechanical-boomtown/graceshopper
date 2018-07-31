const router = require('express').Router()
const {Cart} = require('../db/models')

//gets the cart for user on the session
//creates cart if no cart exists
router.get('/', async (req, res, next) => {
  try {
    if (req.user.id) {
      const user = req.user.id
      let cart = await Cart.find({
        where: {userId: user}
      })
      if (cart) {
        res.status(200).json(cart)
      } else {
        cart = await Cart.create()
        cart.setUser(user)
        res.status(201).json(cart)
      }
    }

    //removed the above because we can create a cart when somebody logs out
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const user = req.session.passport.user
    const cart = await Cart.findAll({where: {userId: user}})
    await cart.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const user = req.session.passport.user
    const cart = await Cart.findAll({where: {userId: user}})
    await cart.update(req.body)
    res.sendStatus(202)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const user = req.session.passport.user
    const cart = await Cart.create()
    cart.userId = user
    res.status(201).json(cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
