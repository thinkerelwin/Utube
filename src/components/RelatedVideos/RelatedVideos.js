import React from 'react';
import './RelatedVideos.scss';
import PropTypes from 'prop-types';
import { VideoPreview } from '../VideoPreview/VideoPreview';
import { NextUpVideo } from './NextUpVideo/NextUpVideo';

export function RelatedVideos(props) {
  if (!props.videos || !props.videos.length) {
    return (
      <h3 className="related-videos">
        The feature for related videos has been removed from YouTube API since
        August 7th, 2023
      </h3>
    );
  }

  // safe because before we check if the array has at least one element
  const nextUpVideo = props.videos[0];
  const remainingVideos = props.videos.slice(1);

  const relatedVideosPreviews = remainingVideos.map((relatedVideo) => (
    <VideoPreview
      video={relatedVideo}
      key={relatedVideo.id}
      pathname="/watch"
      search={`?v=${relatedVideo.id}`}
      horizontal={true}
    />
  ));

  return (
    <div className="related-videos">
      <NextUpVideo video={nextUpVideo} />
      {relatedVideosPreviews}
    </div>
  );
}

RelatedVideos.propTypes = {
  videos: PropTypes.array,
};
