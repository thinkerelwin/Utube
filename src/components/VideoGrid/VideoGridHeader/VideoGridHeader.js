import React from 'react';
import './VideoGridHeader.scss';
import PropTypes from 'prop-types';

export function VideoGridHeader(props) {
  return (
    <div className="video-grid-header">
      <span className="title">{props.title}</span>
    </div>
  );
}

VideoGridHeader.propTypes = {
  title: PropTypes.string,
};
