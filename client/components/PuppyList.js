import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPuppies} from '../store/puppy'
import SinglePuppyListItem from './singlePuppyListItem'

class PuppyList extends Component {
  componentDidMount() {
    console.log('mounted')
    this.props.fetchPuppies()
  }

  render() {
    return (
      <div>
        <h1>For Sale</h1>
        <ul>
          {this.props.puppies.map(puppy => {
            return (
              <li key={puppy.id}>
                <SinglePuppyListItem puppy={puppy} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapState = state => ({
  puppies: state.puppies
})

const mapDispatch = dispatch => ({
  fetchPuppies: () => dispatch(fetchPuppies())
})

const ConnectedPuppyList = connect(mapState, mapDispatch)(PuppyList)
export default ConnectedPuppyList
