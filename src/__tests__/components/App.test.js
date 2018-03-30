import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from '../../components/App';
import { REProperties }  from '../../components/REProperties';

const wrapper = shallow(<App />);

it('App renders correctly', () => {
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.exists()).toEqual(true)
});
//mount doesn't work cause store
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it('renders the App title  ', (done) => {
  expect(wrapper.find('h1').text()).toEqual("Welcome to REA World  via React");
  done()
})

// it("REProperties Tag  should be there ", (done) => {
//   // REProperty tag totalcount is data.results+data.saved"
//   expect(wrapper.find('Connect(REProperties)').length).toEqual(1)
// })