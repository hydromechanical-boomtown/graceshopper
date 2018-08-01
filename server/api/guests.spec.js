const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')

describe('Guest Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  it('POST routes creates a new guest and returns it', async () => {
    const res = await request(app)
      .post('/api/guests/')
      .send({
        email: 'test@email.com',
        firstName: 'Tester',
        lastName: 'Tester',
        address: '123 test Street'
      })
      .expect(201)
    expect(res.body).to.be.an('object')
    expect(res.body.email).to.be.equal('test@email.com')
    expect(res.body.firstName).to.be.equal('Tester')
    expect(res.body.lastName).to.be.equal('Tester')
    expect(res.body.address).to.be.equal('123 test Street')
  })
})
