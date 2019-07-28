import React from 'react';
import './VideoList.scss';
import { SideBar } from '../../containers/SideBar/SideBar';
import { VideoPreview } from '../VideoPreview/VideoPreview';
import { InfiniteScroll } from '../InfiniteScroll/InfiniteScroll';

export class VideoList extends React.Component {
  getVideoPreviews() {
    if (!this.props.videos || !this.props.videos.length) {
      return null;
    }
    const firstVideo = this.props.videos[0];
    // it's actually to check all of the videos have description property, but checking the first one should be enough
    if (!firstVideo.snippet.description) {
      return null;
    }

    return this.props.videos.map(video => (
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

  render() {
    const videoPreviews = this.getVideoPreviews();

    return (
      <React.Fragment>
        <SideBar />
        <div className="video-list">
          <InfiniteScroll
            bottomReachedCallback={this.props.bottomReachedCallback}
            showLoader={this.props.showLoader}
          >
            {videoPreviews}
          </InfiniteScroll>
        </div>
      </React.Fragment>
    );
  }
}
