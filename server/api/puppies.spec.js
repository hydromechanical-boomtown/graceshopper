/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Puppy = db.model('puppy')

describe('Puppy routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/puppies/', () => {
    const cody = {
      name: 'cody',
      price: 2000,
      age: 6,
      breed: 'Labrador',
      description: 'Soft fur, even softer cuddles',
      gender: 'Male',
      imageURL:
        'http://cdn2-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg',
      sold: false
    }
    const brody = {
      name: 'brody',
      price: 2000,
      age: 6,
      breed: 'Labrador',
      description: 'Soft fur, even softer cuddles',
      gender: 'Male',
      imageURL:
        'http://cdn2-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg',
      sold: false
    }

    beforeEach(async () => {
      await Puppy.bulkCreate([cody, brody])
    })

    it('GET /api/puppies', async () => {
      const res = await request(app)
        .get('/api/puppies')
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(cody.name)
      expect(res.body[0].price).to.be.equal(cody.price)
      expect(res.body[0].age).to.be.equal(cody.age)
      expect(res.body[0].breed).to.be.equal(cody.breed)
      expect(res.body[1].name).to.be.equal(brody.name)
      expect(res.body[1].price).to.be.equal(brody.price)
      expect(res.body[1].age).to.be.equal(brody.age)
      expect(res.body[1].breed).to.be.equal(brody.breed)
    })
  }) // end describe('/api/puppies')
}) // end describe('Puppy routes')
