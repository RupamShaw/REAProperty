import React from 'react';
import ReactDOM from 'react-dom';
import REProperty from '../../components/REProperty';
import { shallow, mount, configure } from 'enzyme';
import configureStore from 'redux-mock-store'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from '../../reducers'

import ConnectedProperties, { REProperties }  from '../../components/REProperties';
import { adddata1, addCard, data, adddata } from '../../datasource/fixtures.js'
import { addData, removeData } from '../../actions'
//import ReactTestUtils from 'react-dom/test-utils'
//  rule of thumbs is:
// Always begin with shallow
// If componentDidMount or componentDidUpdate should be tested, use mount
// If you want to test component lifecycle and children behavior, use mount
// If you want to test children rendering with less overhead than mount and you are not interested in lifecycle methods, use render

const wrapper = shallow(<REProperty cardProperty={data.results[0]} />);
const results = data.results
const saved = data.saved
const handleClickStub = jest.fn();

const setupShallow = props => {
    const component = shallow(
        <REProperty {...props} />
    )
    return {
        component: component
    }
}
const setupmount = props => {
    const component = mount(
        <REProperty {...props} />
    )
    return {
        component: component
    }
}

it('REProperty renders without crashing', () => {
    const div = document.createElement('div')
    //   console.log('data.saved', data.saved[0].agency.brandingColors)
    ReactDOM.render(<REProperty cardProperty={data.saved[0]} />, div)
    ReactDOM.unmountComponentAtNode(div)
});

describe('renders data for results ', () => {
    const spy = jest.fn();
    const { component } = setupmount({
        "cardProperty": data.results[0],
        "addREProperty": spy
     });
    const cardProp = data.results[0]
    it(' render from json data', (done) => {
        expect(component.find(".card-backgroundColor-header img").props().src).toEqual(cardProp.agency.logo)
        expect(component.find('#backgrndImg').prop('style').backgroundImage).toEqual('url(\"' + cardProp.mainImage + '\")')
        expect(component.find('#backgrndColor').prop('style').backgroundColor).toEqual(cardProp.agency.brandingColors.primary)
        expect(component.find('#price').text()).toEqual(cardProp.price)
        done()
    })
})

describe('renders data for saved ', () => {
    const spy = jest.fn();
    const { component } = setupmount({
        "cardProperty": data.saved[0],
        "removeREProperty": spy
     });
    const cardProp = data.saved[0]
    it(' render from json data', (done) => {
        expect(component.find(".card-backgroundColor-header img").props().src).toEqual(cardProp.agency.logo)
        expect(component.find('#backgrndImg').prop('style').backgroundImage).toEqual('url(\"' + cardProp.mainImage + '\")')
        expect(component.find('#backgrndColor').prop('style').backgroundColor).toEqual(cardProp.agency.brandingColors.primary)
        expect(component.find('#price').text()).toEqual(cardProp.price)
        done()
    })
})

it("no  REProperty tag if data.results is empty / initial state not set proper  ", (done) => {
    // test for false of ( saved.length > 0 && ...)
    const wrapper3 = mount(<REProperties results={results} saved={saved}   handleClick={handleClickStub}/>) // ?
    wrapper3.update()
    expect(wrapper3.find('#results REProperty').length).toEqual(3)
    expect(wrapper3.props().results.length).toEqual(3)

    const items1 = { results: [], saved: [] }
    wrapper3.setProps({ results: items1.results, saved: items1.saved })
    wrapper3.update()
    expect(wrapper3.find('#results REProperty').length).toEqual(0)
    expect(wrapper3.props().results.length).toEqual(0) 
    done()
});

describe('Button', () => {
    describe('Button Text ', () => {
        it(' button text should addProperty', (done) => {
            const spy = jest.fn();
            const { component } = setupShallow({
                "cardProperty": data.results[0],
                "addREProperty": spy
            });
            expect(component.find('a').text()).toEqual(" Add Property ")
            done()
        })

        it(' button text should removeProperty', (done) => {
            const spy = jest.fn();
            const { component } = setupShallow({
                "cardProperty": data.saved[0],
                "removeREProperty": spy
            });
            expect(component.find('a').last().text()).toEqual(" Remove Property ")
            done()
        })

        it(' fake button neither add nor remove then button text should be test', (done) => {
            const spy = jest.fn();
            const { component } = setupShallow({
                "cardProperty": data.results[0],
                "aaremoveREProperty": spy
            });
            expect(component.find('a').text()).toEqual(" test ")
            done()
        })

    })
    
    describe('Button click ', () => {
        let store, wrapper
        beforeEach(() => {
            store = createStore(rootReducer)
            wrapper = mount(<Provider store={store}><ConnectedProperties /></Provider>)
        })

        it('Button clicked  addProperty', (done) => {
            // const wrapper = mount(<REProperties items={items} handleClick={handleClickStub} />) // ?
            expect(wrapper.find(REProperties).prop('saved').length).toEqual(1)

            wrapper.find('a').first().text() // ? 
            wrapper.find('a').first().simulate('click') // ?
            wrapper.update()
            expect(wrapper.find('REProperties').prop('saved').length).toEqual(2)
            expect(wrapper.find('REProperties').prop('saved')).toEqual(adddata1.saved)
            done()
            wrapper.unmount(REProperties)
        })
        
        it('Button clicked  removedProperty', (done) => {
            //  const wrapper = mount(<REProperties results={results} saved={saved} handleClick={handleClickStub} />) // ?
            //  console.log(wrapper.debug())
            //     console.log('wrapper props',wrapper.props().saved)
            expect(wrapper.find(REProperties).prop('saved').length).toEqual(1);
            wrapper.find('a').last().simulate('click') // ?
            wrapper.update()
            expect(wrapper.find(REProperties).prop('saved').length).toEqual(0)
            wrapper.unmount(REProperties)
            done()
        });
    })

})

it('link Add Property test /addREProperty props should be in  <REProperty> for results', (done) => {
    const wrapper1 = mount(<REProperties results={results} saved={saved} handleClick={handleClickStub} />) // ?
    //console.log('wrapper1',wrapper1.debug())
    if (results.length >= 1) { // ? 
        const y = wrapper1.find(REProperty).first().props()// ? 
        if ('addREProperty' in y) {
            const anchor = wrapper1.find('a').first() //?
            expect(anchor.text()).toEqual(' Add Property ')
        }
    }
    done()
    wrapper1.unmount(REProperties)
});

it('link Remove Property test /removeREProperty props should be in  REProperty for saved', (done) => {
    const wrapper1 = mount(<REProperties results={results} saved={saved} handleClick={handleClickStub} />) // ?
    //can be done by find('#saved REProperty')
    if (saved.length >= 1) {
        const y = wrapper1.find(REProperty).last().props()// ?
        if ('removeREProperty' in y) {
            const anchor = wrapper1.find('a').last() // ?
            expect(anchor.text()).toEqual(' Remove Property ')
        }
    }
    wrapper1.unmount(REProperties)
    done()
});

it("savedcard is empty  REProperty  shouldn't be there", (done) => {
    // test for false of ( saved.length > 0 && ...)
    const items1 = { saved: [] }
    // items1
    const wrapper3 = mount(<REProperties results={results} saved={items1.saved} handleClick={handleClickStub} />) // ?
    const len = wrapper3.props().saved.length // ?  
    wrapper3.update()
    const y = wrapper3.find(REProperty).last().props()// ?
    //can be done by find('#saved REProperty')
    if (len === 0) {
        //     //test for no removeREProperty in y  
        if ('removeREProperty' in y) {
            const anchor = wrapper3.find('a').last() // ?
            expect(anchor.text()).toEqual(' Remove Property ') // ? anchor.text()
        }
    }
    done()
    wrapper3.unmount(REProperties)
});
