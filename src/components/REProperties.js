import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class REProperties extends Component {
    render() {
        const results = this.props.results
        const saved = this.props.saved
       // console.log("results",results )
       // console.log("saved",saved )
        return(
        <div>Welcome to REA World  via React</div>
        )
    }
}
REProperties.propTypes = {
    results: PropTypes.array,
    saved:PropTypes.array
  }