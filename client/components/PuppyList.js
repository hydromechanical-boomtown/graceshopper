import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchPuppies, receivedPuppies} from '../store/puppy'
import {SinglePuppyListItem} from './singlePuppyListItem'

class PuppyList extends Component {
  componentDidMount() {
    console.log('mounted')
    this.props.loadPuppies()
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

const dummyData = [
  {
    id: 1,
    name: 'puppy1',
    age: 1,
    breed: 'dog',
    imageURL:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Puppy_on_Halong_Bay.jpg/281px-Puppy_on_Halong_Bay.jpg'
  },
  {
    id: 2,
    name: 'puppy2',
    age: 0,
    breed: 'cute dog',
    imageURL: '#'
  },
  {
    id: 3,
    name: 'puppy3',
    age: 8,
    breed: 'old dog',
    imageURL: '#'
  },
  {
    id: 4,
    name: 'puppy4',
    age: 2,
    breed: 'dog',
    imageURL: '#'
  }
]

const mapState = state => ({
  puppies: state.puppies
})

const mapDispatch = dispatch => ({
  loadPuppies: () => dispatch(receivedPuppies(dummyData))
})

const ConnectedPuppyList = connect(mapState, mapDispatch)(PuppyList)
export default ConnectedPuppyList
