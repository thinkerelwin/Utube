import React from 'react';
import { connect } from 'react-redux';
import { Video } from '../../../components/Video/Video';
import { VideoMetadata } from '../../../components/VideoMetadata/VideoMetadata';
import { VideoInfoBox } from '../../../components/VideoInfoBox/VideoInfoBox';
import { Comments } from '../../Comments/Comments';
import { RelatedVideos } from '../../../components/RelatedVideos/RelatedVideos';
import './WatchContent.scss';

import { getVideoById } from '../../../store/reducers/videos';

class WatchContent extends React.Component {
  render() {
    if (!this.props.videoId) {
      return <div />;
    }
    return (
      <div className="watch-grid">
        <Video className="video" id={this.props.videoId} />
        <VideoMetadata video={this.props.video} />
        <VideoInfoBox className="video-info-box" video={this.props.video} />
        <Comments amountComments={112499} />
        <RelatedVideos className="relatedVideos" />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    video: getVideoById(state, props.videoId)
  };
}

export default connect(
  mapStateToProps,
  null
)(WatchContent);
