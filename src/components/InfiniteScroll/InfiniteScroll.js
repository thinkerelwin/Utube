import React from 'react';
import { Waypoint } from 'react-waypoint';
import PropTypes from 'prop-types';
import { Loader } from 'semantic-ui-react';
import './InfiniteScroll.scss';

export function InfiniteScroll(props) {
  return (
    <>
      {props.children}
      <Waypoint onEnter={props.bottomReachedCallback}>
        <div className="loader-container">
          <Loader active={props.showLoader} inline="centered" />
        </div>
      </Waypoint>
    </>
  );
}

InfiniteScroll.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  bottomReachedCallback: PropTypes.func,
  showLoader: PropTypes.bool,
};
