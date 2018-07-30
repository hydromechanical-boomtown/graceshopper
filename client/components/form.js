import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import StripeCheckout from 'react-stripe-checkout'

class Form extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
            required
            id="required"
            label="Required"
            defaultValue="First Name"
            margin="normal"
            onChange={this.handleChange}
            name="fname"
          />
          <TextField
            required
            id="required"
            label="Required"
            defaultValue="Last Name"
            margin="normal"
            onChange={this.handleChange}
            name="lname"
          />
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
          token={this.onToken}
          stripeKey="pk_test_cBSjAsw49UTK7TvSOl2zpeYu"
          amount={this.props.total * 100}
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

  return {
    puppies: puppiesInCart,
    cart: state.cart,
    total,
    user: state.user
  }
}

export const ConnectedForm = connect(mapStateToProps)(Form)
