import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableFooter,
  TableRow,
  Paper,
  IconButton,
  Button,
  Typography
} from '@material-ui/core'
import {Delete, Close} from '@material-ui/icons'
import store from '../store'
import {removeItem, fetchCart, updateCart} from '../store/cart'
import {fetchPuppies} from '../store/puppy'
import {Link} from 'react-router-dom'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  table: {
    // minHeight: 250
  },
  rows: {
    height: 80
  },
  cells: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 1.5
  }
})

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
    const {cart, classes, toggleDrawer} = this.props
    return this.state.loaded ? (
      <div>
        <Paper>
          <IconButton component={Close} onClick={toggleDrawer} />
          <Table className={classes.table}>
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
                  <TableRow className={classes.rows} key={puppy.id}>
                    <TableCell className={classes.cells} scope="row">
                      {puppy.name}
                    </TableCell>
                    <TableCell>
                      {' '}
                      <IconButton
                        component={Delete}
                        aria-label="Delete"
                        onClick={() => {
                          this.removeFromCart(puppy.id)
                        }}
                      />{' '}
                    </TableCell>
                    <TableCell align="left">${puppy.price}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell align="left">
                  <Typography>Total: ${this.props.total}</Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>

        <Button
          onClick={() => toggleDrawer()}
          component={Link}
          to="/cart/checkout"
          variant="contained"
          color="primary"
          type="submit"
          disabled={cart.length < 1}
        >
          Proceed to checkout
        </Button>
      </div>
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CartComponent)
)
