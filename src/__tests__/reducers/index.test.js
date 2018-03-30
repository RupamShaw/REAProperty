import rootReducer from '../../reducers'
import * as actions from '../../actions'
import { data, adddata1 } from '../../datasource/fixtures.js'

describe ('reducer',()=>{
  it('returns the initial state', ()=>{
      expect(rootReducer({},{})).toEqual({})
    })

//pure function test
    it('loads  data if any object passed', ()=>{
       expect(rootReducer({},{ type: actions.SET_REA,cardProperty:{"foo":"foo"} })).toEqual({"foo":"foo"})
    })
     
    it('loads main data', ()=>{
        expect(rootReducer({},{ type: actions.SET_REA,cardProperty:data})).toEqual(data)
     })
})