const router = require('express').Router()
const {STRIPE_SECRET_KEY} = require('../../secrets')

const stripe = require('stripe')(
  process.env.STRIPE_SECRET_KEY || STRIPE_SECRET_KEY
)

router.post('/', async (req, res) => {
  try {
    let {status} = await stripe.charges.create({
      amount: req.body.amount * 100,
      currency: 'usd',
      source: req.body.token.id
    })
    res.json({status})
  } catch (error) {
    res.status(500).end()
  }
})

module.exports = router
