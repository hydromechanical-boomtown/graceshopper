import React from 'react'
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

export const SinglePuppyListItem = props => {
  return (
    <Card>
      <img src={props.puppy.imageURL} />
      {/* <CardMedia image="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Puppy_on_Halong_Bay.jpg/281px-Puppy_on_Halong_Bay.jpg" /> */}
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          {props.puppy.name}
        </Typography>
        <Typography component="p">Breed: {props.puppy.breed}</Typography>
        <Typography component="p">Age: {props.puppy.age}</Typography>
      </CardContent>
      <CardActions>
        <IconButton color="primary" aria-label="Add to shopping cart">
          <AddShoppingCartIcon />
        </IconButton>
        <Link to={`/puppies/${props.puppy.id}`}>
          <Button size="small" color="primary">
            See More
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
