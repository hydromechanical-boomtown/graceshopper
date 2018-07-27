import axios from 'axios'

const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const GET_CART = 'GET_CART'

//add item to the cart on the redux store
export const addItem = id => ({
  type: ADD_ITEM,
  id
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
export const fetchCart = async dispatch => {
  const res = await axios.get('api/user/cart')
  const cart = res.data
  dispatch(getCart(cart))
}

const initialState = []
export const cartReducer = function(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.id]

    case REMOVE_ITEM:
      return state.filter(item => item !== action.id)

    case GET_CART:
      return action.cart

    default:
      return state
  }
}
