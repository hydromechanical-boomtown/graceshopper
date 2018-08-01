import axios from 'axios'

const RECEIVED_PUPPIES = 'RECEIVED_PUPPIES'
const GET_PUPPY = 'GET_PUPPY'
const SELL_PUPPY = 'UPDATE_PUPPY'
const DELETE_PUPPY = 'DELETE_PUPPY'

export const receivedPuppies = puppyList => ({
  type: RECEIVED_PUPPIES,
  puppyList
})

export const gotPuppy = puppy => ({
  type: GET_PUPPY,
  puppy
})

export const sellPuppyAction = puppyId => ({
  type: SELL_PUPPY,
  puppyId
})

export const sellPuppy = (puppyId, userId, isUser, token) => async dispatch => {
  const response = await axios.put('/api/puppies', {
    puppyId,
    userId,
    isUser,
    token
  })
  const soldPuppy = response.data
  dispatch(sellPuppyAction(soldPuppy.id))
}

export const fetchPuppies = () => async dispatch => {
  const response = await axios.get('/api/puppies')
  const puppyList = response.data
  dispatch(receivedPuppies(puppyList))
}
export const fetchSinglePuppy = id => async dispatch => {
  const res = await axios.get(`/api/puppies/${id}`)
  const puppy = res.data
  dispatch(gotPuppy(puppy))
}
const initialState = []

const puppyReducer = function(state = initialState, action) {
  switch (action.type) {
    case RECEIVED_PUPPIES:
      return action.puppyList
    case DELETE_PUPPY:
      return state.filter(puppy => {
        return puppy.id !== action.puppyId
      })
    case GET_PUPPY:
      const foundPuppy = state.find(puppy => {
        return puppy.id === action.puppy.id
      })
      if (foundPuppy) {
        return state.map(puppy => {
          if (puppy.id === action.puppy.id) {
            return action.puppy
          } else {
            return puppy
          }
        })
      } else {
        return [...state, action.puppy]
      }
    case SELL_PUPPY:
      return state.filter(puppy => {
        return puppy.id !== action.puppyId
      })
    default:
      return state
  }
}

export default puppyReducer
