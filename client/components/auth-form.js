import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button, Card, TextField, Typography} from '@material-ui/core/'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  cardContainer: {
    width: '40%',
    margin: 'auto'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  textInput: {
    margin: 'auto'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit
  }
})

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, classes} = props

  return (
    // <div className="container">
    //   <form
    //     onSubmit={handleSubmit}
    //     name={name}
    //     style={{backgroundColor: 'white', marginTop: 10}}
    //   >
    //     <div>
    //       <label htmlFor="email">
    //         <small>Email</small>
    //       </label>
    //       <input name="email" type="text" />
    //     </div>
    //     <div>
    //       <label htmlFor="password">
    //         <small>Password</small>
    //       </label>
    //       <input name="password" type="password" />
    //     </div>
    //     <div>
    //       <Button variant="contained" color="primary" type="submit">
    //         {displayName}
    //       </Button>
    //     </div>
    //     {error && error.response && <div> {error.response.data} </div>}
    //   </form>
    //   {/* <a
    //     href="/auth/google"
    //     style={{backgroundColor: 'white', marginTop: 10}}
    //     className="form"
    //   >
    //     {displayName} with Google
    //   </a> */}
    // </div>
    <Card className={classes.cardContainer}>
      <form className={classes.form} onSubmit={handleSubmit} name={name}>
        <TextField
          className={classes.textInput}
          id="email"
          label="Email"
          name="email"
          variant="outlined"
          margin="normal"
          error={error}
        />
        <TextField
          className={classes.textInput}
          id="password"
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          error={error}
        />
        {error && error.response && (
          <Typography> {error.response.data} </Typography>
        )}
        <div>
          <Button
            className={classes.button}
            variant="contained"
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
