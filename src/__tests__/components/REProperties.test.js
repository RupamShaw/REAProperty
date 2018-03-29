import React from 'react';
import ReactDOM from 'react-dom';
import  REProperties  from '../../components/REProperties';
import { shallow, mount } from 'enzyme';
import { data } from '../../datasource/fixtures.js'

const results = data.results
const saved = data.saved
const props = { results, saved }
const wrapper = shallow(<REProperties {...props} />)

describe('>>>REProperties Initial rendered testing', () => {
    it('Should render successfully', () => {
        expect(wrapper.exists()).toBe(true)
    });

    it('REProperties renders without crashing', () => {
        const div = document.createElement('div')//?
        ReactDOM.render(<REProperties {...props} />, div)
        ReactDOM.unmountComponentAtNode(div)
    });
})
    