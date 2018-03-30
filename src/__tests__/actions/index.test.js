import * as actions from '../../actions'
import {data} from '../../datasource/fixtures.js'
import { SET_REA, ADD_REA } from '../../actions'

describe ('actions',()=>{
    it('create an action to load main data', ()=>{
        const expectedAction ={
            type: SET_REA,
            cardProperty: data 
        }
        expect(actions.setData(data)).toEqual(expectedAction)
    })

    it('create an action to add Property', ()=>{
        const expectedAction ={
            type: ADD_REA,
            addProperty: data.results[0] 
        }
        expect(actions.addData(data.results[0])).toEqual(expectedAction)
    })


})