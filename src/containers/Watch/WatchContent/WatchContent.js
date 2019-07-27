import React from 'react';
import { connect } from 'react-redux';
import { Video } from '../../../components/Video/Video';
import { VideoMetadata } from '../../../components/VideoMetadata/VideoMetadata';
import { VideoInfoBox } from '../../../components/VideoInfoBox/VideoInfoBox';
import { Comments } from '../../Comments/Comments';
import { RelatedVideos } from '../../../components/RelatedVideos/RelatedVideos';
import './WatchContent.scss';

import {
  getRelatedVideos,
  getVideoById,
  getAmountComments
} from '../../../store/reducers/videos';
import { getChannel } from '../../../store/reducers/channels';
import { getCommentsForVideo } from '../../../store/reducers/comments';
import { InfiniteScroll } from '../../../components/InfiniteScroll/InfiniteScroll';

class WatchContent extends React.Component {
  shouldShowLoader() {
    return !!this.props.nextPageToken;
  }

  render() {
    if (!this.props.videoId) {
      return <div />;
    }

    return (
      <InfiniteScroll
        bottomReachedCallback={this.props.bottomReachedCallback}
        showLoader={this.shouldShowLoader()}
      >
        <div className="watch-grid">
          <Video className="video" id={this.props.videoId} />
          <VideoMetadata video={this.props.video} />
          <VideoInfoBox
            className="video-info-box"
            video={this.props.video}
            channel={this.props.channel}
          />
          <Comments
            comments={this.props.comments}
            amountComments={this.props.amountComments}
          />
          <RelatedVideos
            className="relatedVideos"
            videos={this.props.relatedVideos}
          />
        </div>
      </InfiniteScroll>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    video: getVideoById(state, props.videoId),
    relatedVideos: getRelatedVideos(state, props.videoId),
    channel: getChannel(state, props.channelId),
    comments: getCommentsForVideo(state, props.videoId),
    // commentNextPageToken: getCommentNextPageToken(state, props),
    amountComments: getAmountComments(state, props.videoId)
  };
}

export default connect(
  mapStateToProps,
  null
)(WatchContent);
