import React, {Component} from 'react'
import PuppyList from './PuppyList'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/user'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import OrderHistory from './OrderHistory'

export class UserHome extends Component {
  componentDidMount() {
    this.props.me()
  }
  render() {
    const {email, puppies} = this.props
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
      <React.Fragment>
        <div>
          <h1 style={{backgroundColor: 'white', width: 500}}>
            Welcome, {email}
          </h1>
        </div>
        {puppies &&
          (!puppies.length ? (
            <Typography variant="display2">
              You don't own any puppies.
            </Typography>
          ) : (
            <React.Fragment>
              <Typography variant="display2">
                These are the puppies you love.
              </Typography>
              <PuppyList puppies={puppies} />
            </React.Fragment>
          ))}
      </React.Fragment>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    puppies: state.user.puppies
  }
}
const mapDispatch = dispatch => ({
  me: () => dispatch(me())
})

export default connect(
  mapState,
  mapDispatch
)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
