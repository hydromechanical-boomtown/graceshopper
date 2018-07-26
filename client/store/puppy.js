import axios from 'axios'

const RECEIVED_PUPPIES = 'RECEIVED_PUPPIES'
const SELECT_PUPPY = 'SELECT_PUPPY'
const SELL_PUPPY = 'UPDATE_PUPPY'
const DELETE_PUPPY = 'DELETE_PUPPY'

const receivedPuppies = puppyList => ({
  type: RECEIVED_PUPPIES,
  puppyList
})

const selectPuppy = puppy => ({
  type: SELECT_PUPPY,
  puppy
})

const sellPuppyAction = puppyId => ({
  type: SELL_PUPPY,
  puppyId
})

export const sellPuppy = (puppyId, ownerId) => async dispatch => {
  const response = await axios.put('api/puppies', {puppyId, ownerId})
  const soldPuppy = response.data
  dispatch(sellPuppyAction(soldPuppy.id))
}

export const fetchPuppies = () => async dispatch => {
  const response = await axios.get('api/puppies')
  const puppyList = response.data
  dispatch(receivedPuppies(puppyList))
}
export const fetchSinglePuppy = id => async dispatch => {
  const res = await axios.get(`/api/puppies/${id}`)
  const puppy = res.data
  dispatch(selectPuppy(puppy))
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
    case SELECT_PUPPY:
      return state.filter(puppy => {
        return puppy.id === action.puppy.id
      })
    case SELL_PUPPY:
      return state.filter(puppy => {
        return puppy.id !== action.puppyId
      })
    default:
      return state
  }
}

export default puppyReducer
