import React, {Component} from 'react'
import PuppyList from './PuppyList'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {Typography, Card} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  card: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    backgroundColor: '#f9f9f9'
  },
  welcome: {
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit
  }
})

export class UserHome extends Component {
  componentDidMount() {
    this.props.me()
  }
  render() {
    const {email, adoptedPuppies, classes} = this.props
    // return (
    //   <React.Fragment>
    //     <div>
    //       <h1 style={{backgroundColor: 'white', width: 500}}>
    //         Welcome, {email}
    //       </h1>
    //     </div>
    //     {puppies &&
    //       (!puppies.length ? (
    //         <Typography variant="display2">
    //           You don't own any puppies.
    //         </Typography>
    //       ) : (
    //         <React.Fragment>
    //           <Typography variant="display2">
    //             These are the puppies you love.
    //           </Typography>
    //           {puppies.map(puppy => (
    //             <OrderHistory key={puppy.id} puppy={puppy} />
    //           ))}
    //         </React.Fragment>
    //       ))}
    //   </React.Fragment>
    // )
    return (
      <Card className={classes.card}>
        <Typography className={classes.welcome} gutterBottom variant="h4">
          Welcome back, {email}
        </Typography>
        {!adoptedPuppies.length ? (
          <Typography align="center" variant="h5">
            You don't own any puppies.
          </Typography>
        ) : (
          <React.Fragment>
            <Typography gutterBottom align="center" variant="h5">
              These are the puppies you love.
            </Typography>
            <PuppyList puppies={adoptedPuppies} />
          </React.Fragment>
        )}
      </Card>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    adoptedPuppies: state.user.puppies
  }
}
const mapDispatch = dispatch => ({
  me: () => dispatch(me())
})

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(UserHome)
)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
