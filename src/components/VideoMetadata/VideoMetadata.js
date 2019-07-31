import React from 'react';
import './VideoMetadata.scss';
import PropTypes from 'prop-types';
import { Button, Divider, Icon } from 'semantic-ui-react';
import { Rating } from '../Rating/Rating';

export function VideoMetadata(props) {
  if (!props.video || !props.video.statistics) {
    return <div />;
  }
  const viewCount = Number(props.video.statistics.viewCount).toLocaleString();

  return (
    <div className="video-metadata">
      <h3 className="video-title">{props.video.snippet.title}</h3>
      <div className="video-stats">
        <span>{viewCount} views</span>
        <div className="video-actions">
          <Rating
            likeCount={Number(props.video.statistics.likeCount)}
            dislikeCount={Number(props.video.statistics.dislikeCount)}
          />
          <Button basic icon labelPosition="left">
            <Icon name="share" />
            Share
          </Button>
          <Button basic icon>
            <Icon name="add circle" />
          </Button>
          <Button basic icon>
            <Icon name="ellipsis horizontal" />
          </Button>
        </div>
      </div>
      <Divider />
    </div>
  );
}

VideoMetadata.propTypes = {
  video: PropTypes.object
};
