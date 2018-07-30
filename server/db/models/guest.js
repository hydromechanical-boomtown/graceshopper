const Sequelize = require('sequelize')
const db = require('../db')

const Guest = db.define('guest', {
  // persist the guest's cart locally, or using req.session
  // what if a guest decides to create an account, what do you do with the cart?
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  }
})

module.exports = Guest
