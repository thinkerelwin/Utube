import React from 'react';
import './SideBarHeader.scss';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

export function SideBarHeader(props) {
  const heading = props.title ? props.title.toUpperCase() : '';
  return (
    <Menu.Item>
      <Menu.Header className="side-bar-header">{heading}</Menu.Header>
    </Menu.Item>
  );
}

SideBarHeader.propTypes = {
  title: PropTypes.string,
};
