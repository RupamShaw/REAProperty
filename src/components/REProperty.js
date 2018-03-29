import React from 'react'
import PropTypes from 'prop-types'

const REProperty = (props) => {
    var cardProperty = props.cardProperty 

    return (
        <div>
            REA Property Card Added
        </div>
    )
}

REProperty.propTypes = {
    addREProperty: PropTypes.func,
    removeProperty: PropTypes.func,
    cardProperty: PropTypes.shape({
            "price": PropTypes.string.isRequired,
            "agency":  PropTypes.shape({
                "brandingColors": {
                    "primary": PropTypes.string.isRequired
                }.isRequired,
            "logo": PropTypes.string.isRequired}),
            "id": PropTypes.string.isRequired,
            "mainImage":PropTypes.string.isRequired
        
          }).isRequired,
      
};

export default REProperty
