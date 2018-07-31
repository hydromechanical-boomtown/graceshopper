//not sure if I even need this file, after thought it probably doesn't need to be located on state
import axios from 'axios'

const NEW_GUEST = 'NEW_GUEST'

const newGuest = guest => ({
  type: NEW_GUEST,
  guest
})

export const createGuest = guest => async dispatch => {
  const res = await axios.post(`/api/guests`, guest)
  const createdGuest = res.data
  dispatch(newGuest(createdGuest))
}

const initialState = []

const guestReducer = function(state = initialState, action) {
  switch (action.type) {
    case NEW_GUEST:
      return action.guest
    default:
      return state
  }
}

export default guestReducer
