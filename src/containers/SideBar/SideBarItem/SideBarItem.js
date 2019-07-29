import React from 'react';
import './SideBarItem.scss';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';

function SideBarItem(props) {
  const highlight = shouldBeHighlighted() ? 'highlight-item' : null;

  function shouldBeHighlighted() {
    const { pathname, path } = props.location;

    if (path === '/') {
      return pathname === path;
    }
    return pathname.includes(path);
  }

  return (
    <Link to={{ pathname: props.path }}>
      <Menu.Item className={`sidebar-item ${highlight}`}>
        <div className="sidebar-item-alignment-container">
          <span>
            <Icon size="large" name={props.icon} />{' '}
          </span>
          <span>{props.label}</span>
        </div>
      </Menu.Item>
    </Link>
  );
}

SideBarItem.propTypes = {
  location: PropTypes.object,
  path: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string
};

export default withRouter(SideBarItem);
