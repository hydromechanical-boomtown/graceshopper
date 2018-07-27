import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSinglePuppy} from '../store/puppy'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

class SinglePuppy extends Component {
  componentDidMount() {
    this.props.fetchSinglePuppy()
  }
  render() {
    const props = this.props
    return (
      <Card>
        <img src={props.puppy.imageURL} />
        <CardContent>
          <Typography variant="headline" component="h2">
            {props.puppy.name}
          </Typography>
          <Typography component="p">Breed: {props.puppy.breed}</Typography>
          <Typography component="p">Age: {props.puppy.age}</Typography>
        </CardContent>
        <CardActions>
          <IconButton color="primary" aria-label="Add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>
        </CardActions>
      </Card>
    )
  }
}

const mapState = (state, ownProps) => {
  const foundPuppy = state.puppies.find(puppy => {
    return puppy.id === Number(ownProps.match.params.puppyId)
  })
  return {
    puppy: foundPuppy || {}
  }
}
const mapDispatch = (dispatch, ownProps) => ({
  fetchSinglePuppy: () =>
    dispatch(fetchSinglePuppy(Number(ownProps.match.params.puppyId)))
})
const connectedSinglePuppy = connect(mapState, mapDispatch)(SinglePuppy)
export default connectedSinglePuppy
