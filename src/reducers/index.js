import { SET_REA } from '../actions'
import data from '../datasource/data.json'

function reaData(state = data, action) {
    switch (action.type) {
        case SET_REA:
            return action.cardProperty
            break
        default:
            return state
    }

}
export default reaData  