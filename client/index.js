import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {StripeProvider} from 'react-stripe-elements'
import {STRIPE_PUB_KEY} from '../secrets'

// establishes socket connection
import './socket'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <StripeProvider apiKey={process.env.STRIPE_PUB_KEY || STRIPE_PUB_KEY}>
        <App />
      </StripeProvider>
    </Router>
  </Provider>,
  document.getElementById('app')
)
