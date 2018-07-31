import axios from 'axios'
import {sellPuppy} from './puppy'

const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const CLEAR = 'CLEAR'
const RECEIVED_CART = 'RECEIVED_CART'

//add item to the cart on the redux store
export const addItem = id => ({
  type: ADD_ITEM,
  id
})

export const clear = () => ({
  type: CLEAR
})

//remove item from the cart on the redux store
export const removeItem = id => ({
  type: REMOVE_ITEM,
  id
})

const receivedCart = cart => ({
  type: RECEIVED_CART,
  cart
})

//fetching the cart for a logged in user from the db
export const fetchCart = () => async dispatch => {
  const res = await axios.get('/api/carts')
  const cart = res.data

  dispatch(receivedCart(cart))
}

//the above should delete a cart if one currently exists (i.e. the person checking out is a user who already has a cart saved to the database)
export const clearCart = () => async dispatch => {
  const res = await axios.get('/api/carts')
  console.log('clearCart res cart GET', res.data)
  if (res.data) {
    await axios.delete('api/carts')
  }
  //clears state
  dispatch(clear())
  console.log('dispatch clear called')
}

export const createGuest = guestInfo => async dispatch => {
  const res = await axios.post(`/api/guests`, guestInfo)
  return res.data
}

export const handleGuestCheckout = (guestId, cart, token) => dispatch => {
  console.log('toek in handeleGUestCheckout is', token)
  cart.forEach(async puppyId => {
    await dispatch(sellPuppy(puppyId, guestId, false, token))
  })
  dispatch(clear())

  //1. create a guest in the database
  //2. add the guestId to the puppies the guest is checking out
  //3. clear the cart on store
}

const initialState = []
const cartReducer = function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.id]

    case REMOVE_ITEM:
      return state.filter(item => item !== action.id)

    case RECEIVED_CART:
      return [...state, ...action.cart.puppies]

    case CLEAR:
      return initialState

    default:
      return state
  }
}

export default cartReducer
