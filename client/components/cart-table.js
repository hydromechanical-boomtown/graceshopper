import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import store from '../store'
import {removeItem, fetchCart, updateCart} from '../store/cart'
import {fetchPuppies} from '../store/puppy'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

class CartComponent extends Component {
  constructor(props) {
    super(props)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.state = {loaded: false}
  }

  componentDidMount() {
    this.props.fetchPuppies()

    if (this.props.user.id) this.props.fetchCart()

    this.setState({
      loaded: true
    })
  }

  removeFromCart(id) {
    this.props.user.id
      ? this.props.updateCart([...this.props.cart].filter(el => el !== id))
      : store.dispatch(removeItem(id))
  }
  render() {
    return this.state.loaded ? (
      !this.props.cart.length ? (
        <h2> Your cart is empty! </h2>
      ) : (
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Puppy in Cart</TableCell>
                  <TableCell>Remove</TableCell>
                  <TableCell>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.puppies.map(puppy => {
                  return (
                    <TableRow key={puppy.id}>
                      <TableCell component="th" scope="row">
                        {puppy.name}
                      </TableCell>
                      <TableCell>
                        {' '}
                        <IconButton
                          aria-label="Delete"
                          onClick={() => {
                            this.removeFromCart(puppy.id)
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>{' '}
                      </TableCell>
                      <TableCell numeric>{puppy.price}</TableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <TableCell numeric>Total: {this.props.total}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>
          <Link to="/cart/checkout">
            <Button variant="contained" color="primary" type="submit">
              Proceed to checkout
            </Button>
          </Link>
        </div>
      )
    ) : (
      <h2>Loading....</h2>
    )
  }
}

const mapStateToProps = state => {
  const puppiesInCart = state.cart
    .map(id => {
      return state.puppies.find(puppy => {
        return puppy.id === id
      })
    })
    .filter(el => el !== undefined)

  let total = 0
  puppiesInCart.forEach(elem => {
    total += elem.price
  })

  return {
    puppies: puppiesInCart,
    cart: state.cart,
    total,
    user: state.user
  }
}
const mapDispatchToProps = dispatch => ({
  fetchPuppies: () => dispatch(fetchPuppies()),
  fetchCart: () => dispatch(fetchCart()),
  updateCart: cart => dispatch(updateCart(cart))
})

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartComponent)
