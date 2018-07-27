import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const dummyPuppies = [
  {id: 1, name: 'Dog', price: 300},
  {id: 2, name: 'Harold', price: 300},
  {id: 3, name: 'David', price: 300}
]
//assuming that the current user (who has a user.cart) is accessible on the store, also assuming that all the puppies are also accessible on the store, but only the ones that arent sold
//what I want to do is get the user from state, access its cart and get all of the IDs for what is currently in the cart --> then I want to loop through the current state which is holding all the available dogs and return the objects for the dogs that are available in cart
// Then I want to store these dogs on the components state
export class Cart extends Component {
  constructor() {
    super()
    this.state = {
      puppies: dummyPuppies
    }

    //usually won't have a state, but its here so we can use dummy data --> usually will retrieve from props
  }
  render() {
    return (
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
            {this.state.puppies.map(puppy => {
              return (
                <TableRow key={puppy.id}>
                  <TableCell component="th" scope="row">
                    {puppy.name}
                  </TableCell>
                  <TableCell> Remove button goes here </TableCell>
                  <TableCell numeric>{puppy.price}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

function mapStateToProps(state) {
  return {
    puppies: state.user.cart.map(id => {
      return state.puppies.filter(puppy => {
        return puppy.id === id
      })
    }),
    cart: this.state.user.cart || this.state.cart
    //I did the above because I just realised that guests also need to be able to checkout so I guess we should have an action that if someone adds a puppy to cart then it puts to the user if they are a user, otherwise it changes cart on state --> and when a new user is created then maybe what happens is that it checks if the cart exists, and if so it creates a user with the cart that is already on the sessions state
  }
}

export default connect(mapStateToProps)(Cart)
