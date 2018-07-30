import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField'
import StripeCheckout from 'react-stripe-checkout';

class Form extends Component {

  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  // ...

  render() {
   return (
    
      // <StripeCheckout
      //   token={this.onToken}
      //   stripeKey="pk_test_cBSjAsw49UTK7TvSOl2zpeYu"
      // />
    
    <div>
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
          /> )}
         <TextField
          required
          id="required"
          label="Required"
          defaultValue="Address"
          margin="normal"
          onChange={this.handleChange}
          name="address"
        />
 </form>
 
  <StripeCheckout
  token={this.onToken}
  stripeKey="pk_test_cBSjAsw49UTK7TvSOl2zpeYu"
  amount = {this.props.total}
/>
</div>

   )
   
  }
  
}

const mapState = state => ({
  user: state.user
})

export const ConnectedForm = connect(mapState)(Form)
