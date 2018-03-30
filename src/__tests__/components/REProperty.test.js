import React from 'react';
import ReactDOM from 'react-dom';
import REProperty from '../../components/REProperty';
import { shallow, mount, configure } from 'enzyme';
import REProperties  from '../../components/REProperties';
import {  data } from '../../datasource/fixtures.js'

//import ReactTestUtils from 'react-dom/test-utils'
//  rule of thumbs is:
// Always begin with shallow
// If componentDidMount or componentDidUpdate should be tested, use mount
// If you want to test component lifecycle and children behavior, use mount
// If you want to test children rendering with less overhead than mount and you are not interested in lifecycle methods, use render

const wrapper = shallow(<REProperty cardProperty={data.results[0]} />);
const results = data.results
const saved = data.saved

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
    const { component } = setupmount({
        "cardProperty": data.results[0]
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
    const { component } = setupmount({
        "cardProperty": data.saved[0]
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

it("no  REProperty tag if addcard is empty / initial state not set proper  ", (done) => {
    // test for false of ( saved.length > 0 && ...)
    const wrapper3 = mount(<REProperties results={results} saved={saved}  />) // ?
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

