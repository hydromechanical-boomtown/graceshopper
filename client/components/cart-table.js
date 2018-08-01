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
    this.state = {loaded: false}
  }

  componentDidMount() {
    this.props.fetchPuppies()
    this.props.fetchCart()
    this.setState({
      loaded: true
    })
  }

  removeFromCart(id) {
    store.dispatch(removeItem(id))
  }
  render() {
    console.log(this.props)
    return this.state.loaded ? (
      !this.props.cart.length ? (
        <h2 style={{background: 'white', width: 300}}> Your cart is empty! </h2>
      ) : (
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
            <Button
              style={{marginTop: 10}}
              variant="contained"
              color="primary"
              type="submit"
            >
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
  console.log(state.cart, typeof state.cart)
  const puppiesInCart = state.cart
    .map(id => {
      return state.puppies.find(puppy => {
        return puppy.id === id
      })
    })
    .filter(el => el !== undefined)
  console.log('puppiesInCart', puppiesInCart)

  let total = 0
  puppiesInCart.forEach(elem => {
    console.log(elem.price, typeof elem.price)
    total += elem.price
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
