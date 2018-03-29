import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../components/App';
import { shallow } from 'enzyme';

const wrapper = shallow(<App />);

it('App renders correctly', () => {
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.exists()).toEqual(true)
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the App title  ', () => {
  expect(wrapper.find('h1').text()).toEqual("Welcome to REA World  via React");
})
