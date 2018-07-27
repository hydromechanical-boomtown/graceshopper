/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {addItem, removeItem} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('cart action creators', () => {
  let store
  let mockAxios

  const initialState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  it('addItem returns proper object', () => {
    expect(addItem(2)).to.be.deep.equal({
      type: 'ADD_ITEM',
      id: 2
    })
  })

  it('removeItem returns proper object', () => {
    expect(removeItem(2)).to.be.deep.equal({
      type: 'REMOVE_ITEM',
      id: 2
    })
  })
})
