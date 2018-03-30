import React from 'react';
import ReactDOM from 'react-dom';
import ConnectedProperties,{ REProperties }  from '../../components/REProperties';
import { shallow, mount } from 'enzyme';
import { data } from '../../datasource/fixtures.js'

const results = data.results
const saved = data.saved
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
    