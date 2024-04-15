import React from 'react';
import PropTypes from 'prop-types';
import WatchContent from './WatchContent/WatchContent';
import { bindActionCreators } from 'redux';
import * as watchActions from '../../store/actions/watch';
import * as commentActions from '../../store/actions/comment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import { getChannelId } from '../../store/reducers/videos';
import { getCommentNextPageToken } from '../../store/reducers/comments';
import { getSearchParam } from '../../services/url/index';

class Watch extends React.Component {
  constructor(props) {
    super(props);
    this.fetchMoreComments = this.fetchMoreComments.bind(this);
  }
  componentDidMount() {
    if (this.props.youtubeLibraryLoaded) {
      this.fetchWatchContent();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
      this.fetchWatchContent();
    }
  }
  getVideoId() {
    return getSearchParam(this.props.location, 'v');
  }

  fetchWatchContent() {
    const videoId = this.getVideoId();
    if (!videoId) {
      this.props.history.push('/');
    }

    this.props.fetchWatchDetails(videoId, this.props.channelId);
  }

  fetchMoreComments() {
    if (this.props.nextPageToken) {
      this.props.fetchCommentThread(
        this.getVideoId(),
        this.props.nextPageToken,
      );
    }
  }

  render() {
    const videoId = this.getVideoId();
    return (
      <WatchContent
        videoId={videoId}
        channelId={this.props.channelId}
        bottomReachedCallback={this.fetchMoreComments}
        nextPageToken={this.props.nextPageToken}
      />
    );
  }
}

function mapStateToProps(state, props) {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    channelId: getChannelId(state, props.location, 'v'),
    nextPageToken: getCommentNextPageToken(state, props.location),
  };
}

function mapDispatchToProps(dispatch) {
  const fetchWatchDetails = watchActions.details.request;
  const fetchCommentThread = commentActions.thread.request;
  return bindActionCreators(
    { fetchWatchDetails, fetchCommentThread },
    dispatch,
  );
}

Watch.propTypes = {
  youtubeLibraryLoaded: PropTypes.bool,
  location: PropTypes.object,
  history: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  fetchWatchDetails: PropTypes.func,
  channelId: PropTypes.string,
  nextPageToken: PropTypes.string,
  fetchCommentThread: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Watch));
