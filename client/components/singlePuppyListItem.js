import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {
  IconButton,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Button,
  Typography
} from '@material-ui/core'
import {AddShoppingCart, RemoveShoppingCart} from '@material-ui/icons'
import {connect} from 'react-redux'
import {addItem, removeItem, updateCart} from '../store/cart'
import store from '../store'
import {withStyles} from '@material-ui/core/styles'

const styles = {
  card: {
    maxWidth: 350
  },
  media: {
    height: 200
  }
}

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
    const {classes, puppy} = this.props
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={puppy.imageURL}
            title={puppy.name}
          />
          <Typography gutterBottom variant="headline" component="h2">
            {puppy.name}
          </Typography>
        </CardActionArea>
        <CardContent>
          <Typography component="p">Breed: {this.props.puppy.breed}</Typography>
          <Typography component="p">Age: {this.props.puppy.age}</Typography>
          <Typography component="p">Price: {this.props.puppy.price}</Typography>
        </CardContent>
        <CardActions>
          {!this.state.isDisabled ? (
            <IconButton
              component={AddShoppingCart}
              color="primary"
              aria-label="Add to shopping cart"
              onClick={() => {
                this.addToCart(this.props.puppy.id)
              }}
            />
          ) : (
            <IconButton
              component={RemoveShoppingCart}
              aria-label="Delete"
              color="primary"
              onClick={() => {
                this.removeFromCart(this.props.puppy.id)
              }}
            />
          )}
          <Button
            component={Link}
            to={`/puppies/${this.props.puppy.id}`}
            size="small"
            color="primary"
          >
            See More
          </Button>
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

const SinglePuppyListItem = withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(SinglePuppyListItemUnconnected)
)
export default SinglePuppyListItem
