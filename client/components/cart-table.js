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
    this.props.fetchCart()
  }

  removeFromCart(id) {
    console.log('clicked!!')
    store.dispatch(removeItem(id))
  }
  render() {
    console.log(this.props)
    return (
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
                console.log('PUPPY IS ', puppy)
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
          <Button variant="contained" color="primary" type="submit">
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
    total
  }
}
const mapDispatchToProps = dispatch => ({
  fetchPuppies: () => dispatch(fetchPuppies()),
  fetchCart: () => dispatch(fetchCart())
})

export const Cart = connect(mapStateToProps, mapDispatchToProps)(CartComponent)
