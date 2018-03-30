import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store'
import { createStore } from 'redux'
import { Provider } from 'react-redux' 
import rootReducer from '../../reducers'
import { shallow, mount } from 'enzyme';

import { addCard, data, adddata } from '../../datasource/fixtures.js'
import ConnectedProperties,{ REProperties }  from '../../components/REProperties';
import { addData, removeData } from '../../actions'
import REProperty from '../../components/REProperty';

const results = data.results
const saved = data.saved
const handleClickStub = jest.fn();
const props = { results, saved }
const wrapper = shallow(<REProperties {...props} />)

describe('>>>REProperties Initial rendered testing', () => {
    it('REProperties renders correctly', () => {
        expect(wrapper).toMatchSnapshot() //?
    });

    it('Should render successfully', () => {
        expect(wrapper.exists()).toBe(true)
    });

    it('REProperties renders without crashing', () => {
        const div = document.createElement('div')
        ReactDOM.render(<REProperties {...props} />, div)
        ReactDOM.unmountComponentAtNode(div)
    });
    
    it("if zero  result  i.e count of REProperty tag is zero", (done) => {
        let propszero = {results:[],saved:[]}
        let wrapperPropResult = shallow(<REProperties {...propszero} />)
        // REProperty tag zero"
        expect(wrapperPropResult.find('AdminContact').length).toEqual(1)
        done()
    })

    it("count of REProperty tag is equal to count of data.results+data.saved", (done) => {
        // REProperty tag totalcount is data.results+data.saved"
        expect(wrapper.find('REProperty').length).toEqual(results.length + saved.length)
        //render REProperty tag for resultsa
        expect(wrapper.find('#results REProperty').length).toEqual(results.length)
        //render REProperty tag for saved
        expect(wrapper.find('#saved REProperty').length).toEqual(saved.length)
        done()
    })
})

describe('>>>REProperties --- REACT-REDUX (Mount + wrapping in <Provider>)', () => {
    const initialState = { results, saved }
    const mockStore = configureStore()
    let store, wrapper
    beforeEach(() => {
        store = mockStore(initialState)
        wrapper = mount(<Provider store={store}><ConnectedProperties /></Provider>)
    })

    it(' render the connected(SMART) component', () => {
        expect(wrapper.find(ConnectedProperties).length).toEqual(1)
    });

    it(' check Prop matches with initialState', (done) => {
        expect(wrapper.find(REProperties).prop('results')).toEqual(initialState.results)
        done()
    })

    it('check action on dispatching ', (done) => {
       store.dispatch(addData(addCard))
       store.dispatch(removeData("3"))
       let action = store.getActions()
       expect(action[0].type).toBe("ADD_REA")
       expect(action[1].type).toBe("REMOVE_REA")
       done()
   });

})

describe('>>>REProperties --- REACT-REDUX (actual Store + reducers) more of Integration Testing', () => {
    let store, wrapper
    beforeEach(() => {

        store = createStore(rootReducer)
        wrapper = mount(<Provider store={store}><ConnectedProperties /></Provider>)
    })

    it(' check Prop matches with initialState and add and remove flow works as expected', () => {
        expect(wrapper.find(REProperties).prop('saved')).toEqual(data.saved)
        store.dispatch(addData(addCard))
        wrapper.update()
        expect(wrapper.find(REProperties).prop('saved')).toEqual(adddata.saved)
        
        store.dispatch(removeData("3"))
        wrapper.update()
        expect(wrapper.find(REProperties).prop('saved')).toEqual(data.saved)

    });


    it('add Property check in component  ', (done) => {
        const reProperties = wrapper.find(REProperties)
        let rePropertiesInstance = reProperties.instance()
        expect(wrapper.find(REProperties).prop('saved')).toEqual(data.saved)

        rePropertiesInstance.addREProperty(addCard)
        wrapper.update()
        expect(rePropertiesInstance.props.saved).toEqual(adddata.saved)
        done()
    })

    it('remove Property  id is not string ', (done) => {
        expect(wrapper.find(REProperties).prop('saved')).toEqual(data.saved)
        store.dispatch(addData(addCard))
        wrapper.update()
        expect(wrapper.find(REProperties).prop('saved')).toEqual(adddata.saved)

        const reProperties = wrapper.find(REProperties)

        let rePropertiesInstance = reProperties.instance()
        rePropertiesInstance.removeREProperty(3)
       //   reProperties.removeREProperty(3)
       expect(wrapper.find(REProperties).prop('saved')).toEqual(adddata.saved) // no change
        done()
    })
    it('remove Property check in component  ', (done) => {
        expect(wrapper.find(REProperties).prop('saved')).toEqual(data.saved)
        store.dispatch(addData(addCard))
        wrapper.update()
        expect(wrapper.find(REProperties).prop('saved')).toEqual(adddata.saved)
  
        const reProperties = wrapper.find(REProperties)
        let rePropertiesInstance = reProperties.instance()
        rePropertiesInstance.removeREProperty("3")
        wrapper.update()
        expect(wrapper.find(REProperties).prop('saved')).toEqual(data.saved) // no change
  
        done()
    })

})
