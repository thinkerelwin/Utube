import React from 'react';
import { shallow } from 'enzyme';
import { Layout } from '../Layout';

test('renders empty <Layout/>', () => {
  const wrapper = shallow(<Layout />);
  expect(wrapper).toMatchSnapshot();
});

test('renders <Layout/> with one child', () => {
  const wrapper = shallow(
    <Layout>
      <div>Child 1</div>
    </Layout>
  );
  expect(wrapper).toMatchSnapshot();
});

test('renders <Layout/> with children', () => {
  const wrapper = shallow(
    <Layout>
      <div>Child</div>
      <div>
        <span>Child</span>
        <p>Child</p>
      </div>
    </Layout>
  );
  expect(wrapper).toMatchSnapshot();
});
