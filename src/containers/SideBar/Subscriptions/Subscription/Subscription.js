import React from 'react';
import './Subscription.scss';
import PropTypes from 'prop-types';
import { Icon, Image, Menu } from 'semantic-ui-react';

export function Subscription(props) {
  const { broadcasting, amountNewVideos, label } = props;

  let rightElement = null;
  if (broadcasting) {
    rightElement = <Icon name="signal" />;
  } else if (amountNewVideos) {
    rightElement = <span className="new-videos-count">{amountNewVideos}</span>;
  }

  return (
    <Menu.Item>
      <div className="subscription">
        <div>
          <Image src="https://via.placeholder.com/28x28" avatar />
          <span>{label}</span>
        </div>
        {rightElement}
      </div>
    </Menu.Item>
  );
}

Subscription.propTypes = {
  broadcasting: PropTypes.bool,
  amountNewVideos: PropTypes.number,
  label: PropTypes.string,
};
