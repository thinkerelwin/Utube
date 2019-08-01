import React, { useState } from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import logo from '../../assets/img/logo.jpg';
import { Link, withRouter } from 'react-router-dom';
import { Image, Menu, Form, Input, Icon } from 'semantic-ui-react';

const Header = props => {
  const [queryString, setQueryString] = useState('');

  const onInputChange = event => {
    setQueryString(event.target.value);
  };

  const handleSubmit = () => {
    const escapedSearchQuery = encodeURI(queryString);
    props.history.push(`/results?search_query=${escapedSearchQuery}`);
  };

  return (
    <Menu borderless className="top-menu" fixed="top">
      <Menu.Item header className="logo">
        <Link to="/">
          <Image src={logo} size="tiny" />
        </Link>
      </Menu.Item>
      <Menu.Menu className="nav-container">
        <Menu.Item className="search-input">
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <Input
                placeholder="Search"
                size="small"
                action="Go"
                value={queryString}
                onChange={onInputChange}
              />
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
          <Image src="https://via.placeholder.com/80x80" avatar />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};

Header.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
};

export default withRouter(Header);
