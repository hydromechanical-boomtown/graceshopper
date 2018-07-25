import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class PuppyList extends Component {
  componentDidMount() {
    //fetch puppies in here
  }

  render() {
    return (
      <div>
        <h1>For Sale</h1>
        {/* <ul>
          {props.allPuppies.map(puppy => {
            return (
              <li key={puppy.id}>
                <singlePuppyListItem puppy={puppy} />
              </li>
            )
          })}
        </ul> */}
      </div>
    )
  }
}
