import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import {Card, TextField} from '@material-ui/core'
import StripeCheckout from 'react-stripe-checkout'
import {sellPuppy} from '../store/puppy'
import {updateUserDatabase, me} from '../store/user'
import {clearCart, handleGuestCheckout, createGuest, clear} from '../store/cart'
import store from '../store'
import history from '../history'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    width: '70%',
    margin: 'auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  textInput: {
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
})

class Form extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      id: null
    }
  }

  componentDidMount() {
    const {user} = this.props
    this.setState({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id
    })
  }
  onToken = async token => {
    if (this.props.user.email) {
      this.props.cart.forEach(async puppyId => {
        await this.props.sellPuppy(puppyId, this.props.user.id, true, token.id)
      })
      await this.props.updateUserDatabase({
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: `${this.state.street} ${this.state.city}, ${
          this.state.state
        } ${this.state.zip}`
      })
      await this.props.clearCart()
      history.push('/home')
    } else {
      const createdGuest = await this.props.createGuest(this.state)
      await this.props.handleGuestCheckout(
        createdGuest.id,
        this.props.cart,
        token.id
      )
      // store.dispatch(clear())
      history.push('/cart/checkout/guest')
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
    const {classes} = this.props
    return (
      <Card className={classes.card}>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <TextField
            required
            className={classes.textInput}
            label="First Name"
            placeholder="First Name"
            margin="dense"
            value={this.state.firstName}
            onChange={this.handleChange}
            name="firstName"
          />
          <TextField
            required
            className={classes.textInput}
            label="Last Name"
            placeholder="Last Name"
            margin="dense"
            value={this.state.lastName}
            onChange={this.handleChange}
            name="lastName"
          />

          <TextField
            required
            className={classes.textInput}
            label="Email"
            placeholder="Email"
            margin="dense"
            value={this.state.email}
            onChange={this.handleChange}
            name="email"
          />

          <TextField
            required
            className={classes.textInput}
            label="Street Address"
            placeholder="Street Address"
            margin="dense"
            value={this.state.street}
            onChange={this.handleChange}
            name="street"
          />

          <TextField
            required
            className={classes.textInput}
            label="City"
            placeholder="City"
            margin="dense"
            value={this.state.city}
            onChange={this.handleChange}
            name="city"
          />

          <TextField
            required
            className={classes.textInput}
            label="State"
            placeholder="State"
            margin="dense"
            value={this.state.state}
            onChange={this.handleChange}
            name="state"
          />

          <TextField
            required
            className={classes.textInput}
            label="Zip Code"
            placeholder="Zip Code"
            margin="dense"
            value={this.state.zip}
            onChange={this.handleChange}
            name="zip"
          />

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
        </form>
      </Card>
    )
  }
}

const mapState = state => {
  let total = 0
  let puppiesInCart = []
  if (state.cart.length) {
    puppiesInCart = state.cart
      .map(id => {
        const filteredPuppy = state.puppies.find(puppy => {
          return puppy.id === id
        })
        return filteredPuppy
      })
      .filter(el => el !== undefined)

    if (puppiesInCart.length) {
      puppiesInCart.forEach(elem => {
        total += elem.price
      })
    }
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

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(Form)
)
