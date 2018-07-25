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
    <div>
      <Card>
        <CardMedia image={props.imageURL} />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {props.name}
          </Typography>
          <Typography component="p">{props.description}</Typography>
        </CardContent>
        <CardActions>
          <IconButton color="primary" aria-label="Add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>
          <Link to={`/puppies/{props.id}`}>
            <Button size="small" color="primary">
              See More
            </Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  )
}
