import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';

import App from '../../components/App';
import ConnectedProperties,{ REProperties }  from '../../components/REProperties';

import { createStore } from 'redux'
import { Provider } from 'react-redux' 
import rootReducer from '../../reducers'

const wrapper = shallow(<App />);

it('App renders correctly', () => {
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.exists()).toEqual(true)
});
//ReactDOM.unmountComponentAtNode doesn't work cause store
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

it('renders the App title  ', (done) => {
  expect(wrapper.find('h1').text()).toEqual("Welcome to REA World  via React");
  done()
})

describe('REProperties --- REACT-REDUX (Mount + wrapping in <Provider>)', () => {
  let store, wrapper

  beforeEach(() => {
      store = createStore(rootReducer)
       wrapper = mount(<Provider store={store}><ConnectedProperties /></Provider>)
  })

  it('Render the connected(SMART) component', () => {
      expect(wrapper.find(ConnectedProperties).length).toEqual(1)
  });

  it(' REProperties exists', (done) => {
    expect(wrapper.find('REProperties').length).toEqual(1)
      done()
  })
})