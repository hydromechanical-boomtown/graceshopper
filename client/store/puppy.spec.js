/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {
  fetchPuppies,
  fetchSinglePuppy,
  receivedPuppies,
  gotPuppy,
  sellPuppyAction
} from './puppy'
import reducer from './puppy'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('action creators', () => {
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

  it('receivedPuppies returns proper object', () => {
    expect(receivedPuppies([{name: 'puppy'}])).to.be.deep.equal({
      type: 'RECEIVED_PUPPIES',
      puppyList: [{name: 'puppy'}]
    })
  })

  it('gotPuppy returns proper object', () => {
    expect(gotPuppy({name: 'puppy'})).to.be.deep.equal({
      type: 'GET_PUPPY',
      puppy: {name: 'puppy'}
    })
  })

  it('sellPuppyAction returns proper object', () => {
    expect(sellPuppyAction(5)).to.be.deep.equal({
      type: 'UPDATE_PUPPY',
      puppyId: 5
    })
  })
})

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

describe('puppy reducer', () => {
  it('should return initial state', async () => {
    expect(reducer(undefined, {})).to.deep.equal([])
  })

  it('received puppies updates state', () => {
    expect(
      reducer([], receivedPuppies([{name: 'puppy1'}, {name: 'puppy2'}]))
    ).to.deep.equal([{name: 'puppy1'}, {name: 'puppy2'}])
  })

  it('sellPuppyAction should remove puppy from state', () => {
    expect(
      reducer(
        [{id: 1, name: 'puppy1'}, {id: 2, name: 'puppy2'}],
        sellPuppyAction(1)
      )
    ).to.deep.equal([{id: 2, name: 'puppy2'}])
  })
})
