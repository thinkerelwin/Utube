import React from 'react';
import './Video.scss';
import PropTypes from 'prop-types';

const BASE_EMBED_URL = 'https://www.youtube.com/embed/';

export function Video(props) {
  if (!props.id) {
    return null;
  }
  const embedUrl = `${BASE_EMBED_URL}${props.id}`;
  return (
    <div className="video-container">
      <div className="video">
        <iframe
          className="video-player"
          src={embedUrl}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
        />
      </div>
    </div>
  );
}

Video.propTypes = {
  id: PropTypes.string,
};
