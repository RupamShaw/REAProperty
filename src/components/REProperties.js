import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class REProperties extends Component {
    render() {
        const results = this.props.results
        const saved = this.props.saved
        let resultsLength = results.length
        if (resultsLength > 0) {
            return(
            <div>Welcome to REA World  via React</div>
            )
        } else {
            console.log("initial state not set properly")
            return (<div>contact admin</div>)
        }
    }
}
REProperties.propTypes = {
    results: PropTypes.array.isRequired,
    saved:PropTypes.array
  }