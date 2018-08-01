import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {addItem, removeItem, updateCart} from '../store/cart'
import store from '../store'
import DeleteIcon from '@material-ui/icons/Delete'

class SinglePuppyListItemUnconnected extends Component {
  constructor() {
    super()
    this.state = {
      isDisabled: false
    }
    this.removeFromCart = this.removeFromCart.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount() {
    if (this.props.cart.indexOf(this.props.puppy.id) !== -1) {
      this.setState({isDisabled: true})
    }
  }
  removeFromCart(id) {
    this.props.user.id
      ? this.props.updateCart([...this.props.cart].filter(el => el !== id))
      : store.dispatch(removeItem(id))
    this.setState({
      isDisabled: false
    })
  }
  addToCart(id) {
    this.props.user.id
      ? this.props.updateCart([...this.props.cart, id])
      : store.dispatch(addItem(id))
    this.setState({
      isDisabled: true
    })
  }

  render() {
    return (
      <Card>
        <img src={this.props.puppy.imageURL} className="imageSize" />
        {/* <CardMedia image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Puppy_on_Halong_Bay.jpg/281px-Puppy_on_Halong_Bay.jpg" /> */}
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {this.props.puppy.name}
          </Typography>
          <Typography component="p">Breed: {this.props.puppy.breed}</Typography>
          <Typography component="p">Age: {this.props.puppy.age}</Typography>
          <Typography component="p">Price: {this.props.puppy.price}</Typography>
        </CardContent>
        <CardActions>
          {!this.state.isDisabled ? (
            <IconButton
              color="primary"
              aria-label="Add to shopping cart"
              onClick={() => {
                this.addToCart(this.props.puppy.id)
              }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          ) : (
            <IconButton
              aria-label="Delete"
              color="primary"
              onClick={() => {
                this.removeFromCart(this.props.puppy.id)
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
          <Link to={`/puppies/${this.props.puppy.id}`}>
            <Button size="small" color="primary">
              See More
            </Button>
          </Link>
        </CardActions>
      </Card>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})
const mapDispatch = dispatch => ({
  updateCart: cart => dispatch(updateCart(cart))
})

const SinglePuppyListItem = connect(mapState, mapDispatch)(
  SinglePuppyListItemUnconnected
)
export default SinglePuppyListItem
