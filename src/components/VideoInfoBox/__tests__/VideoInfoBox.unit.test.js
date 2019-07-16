import { VideoInfoBox } from '../VideoInfoBox';
import { shallow, mount } from 'enzyme';
import React from 'react';

describe('VideoInfoBox', () => {
  test('renders collapsed', () => {
    const wrapper = shallow(<VideoInfoBox />);
    expect(wrapper).toMatchSnapshot();
  });
  test('renders expanded', () => {
    const wrapper = mount(<VideoInfoBox />);
    wrapper.find('button.content-toggle').simulate('click');
    expect(wrapper).toMatchSnapshot();
  });
});
