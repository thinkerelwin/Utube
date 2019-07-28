import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Menu } from 'semantic-ui-react';
import './SideBarItem.scss';

function SideBarItem(props) {
  // React will ignore custom boolean attributes, therefore we pass a string
  // we use this attribute in our SCSS for styling
  const highlight = shouldBeHighlighted() ? 'highlight-item' : null;

  function shouldBeHighlighted() {
    // return true;
    const { pathname } = props.location;

    if (props.path === '/') {
      return pathname === props.path;
    }
    return pathname.includes(props.path);
  }

  return (
    <Link to={{ pathname: props.path }}>
      <Menu.Item className={['sidebar-item', highlight].join(' ')}>
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

export default withRouter(SideBarItem);
