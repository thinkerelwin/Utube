import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

test('renders Header', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});
