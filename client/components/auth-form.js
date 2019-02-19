import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {
  Button,
  Card,
  TextField,
  Typography,
  IconButton,
  Link,
  Icon
} from '@material-ui/core/'
import {Google, GithubCircle, TwitterCircle} from 'mdi-material-ui'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  cardContainer: {
    width: '40%',
    margin: 'auto',
    marginTop: theme.spacing.unit * 10
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
  },
  textInput: {
    margin: 'auto',
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  loginBtn: {
    height: '2.5em'
  }
})

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, classes} = props

  return (
    <Card className={classes.cardContainer}>
      <form className={classes.form} onSubmit={handleSubmit} name={name}>
        <TextField
          className={classes.textInput}
          id="email"
          type="email"
          label="Email"
          name="email"
          variant="outlined"
          margin="dense"
          error={error}
        />
        <TextField
          className={classes.textInput}
          id="password"
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          margin="dense"
          error={error}
        />
        {error && error.response && (
          <Typography> {error.response.data} </Typography>
        )}
        <div className={classes.buttonsContainer}>
          <div>
            <Typography>{displayName} With</Typography>
            <IconButton to="/auth/google" component={Google} />
            {/* <IconButton component={GithubCircle} />
            <IconButton component={TwitterCircle} /> */}
          </div>
          <Button
            className={classes.loginBtn}
            variant="contained"
            size="small"
            color="primary"
            type="submit"
          >
            {displayName}
          </Button>
        </div>
      </form>
    </Card>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = withStyles(styles)(
  connect(
    mapLogin,
    mapDispatch
  )(AuthForm)
)
export const Signup = withStyles(styles)(
  connect(
    mapSignup,
    mapDispatch
  )(AuthForm)
)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
