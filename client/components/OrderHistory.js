import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

//style
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

const OrderHistory = props => {
  return (
    <Card>
      <CardMedia
        style={style.media}
        image={props.puppy.imageURL}
        title={props.puppy.name}
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
    </Card>
  )
}

export default OrderHistory
