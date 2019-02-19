import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPuppies} from '../store'
import {CircularProgress} from '@material-ui/core'
import PuppyList from './PuppyList'

class Puppies extends Component {
  componentDidMount() {
    this.props.fetchPuppies()
  }
  render() {
    const {puppies} = this.props
    return puppies.length < 1 ? (
      <CircularProgress />
    ) : (
      <PuppyList puppies={puppies} />
    )
  }
}

const mapState = state => ({
  puppies: state.puppies
})

const mapDispatch = dispatch => ({
  fetchPuppies: () => dispatch(fetchPuppies())
})

export default connect(
  mapState,
  mapDispatch
)(Puppies)
