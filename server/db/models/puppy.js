const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Puppy = db.define('puppy', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  age: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  breed: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  gender: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['Male', 'Female']],
      msg: 'Choose Gender'
    }
  },

  imageURL: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Puppy
