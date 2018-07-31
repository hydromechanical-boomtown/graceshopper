import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
<<<<<<< HEAD
import StripeCheckout from 'react-stripe-checkout'
=======
import {sellPuppy} from '../store/puppy'
import {updateUserDatabase, me} from '../store/user'
import {clearCart, handleGuestCheckout, createGuest} from '../store/cart'

import axios from 'axios'
>>>>>>> master

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
<<<<<<< HEAD
  handleSubmit(event) {
    event.preventDefault()
=======

  async handleSubmit(event) {
    event.preventDefault()
    if (this.props.user.email) {
      this.props.cart.forEach(puppyId => {
        this.props.sellPuppy(puppyId, this.props.user.id, true)
      })
      this.props.updateUserDatabase(this.state)
      this.props.clearCart()
    } else {
      const createdGuest = await this.props.createGuest(this.state)
      await this.props.handleGuestCheckout(createdGuest.id, this.props.cart)
    }
>>>>>>> master
  }

  render() {
    return (
<<<<<<< HEAD
      <div>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            required
            id="required"
            label="Required"
            defaultValue="First Name"
            margin="normal"
            onChange={this.handleChange}
            name="fname"
          />
=======
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
>>>>>>> master
          <TextField
            required
            id="required"
            label="Required"
<<<<<<< HEAD
            defaultValue="Last Name"
=======
            placeholder="Email"
>>>>>>> master
            margin="normal"
            onChange={this.handleChange}
            name="lname"
          />
<<<<<<< HEAD
          {this.props.user && (
            <TextField
              required
              id="required"
              label="Required"
              defaultValue="Email"
              margin="normal"
              onChange={this.handleChange}
              name="email"
            />
          )}
          <TextField
            required
            id="required"
            label="Required"
            defaultValue="Address"
            margin="normal"
            onChange={this.handleChange}
            name="address"
          />
        </form>

        <StripeCheckout
          stripeKey="pk_test_cBSjAsw49UTK7TvSOl2zpeYu"
          amount={this.props.total * 100}
=======
        )}
        <TextField
          required
          id="required"
          label="Required"
          placeholder="Address"
          margin="normal"
          onChange={this.handleChange}
          name="address"
>>>>>>> master
        />
      </div>
    )
  }
}
const mapStateToProps = state => {
  const puppiesInCart = state.cart.map(id => {
    return state.puppies.filter(puppy => {
      console.log(puppy)
      return puppy.id === id
    })
  })

  let total = 0
  console.log('PUPPIES IN CART ARE', puppiesInCart)
  puppiesInCart.forEach(elem => {
    console.log('ELEM.PRICE is', elem[0].price)
    total += elem[0].price
  })
  console.log('TOTAL IS:', total)

<<<<<<< HEAD
  return {
    puppies: puppiesInCart,
    cart: state.cart,
    total,
    user: state.user
  }
}

export const ConnectedForm = connect(mapStateToProps)(Form)
=======
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
>>>>>>> master
