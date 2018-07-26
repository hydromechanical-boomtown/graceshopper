import axios from 'axios'

const RECEIVED_PUPPIES = 'RECEIVED_PUPPIES'
const SELECT_PUPPY = 'SELECT_PUPPY'

export const receivedPuppies = puppyList => ({
  type: RECEIVED_PUPPIES,
  puppyList
})

const selectPuppy = puppy => ({
  type: SELECT_PUPPY,
  puppy
})

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
const initalState = []

const puppyReducer = function(state = initalState, action) {
  console.log(action)
  switch (action.type) {
    case RECEIVED_PUPPIES:
      return action.puppyList

    case SELECT_PUPPY:
      const selectedPuppy = state.find(puppy => puppy.id === action.puppy.id)
      if (selectedPuppy) {
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

    default:
      return state
  }
}

export default puppyReducer
