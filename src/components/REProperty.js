import React from 'react'
import PropTypes from 'prop-types'
import '../styles/REProperty.css'

const REProperty = (props) => {
    var cardProperty = props.cardProperty 
    var addREProperty = props.addREProperty 
    
     //dynamic style for button 
     var Button = ''
     var selectedPropertyColor = ''
     var backgroundColor = ''
 
     if (addREProperty) {
         Button = 'Add Property'
         selectedPropertyColor = 'green'
         backgroundColor = 'lightgreen'
     }

     const ButtonAStyle = {
        color: selectedPropertyColor,
        border: 'solid 2px ' + selectedPropertyColor,
        backgroundColor: backgroundColor
    }

    //dynamic style for each card of REPropertyData image headerbackgroundcolor and price 
    const HeaderBackgroundColorStyle = {
        backgroundColor: cardProperty.agency.brandingColors.primary
    }
    const mainImgUrl = cardProperty.mainImage;
    
    const MainImgStyle = {
        border: 'solid',
        margin: '5px',
        padding: '40px 0',
        backgroundImage: 'url("' + mainImgUrl + '")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
    }

     // button add 
     const addProperty = () => {
        var cardProp = {
            "price": cardProperty.price,
            "agency": {
                "brandingColors": {
                    "primary": cardProperty.agency.brandingColors.primary
                },
                "logo": cardProperty.agency.logo
            },
            "id": cardProperty.id,
            "mainImage": cardProperty.mainImage
        }
        addREProperty(cardProp) //callback of parent
    }

    const onClick = e => {
        if (addREProperty) {
            addProperty()
        } 
    }

    return (
        <div className="propertyCardStyles" >
            <div id='backgrndColor' className="card-backgroundColor-header" style={HeaderBackgroundColorStyle}>
                <img src={cardProperty.agency.logo} className="card-logo" alt="logo" />
            </div>
            <div id='backgrndImg' style={MainImgStyle} >
               <div className="button"><a onClick={onClick} style={ButtonAStyle} href="#/"> {Button} </a></div>
           </div>
            <div style={{ borderTopStyle: 'solid' }}>
                <span style={{ marginLeft: '5px', float: 'left' }}>
                    Price
                 </span>
                <span id="price">
                    {cardProperty.price}
                </span>
            </div>
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
