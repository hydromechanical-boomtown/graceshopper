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
import {removeItem, fetchCart} from '../store/cart'
import {fetchPuppies} from '../store/puppy'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

const dummyPuppies = [
  {id: 1, name: 'Dog', price: 300},
  {id: 2, name: 'Harold', price: 300},
  {id: 3, name: 'David', price: 300}
]

class CartComponent extends Component {
  constructor(props) {
    super(props)
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  componentDidMount() {
    this.props.fetchPuppies()
    // this.props.fetchCart()
    //I have a feeling the above doesn't need to be here because cart is established on state, we only want to be fetching cart as a hook after a user logs in, we fetch the cart
  }

  removeFromCart(id) {
    store.dispatch(removeItem(id))
  }
  render() {
    return (
      <div>
        <Paper className="form" style={{marginTop: 10}}>
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
                  <TableRow key={puppy[0].id}>
                    <TableCell component="th" scope="row">
                      {puppy[0].name}
                    </TableCell>
                    <TableCell>
                      {' '}
                      <IconButton
                        aria-label="Delete"
                        onClick={() => {
                          this.removeFromCart(puppy[0].id)
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>{' '}
                    </TableCell>
                    <TableCell numeric>{puppy[0].price}</TableCell>
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{marginTop: 10}}
          >
            Proceed to checkout
          </Button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const puppiesInCart = state.cart.map(id => {
    return state.puppies.filter(puppy => {
      return puppy.id === id
    })
  })

  let total = 0
  puppiesInCart.forEach(elem => {
    total += elem[0].price
  })

  return {
    puppies: puppiesInCart,
    cart: state.cart,
    total
  }
}
const mapDispatchToProps = dispatch => ({
  fetchPuppies: () => dispatch(fetchPuppies()),
  fetchCart: () => dispatch(fetchCart())
})

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartComponent)
