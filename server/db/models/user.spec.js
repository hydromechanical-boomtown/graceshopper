/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')
const Puppy = db.model('puppy')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
  describe('associationMethods', () => {
    let brody
    let puppyThePup
    let puppup
    beforeEach(async () => {
      brody = await User.create({
        email: 'cody@puppybook.com',
        password: 'bones'
      })
      puppyThePup = await Puppy.create({
        name: 'puppyThePup',
        price: 2000,
        age: 6,
        breed: 'Labrador',
        description: 'Soft fur, even softer cuddles',
        gender: 'Male',
        imageURL:
          'http://cdn2-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg',
        sold: false
      })
      puppup = await Puppy.create({
        name: 'puppup',
        price: 2000,
        age: 6,
        breed: 'Labrador',
        description: 'Soft fur, even softer cuddles',
        gender: 'Male',
        imageURL:
          'http://cdn2-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg',
        sold: false
      })
    })

    it('User can add puppy', async () => {
      await brody.addPuppy(puppyThePup)
      const puppies = await brody.getPuppies()
      expect(puppies).to.be.an('array')
      expect(puppies.length).to.equal(1)
      expect(puppies[0].name).to.equal('puppyThePup')
    })
    it('User can remove puppy', async () => {
      await brody.addPuppy(puppyThePup)
      await brody.addPuppy(puppup)
      const puppies = await brody.getPuppies()
      expect(puppies).to.be.an('array')
      expect(puppies.length).to.equal(2)
      await brody.removePuppy(puppyThePup)
      const puppies2 = await brody.getPuppies()
      expect(puppies2.length).to.equal(1)
      expect(puppies2[0].name).to.equal('puppup')
    })
  })
}) // end describe('User model')
