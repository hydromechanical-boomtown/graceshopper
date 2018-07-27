const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
    puppies: {  
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      defaultValue: []
    }


})
module.exports = Cart