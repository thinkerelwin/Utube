import React from 'react';
import './VideoList.scss';
import PropTypes from 'prop-types';
import { SideBar } from '../../containers/SideBar/SideBar';
import { VideoPreview } from '../VideoPreview/VideoPreview';
import { InfiniteScroll } from '../InfiniteScroll/InfiniteScroll';

export function VideoList(props) {
  function getVideoPreviews() {
    if (!props.videos || !props.videos.length) {
      return null;
    }

    const firstVideo = props.videos[0];
    // it's actually to check all of the videos have description property, but checking the first one should be enough
    if (!firstVideo.snippet.description) {
      return null;
    }

    return props.videos.map(video => (
      <VideoPreview
        horizontal={true}
        expanded={true}
        video={video}
        key={video.id}
        pathname={'/watch'}
        search={'?v=' + video.id}
      />
    ));
  }

  return (
    <>
      <SideBar />
      <div className="video-list">
        <InfiniteScroll
          bottomReachedCallback={props.bottomReachedCallback}
          showLoader={props.showLoader}
        >
          {getVideoPreviews()}
        </InfiniteScroll>
      </div>
    </>
  );
}

VideoList.propTypes = {
  videos: PropTypes.array,
  bottomReachedCallback: PropTypes.func,
  showLoader: PropTypes.bool
};
