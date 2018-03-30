import { SET_REA, ADD_REA, REMOVE_REA } from '../actions'
import data from '../datasource/data.json'

function reaData(state = data, action) {
    switch (action.type) {
        case SET_REA:
            return action.cardProperty
            break
        
        case ADD_REA:
            //object of state should contain keys results and saved it shouldn't be empty  
            //new property  saves in  saved array  of state object
            //check results array contains  object of action.addProperty.id
            if (Object.keys(state).length === 2) {
                let t = state.results.filter(item => {
                    if (item.id === action.addProperty.id) {
                        return item
                    } else return 0
                })
                //from above got object from result which matches from id passed 
                //here  matched id object is stored in saved  
                if (JSON.stringify(t[0]) === JSON.stringify(action.addProperty)) {
                    //let aftett={...state,saved:[...state.saved,action.addProperty]}
                    return { ...state, saved: [...state.saved, action.addProperty] }
                } 
                 else
                    return state
            }
            //  else
            //     return state
            break

        case REMOVE_REA:
            if (Object.keys(state).length === 2) {
                return { ...state, saved: state.saved.filter(
                    item => item.id !== action.removeProperty) 
                }
            }
            break    

        default:
            return state
    }
}
export default reaData  