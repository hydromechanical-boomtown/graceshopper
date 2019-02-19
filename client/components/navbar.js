import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link as RouterLink} from 'react-router-dom'
import {logout} from '../store'
import {withStyles} from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  IconButton
} from '@material-ui/core'
import {Logout, CartOutline} from 'mdi-material-ui'
import {ShoppingCart, AccountCircle} from '@material-ui/icons'
import Cart from './cart-table'

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
    marginLeft: theme.spacing.unit,
    color: 'inherit'
  }
})

class Navbar extends Component {
  state = {
    isOpen: false
  }

  toggleDrawer = () => {
    console.log(this.state.isOpen)
    this.setState(prevState => ({isOpen: !prevState.isOpen}))
  }
  render() {
    const {handleClick, isLoggedIn, email, classes, cart} = this.props

    return (
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
            {cart.length < 1 ? (
              <IconButton
                className={classes.icon}
                component={CartOutline}
                onClick={this.toggleDrawer}
              />
            ) : (
              <IconButton
                className={classes.icon}
                component={ShoppingCart}
                onClick={this.toggleDrawer}
              />
            )}
            <Drawer
              open={this.state.isOpen}
              anchor="right"
              onClose={this.toggleDrawer}
            >
              <Cart toggleDrawer={this.toggleDrawer} />
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email,
    cart: state.cart
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
