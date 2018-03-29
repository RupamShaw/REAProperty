import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class REProperties extends Component {
    render() {
        const results = this.props.results
        const saved = this.props.saved
        console.log("results",results )
        console.log("saved",saved )
        return(
        <div>Hello from REA</div>
        )
    }
}
REProperties.propTypes = {
    results: PropTypes.array,
    saved:PropTypes.array
  }