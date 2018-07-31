import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSinglePuppy} from '../store/puppy'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
const style = {
  progress: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '10%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
}

class SinglePuppy extends Component {
  componentDidMount() {
    this.props.fetchSinglePuppy()
  }
  render() {
    const props = this.props
    return !props.puppy ? (
      <CircularProgress size={100} style={style.progress} />
    ) : (
      <Card className="child">
        <CardMedia
          style={style.media}
          image={props.puppy.imageURL}
          title={props.puppy.name}
          className="imageSize"
        />
        <CardContent align="left">
          <Typography variant="display2">{props.puppy.name}</Typography>
          <Typography variant="caption">{props.puppy.description}</Typography>
          <Typography component="p">
            Age: {props.puppy.age}
            <br />
            Breed: {props.puppy.breed}
            <br />
            Price: ${props.puppy.price}
            <br />
            Gender: {props.puppy.gender}
          </Typography>
        </CardContent>
        <Divider />
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
    puppy: foundPuppy
  }
}
const mapDispatch = (dispatch, ownProps) => ({
  fetchSinglePuppy: () =>
    dispatch(fetchSinglePuppy(Number(ownProps.match.params.puppyId)))
})
const connectedSinglePuppy = connect(mapState, mapDispatch)(SinglePuppy)
export default connectedSinglePuppy
