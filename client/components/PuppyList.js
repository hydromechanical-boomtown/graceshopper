import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPuppies} from '../store/puppy'
import SinglePuppyListItem from './singlePuppyListItem'

class PuppyList extends Component {
  componentDidMount() {
    this.props.fetchPuppies()
  }

  render() {
    return (
      <div>
        <ul className="container" style={{alignContent: 'center'}}>
          {this.props.puppies.map(puppy => {
            return (
              <li key={puppy.id} className="child">
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
