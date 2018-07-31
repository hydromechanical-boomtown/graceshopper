const Sequelize = require('sequelize')
const db = require('../db')

const Guest = db.define('guest', {
  email: {
    type: Sequelize.STRING,
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
