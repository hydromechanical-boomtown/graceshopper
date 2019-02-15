import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPuppies} from '../store/puppy'
import SinglePuppyListItem from './singlePuppyListItem'
import {CircularProgress, Grid} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

const styles = theme => ({
  progress: {
    margin: 'auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  },
  container: {
    marginLeft: theme.spacing.unit * 2.5,
    marginRight: theme.spacing.unit * 2.5,
    paddingTop: theme.spacing.unit
  },
  item: {
    marginBottom: theme.spacing.unit
  }
})

class PuppyList extends Component {
  componentDidMount() {
    this.props.fetchPuppies()
  }

  render() {
    const {puppies, classes} = this.props
    return puppies.length < 1 ? (
      <div className={classes.progess}>
        <CircularProgress />
      </div>
    ) : (
      <Grid container direction="row" className={classes.container}>
        {this.props.puppies.map(puppy => {
          return (
            <Grid
              item
              key={puppy.id}
              md={4}
              sm={6}
              xs={12}
              className={classes.item}
            >
              <SinglePuppyListItem puppy={puppy} />
            </Grid>
          )
        })}
      </Grid>
    )
  }
}

const mapState = state => ({
  puppies: state.puppies
})

const mapDispatch = dispatch => ({
  fetchPuppies: () => dispatch(fetchPuppies())
})

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(PuppyList)
)
