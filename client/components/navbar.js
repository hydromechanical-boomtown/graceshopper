import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'
import {logout} from '../store'
import {withStyles} from '@material-ui/core/styles'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import {Logout} from 'mdi-material-ui'
import {ShoppingCart, AccountCircle} from '@material-ui/icons'

const styles = theme => ({
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  icon: {
    marginLeft: theme.spacing.unit
  }
})

const Navbar = ({handleClick, isLoggedIn, email, classes}) => (
  <AppBar position="static">
    <Toolbar className={classes.toolbar}>
      <div>
        <Button
          className={classes.button}
          component={RouterLink}
          to="/home"
          color="inherit"
        >
          {' '}
          <Typography
            variant="title"
            color="inherit"
            style={{fontWeight: 'bolder', fontStlye: 'italic'}}
          >
            Puppers
          </Typography>
        </Button>
        {!isLoggedIn && (
          <div>
            <Button
              className={classes.button}
              component={RouterLink}
              to="/login"
              color="inherit"
            >
              Login
            </Button>
            <Button
              className={classes.button}
              component={RouterLink}
              to="/signup"
              color="inherit"
            >
              Sign Up
            </Button>
          </div>
        )}
        {isLoggedIn && (
          <div>
            <Typography variant="subtitle2" inline color="inherit">
              <AccountCircle /> {email}
            </Typography>
            <Button
              className={classes.button}
              component={RouterLink}
              to="/logout"
              color="inherit"
              onClick={handleClick}
            >
              Log Out
              <Logout />
            </Button>
          </div>
        )}
      </div>
      <div>
        <Button
          className={classes.button}
          component={RouterLink}
          to="/puppies"
          color="inherit"
        >
          Puppies
        </Button>
        <Button
          className={classes.button}
          component={RouterLink}
          to="/cart"
          color="inherit"
        >
          Cart <ShoppingCart className={classes.icon} />
        </Button>
      </div>
    </Toolbar>
  </AppBar>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(Navbar)
)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
