import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'

class Form extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    this.preventDefault()
  }

  render() {
    return (
      <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
        <TextField
          required
          id="required"
          label="Required"
          defaultValue="First Name"
          margin="normal"
          onChange={this.handleChange}
          name="fname"
        />
        <TextField
          required
          id="required"
          label="Required"
          defaultValue="Last Name"
          margin="normal"
          onChange={this.handleChange}
          name="lname"
        />
        {this.props.user && (
          <TextField
            required
            id="required"
            label="Required"
            defaultValue="Email"
            margin="normal"
            onChange={this.handleChange}
            name="email"
          />
        )}
        <TextField
          required
          id="required"
          label="Required"
          defaultValue="Address"
          margin="normal"
          onChange={this.handleChange}
          name="address"
        />
        <Button variant="contained" color="primary" type="submit">
          Checkout
        </Button>
      </form>
    )
  }
}

const mapState = state => ({
  user: state.user
})

export const ConnectedForm = connect(mapState)(Form)
