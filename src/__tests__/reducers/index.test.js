import rootReducer from '../../reducers'
import * as actions from '../../actions'
import { data, adddata1, falsedata } from '../../datasource/fixtures.js'

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

describe('add Property ',() =>{
    it('checks add data stored  in saved ',(done) =>{
        //will CHECK for  OTHER 3 CONDITIONS TOO of add property in reducer
        expect(rootReducer(data, { type: actions.ADD_REA, 
                                    addProperty : data.results[0]
                                 }
                            )).toEqual(adddata1)
        done()
    })

    it("added id doesn't matches with result id", (done) =>{
        expect(rootReducer(data, {
                                    type: actions.ADD_REA, 
                                    addProperty : falsedata
                                }
                            )
        ).toEqual(data)
        done()
    })
   
})