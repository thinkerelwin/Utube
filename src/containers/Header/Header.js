import React from 'react';
import { Image, Menu, Form, Input, Icon } from 'semantic-ui-react';
import './Header.scss';
import logo from '../../assets/img/logo.jpg';

const Header = () => (
  <Menu borderless className="top-menu" fixed="top">
    <Menu.Item header className="logo">
      <Image src={logo} size="tiny" />
    </Menu.Item>
    <Menu.Menu className="nav-container">
      <Menu.Item className="search-input">
        <Form>
          <Form.Field>
            <Input placeholder="Search" size="small" action="Go" />
          </Form.Field>
        </Form>
      </Menu.Item>
    </Menu.Menu>
    <Menu.Menu position="right">
      <Menu.Item>
        <Icon className="header-icon" name="video camera" size="large" />
      </Menu.Item>
      <Menu.Item>
        <Icon className="header-icon" name="grid layout" size="large" />
      </Menu.Item>
      <Menu.Item>
        <Icon className="header-icon" name="chat" size="large" />
      </Menu.Item>
      <Menu.Item>
        <Icon className="header-icon" name="alarm" size="large" />
      </Menu.Item>
      <Menu.Item name="avatar">
        <Image src="http://via.placeholder.com/80x80" avatar />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default Header;
