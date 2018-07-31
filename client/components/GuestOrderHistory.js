import React, {Component} from 'react'
import {connect} from 'react-redux'
import OrderHistory from './OrderHistory'
import {clear} from '../store/cart'

class GuestOrderHistory extends Component {
  componentDidMount() {
    console.log('GuestOrderHistory mounted', this.props.puppies)
  }
  componentWillUnmount() {
    this.props.clear()
  }
  shouldComponentUpdate() {
    return false
  }

  render() {
    console.log('GuestOrderHistory rendered')
    const {puppies} = this.props
    console.log('puppies', puppies)
    return puppies.map(puppy => <OrderHistory key={puppy.id} puppy={puppy} />)
  }
}

const mapState = state => {
  const guestPuppies = state.cart
    .map(puppyId => state.puppies.find(puppy => puppy.id === puppyId))
    .filter(el => el !== undefined)
  return {
    puppies: guestPuppies
  }
}
const mapDispatch = dispatch => ({
  clear: () => dispatch(clear())
})

export default connect(mapState, mapDispatch)(GuestOrderHistory)
