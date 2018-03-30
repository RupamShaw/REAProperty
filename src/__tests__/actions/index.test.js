import * as actions from '../../actions'
import {data} from '../../datasource/fixtures.js'
import { SET_REA } from '../../actions'

describe ('actions',()=>{
    it('create an action to load main data', ()=>{
        const expectedAction ={
            type: SET_REA,
            cardProperty: data 
        }
        expect(actions.setData(data)).toEqual(expectedAction)
    })

})