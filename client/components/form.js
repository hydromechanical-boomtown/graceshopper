import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import {sellPuppy} from '../store/puppy'
import {updateUserDatabase, me} from '../store/user'
import {clearCart, handleGuestCheckout, createGuest} from '../store/cart'

import axios from 'axios'

class Form extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      email: this.props.user.email || '',
      firstName: '',
      lastName: '',
      address: '',
      id: null
    }
  }

  async componentDidMount() {
    const res = await this.props.me()
    const user = res.user
    this.setState({
      email: user.email,
      id: user.id
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    if (this.props.user.email) {
      this.props.cart.forEach(puppyId => {
        this.props.sellPuppy(this.props.user.id, puppyId, true)
      })
      this.props.updateUserDatabase(this.state)
      this.props.clearCart()
    } else {
      const createdGuest = await this.props.createGuest(this.state)
      await this.props.handleGuestCheckout(createdGuest.id, this.props.cart)
    }
  }

  render() {
    return (
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <TextField
          required
          id="required"
          label="Required"
          placeholder="First Name"
          margin="normal"
          onChange={this.handleChange}
          name="firstName"
        />
        <TextField
          required
          id="required"
          label="Required"
          placeholder="Last Name"
          margin="normal"
          onChange={this.handleChange}
          name="lastName"
        />
        {!this.props.user.email && (
          <TextField
            required
            id="required"
            label="Required"
            placeholder="Email"
            margin="normal"
            onChange={this.handleChange}
            name="email"
          />
        )}
        <TextField
          required
          id="required"
          label="Required"
          placeholder="Address"
          margin="normal"
          onChange={this.handleChange}
          name="address"
        />
        <Button variant="contained" color="primary" type="submit">
          Checkout
        </Button>
      </form>
    )
  }
}

const mapDispatch = dispatch => ({
  sellPuppy: (puppyId, ownerId, isUser) =>
    dispatch(sellPuppy(puppyId, ownerId, isUser)),
  updateUserDatabase: info => dispatch(updateUserDatabase(info)),
  clearCart: () => dispatch(clearCart()),
  me: () => dispatch(me()),
  handleGuestCheckout: (guestId, cart) =>
    dispatch(handleGuestCheckout(guestId, cart)),
  createGuest: guestInfo => dispatch(createGuest(guestInfo))
})
const mapState = state => ({
  user: state.user,
  cart: state.cart
})

export const ConnectedForm = connect(mapState, mapDispatch)(Form)
