import React from 'react';
import './RelatedVideos.scss';
import PropTypes from 'prop-types';

export function RelatedVideos() {
  return (
    <h3 className="related-videos">
      The feature for related videos has been removed from YouTube API since
      August 7th, 2023
    </h3>
  );
}

RelatedVideos.propTypes = {
  videos: PropTypes.array,
};
