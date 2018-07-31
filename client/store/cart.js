import axios from 'axios'
import {sellPuppy} from './puppy'

const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const GET_CART = 'GET_CART'
const CLEAR = 'CLEAR'

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

const getCart = cart => ({
  type: GET_CART,
  cart
})

//fetching the cart for a logged in user from the db
export const fetchCart = () => async dispatch => {
  const res = await axios.get('/api/carts')
  const cart = res.data
  dispatch(getCart(cart.puppies))
}
//creating a new guest in the databse and then removing all items from cart
export const clearCart = () => async dispatch => {
  const res = await axios.get('/api/carts')
  console.log('clearCart res cart GET', res.data)
  if (res.data) {
    await axios.delete('api/carts')
  }
  //the above should delete a cart if one currently exists (i.e. the person checking out is a user who already has a cart saved to the database)
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
  clearCart()

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

    case GET_CART:
      return action.cart

    case CLEAR:
      return initialState

    default:
      return state
  }
}

export default cartReducer
