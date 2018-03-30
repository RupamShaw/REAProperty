import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import REProperty from './REProperty'
import '../styles/REProperties.css'
import { addData } from '../actions'

const AdminContact = () =>{
    return(
        <div id="resultzero" >Contact Admin</div>
    )
}

export  class REProperties extends Component {

    addREProperty = (cardProp) => {
        this.props.addData(cardProp)
    }

    render() {
        const results = this.props.results
        const saved = this.props.saved
        let resultsLength = results.length
        if (resultsLength > 0) {
            return(
                <div className="propertyStyles">
                    {results.length > 0 &&
                        <div id="results" className="propertyTypes" >Results
                            <div className="propertyListStyles">
                                {results.map((resultObject) => { 
                                    return (
                                        <REProperty 
                                            key={resultObject.id} 
                                            cardProperty={resultObject}
                                            addREProperty={this.addREProperty} 
                                        />
                                    )
                                })}
                            </div>
                        </div>
                    }
                     {saved.length > 0 &&
                        <div id="saved" className="propertyTypes" >Saved
                            <div className="propertyListStyles">
                                    {saved.map((savedObject) => {
                                        resultsLength = resultsLength + 1
                                        return (
                                            <REProperty 
                                                key={resultsLength}
                                                cardProperty={savedObject}
                                            />
                                        )
                                    })}
                            </div>
                        </div>
                    }
                </div>    
            )
        } else {
          //  console.log("initial state not set properly")
            return (<AdminContact/>)
        }
    }
}
const mapStateToProps = state => {
    return {
        results: state.results,
        saved: state.saved
    }
}

REProperties.propTypes = {
    results: PropTypes.array.isRequired,
    saved:PropTypes.array
}

export default connect(
    mapStateToProps,
    { addData }
)(REProperties)

