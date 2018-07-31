import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import StripeCheckout from 'react-stripe-checkout'
import {sellPuppy} from '../store/puppy'
import {updateUserDatabase, me} from '../store/user'
import {clearCart, handleGuestCheckout, createGuest, clear} from '../store/cart'
import axios from 'axios'
import store from '../store'
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
  onToken = async token => {
    console.log(token)
    if (this.props.user.email) {
      this.props.cart.forEach(async puppyId => {
        await this.props.sellPuppy(puppyId, this.props.user.id, true, token.id)
      })
      await this.props.updateUserDatabase(this.state)
      await this.props.clearCart()
    } else {
      const createdGuest = await this.props.createGuest(this.state)
      console.log('token were sending is', token.id)
      await this.props.handleGuestCheckout(
        createdGuest.id,
        this.props.cart,
        token.id
      )
      store.dispatch(clear())
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <TextField
            required={true}
            id="required"
            label="Required"
            placeholder="First Name"
            margin="normal"
            onChange={this.handleChange}
            name="firstName"
          />
          <TextField
            required={true}
            id="required"
            label="Required"
            placeholder="Last Name"
            margin="normal"
            onChange={this.handleChange}
            name="lastName"
          />
          {!this.props.user.email && (
            <TextField
              required={true}
              id="required"
              label="Required"
              placeholder="Email"
              margin="normal"
              onChange={this.handleChange}
              name="email"
            />
          )}
          <TextField
            required={true}
            id="required"
            label="Required"
            placeholder="Address"
            margin="normal"
            onChange={this.handleChange}
            name="address"
          />

          <div>
            <StripeCheckout
              stripeKey="pk_test_cBSjAsw49UTK7TvSOl2zpeYu"
              token={this.onToken}
              email={this.state.email}
              address_line1={this.state.address}
              amount={this.props.total * 100}
            >
              <Button variant="contained" color="primary" type="submit">
                Complete checkout
              </Button>
            </StripeCheckout>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  let total = 0
  let puppiesInCart = []
  if (state.cart[0]) {
    puppiesInCart = state.cart.map(id => {
      console.log('ID TO FIND IS', id)
      console.log('CART IS', state.cart)
      const filteredPuppy = state.puppies.filter(puppy => {
        console.log('PUPPY ID IS', puppy.id)
        console.log('CART UPPY ID IS,', id)
        return puppy.id === id
      })
      console.log(filteredPuppy)
      return filteredPuppy
    })

    console.log('PUPPIES IN CART ARE', puppiesInCart)
    puppiesInCart &&
      puppiesInCart.forEach(elem => {
        console.log('ELEM.PRICE is', elem[0].price)
        total += elem[0].price
      })
    console.log('TOTAL IS:', total)
  }

  return {
    puppies: puppiesInCart,
    cart: state.cart,
    total,
    user: state.user
  }
}
const mapDispatch = dispatch => ({
  sellPuppy: (puppyId, ownerId, isUser, token) =>
    dispatch(sellPuppy(puppyId, ownerId, isUser, token)),
  updateUserDatabase: info => dispatch(updateUserDatabase(info)),
  clearCart: () => dispatch(clearCart()),
  me: () => dispatch(me()),
  handleGuestCheckout: (guestId, cart, token) =>
    dispatch(handleGuestCheckout(guestId, cart, token)),
  createGuest: guestInfo => dispatch(createGuest(guestInfo))
})

export const ConnectedForm = connect(mapState, mapDispatch)(Form)
