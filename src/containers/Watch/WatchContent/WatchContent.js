import React from 'react';
import PropTypes from 'prop-types';
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

function WatchContent(props) {
  if (!props.videoId) {
    return <div />;
  }

  function shouldShowLoader() {
    return !!props.nextPageToken;
  }

  return (
    <InfiniteScroll
      bottomReachedCallback={props.bottomReachedCallback}
      showLoader={shouldShowLoader()}
    >
      <div className="watch-grid">
        <Video className="video" id={props.videoId} />
        <VideoMetadata video={props.video} />
        <VideoInfoBox
          className="video-info-box"
          video={props.video}
          channel={props.channel}
        />
        <Comments
          comments={props.comments}
          amountComments={props.amountComments}
        />
        <RelatedVideos className="relatedVideos" videos={props.relatedVideos} />
      </div>
    </InfiniteScroll>
  );
}

function mapStateToProps(state, props) {
  return {
    video: getVideoById(state, props.videoId),
    relatedVideos: getRelatedVideos(state, props.videoId),
    channel: getChannel(state, props.channelId),
    comments: getCommentsForVideo(state, props.videoId),
    amountComments: getAmountComments(state, props.videoId)
  };
}

WatchContent.propTypes = {
  nextPageToken: PropTypes.string,
  videoId: PropTypes.string,
  bottomReachedCallback: PropTypes.func,
  video: PropTypes.object,
  channel: PropTypes.object,
  comments: PropTypes.array,
  amountComments: PropTypes.string,
  relatedVideos: PropTypes.array
};

export default connect(
  mapStateToProps,
  null
)(WatchContent);
