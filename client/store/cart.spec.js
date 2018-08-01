/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {addItem, removeItem, clear} from './cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'
import reducer from './cart'

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

  it('clear returns proper object', () => {
    expect(clear()).to.be.deep.equal({
      type: 'CLEAR'
    })
  })
})

describe('cart reducer', () => {
  it('should return initial state', async () => {
    expect(reducer(undefined, {})).to.deep.equal([])
  })

  it('Add item should add id to state', () => {
    expect(reducer([], addItem(1))).to.deep.equal([1])
  })

  it('Remove item should remove id from state', () => {
    expect(reducer([1, 2, 3], removeItem(1))).to.deep.equal([2, 3])
  })

  it('clear should remove all ids from state', () => {
    expect(reducer([2, 3, 1, 4, 5], clear())).to.deep.equal([])
  })
})
