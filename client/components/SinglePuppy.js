import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSinglePuppy} from '../store/puppy'
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  IconButton,
  CircularProgress
} from '@material-ui/core'
import {AddShoppingCart, RemoveShoppingCart} from '@material-ui/icons'
import store from '../store'
import {addItem, removeItem, updateCart} from '../store/cart'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  progress: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%'
  },
  media: {
    height: 350,
    objectFit: 'cover'
  },
  card: {
    width: '90%',
    margin: 'auto'
  },
  item: {
    width: '100%'
  }
})

class SinglePuppy extends Component {
  constructor() {
    super()
    this.state = {
      isDisabled: false
    }
  }

  async componentDidMount() {
    await this.props.fetchSinglePuppy()
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
    return !puppy ? (
      <CircularProgress size={50} />
    ) : (
      <Grid
        container
        component={Card}
        direction="column"
        className={classes.card}
      >
        <Grid item md={10} container direction="row" alignItems="center">
          <Grid
            item
            md={6}
            component={CardMedia}
            image={puppy.imageURL}
            title={puppy.name}
            className={classes.media}
          />
          <Grid item md={6} component={CardContent}>
            <Typography variant="headline">{puppy.name}</Typography>
            <Typography gutterBottom variant="subheading">
              {puppy.description}
            </Typography>
            <Divider />
            <Typography>Age: {puppy.age}</Typography>
            <Typography>Breed: {puppy.breed}</Typography>
            <Typography>Price: {puppy.price}</Typography>
            <Typography>Gender: {puppy.gender}</Typography>
          </Grid>
        </Grid>
        <Grid item md={2} component={CardActions}>
          {!this.state.isDisabled ? (
            <IconButton
              component={AddShoppingCart}
              color="primary"
              aria-label="Add to shopping cart"
              onClick={() => {
                this.addToCart(puppy.id)
              }}
            />
          ) : (
            <IconButton
              component={RemoveShoppingCart}
              aria-label="Delete"
              color="primary"
              onClick={() => {
                this.removeFromCart(puppy.id)
              }}
            />
          )}
        </Grid>
      </Grid>
    )
  }
}

const mapState = (state, ownProps) => {
  const foundPuppy = state.puppies.find(puppy => {
    return puppy.id === Number(ownProps.match.params.puppyId)
  })
  return {
    puppy: foundPuppy,
    cart: state.cart,
    user: state.user
  }
}
const mapDispatch = (dispatch, ownProps) => ({
  fetchSinglePuppy: () =>
    dispatch(fetchSinglePuppy(Number(ownProps.match.params.puppyId))),
  updateCart: cart => dispatch(updateCart(cart))
})
export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(SinglePuppy)
)
