/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')

const User = db.model('user')
const Puppy = db.model('puppy')
const Guest = db.model('guest')

describe('Puppies routes', () => {

  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/puppies/', () => {
    let cody
    let puppyThePup
    let puppup
    let guestCody

    beforeEach(async () => {
      cody = await User.create({
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
        price: 9000,
        age: 1,
        breed: 'Shiba',
        description: 'such description, so word, wow',
        gender: 'Female',
        imageURL:
          'http://static.ddmcdn.com/en-us/apl/breedselector/images/breed-selector/dogs/breeds/shiba-inu_01_lg.jpg',
        sold: false
      })
      guestCody = await Guest.create({
        email: 'guestCody@email.com',
        firstName: 'guestCody',
        lastName: 'Pug',
        address: '1 finite loop, Mobius'
      })

    })

    it('GET /api/puppies', async () => {
      const res = await request(app)
        .get('/api/puppies')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(puppyThePup.name)
    })
    it('GET specific puppy from /api/puppies/:id', async () => {
      const res = await request(app)
        .get('/api/puppies/' + puppyThePup.id)
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(puppyThePup.name)
    })
    it('PUT /api/puppies/ updates puppy with userId', async () => {
      const res = await request(app)
        .put('/api/puppies/')
        .send({
          puppyId: puppyThePup.id,
          userId: cody.id,
          isUser: true
        })
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.id).to.be.equal(puppyThePup.id)
      expect(res.body.name).to.be.equal(puppyThePup.name)
      expect(res.body.userId).to.be.equal(cody.id)
      expect(res.body.guestId).to.be.equal(null)
    })
    it('PUT /api/puppies/ updates puppy with guestId', async () => {
      const res = await request(app)
        .put('/api/puppies/')
        .send({
          puppyId: puppup.id,
          userId: guestCody.id,
          isUser: false
        })
        .expect(200)
      expect(res.body).to.be.an('object')
      expect(res.body.id).to.be.equal(puppup.id)
      expect(res.body.name).to.be.equal(puppup.name)
      expect(res.body.guestId).to.be.equal(guestCody.id)
      expect(res.body.userId).to.be.equal(null)
    })
  })
})

