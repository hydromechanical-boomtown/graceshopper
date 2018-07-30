/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchPuppies, fetchSinglePuppy} from './puppy'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {puppy: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  // describe('me', () => {
  //   it('eventually dispatches the GET USER action', async () => {
  //     const fakeUser = {email: 'Cody'}
  //     mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
  //     await store.dispatch(me())
  //     const actions = store.getActions()
  //     expect(actions[0].type).to.be.equal('GET_USER')
  //     expect(actions[0].user).to.be.deep.equal(fakeUser)
  //   })
  // })

  describe('puppy', () => {
    it('eventually dispatches the RECIEVED_PUPPIES action', async () => {
      const puppyList = ['puppy1', 'puppy2', 'puppy3']
      mockAxios.onGet('api/puppies').replyOnce(200, puppyList)
      await store.dispatch(fetchPuppies())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('RECEIVED_PUPPIES')
      // expect(history.location.pathname).to.be.equal('/login')
    })

    it('eventually dispatches the SELECT_PUPPY action', async () => {
      const puppy = {name: 'Test Puppy'}
      mockAxios.onGet('api/puppies/1').replyOnce(200, puppy)
      await store.dispatch(fetchSinglePuppy(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PUPPY')
      // expect(history.location.pathname).to.be.equal('/login')
    })
  })
})
