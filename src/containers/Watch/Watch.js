import React, { useState, useEffect } from 'react';
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
import UsePrevious from '../../services/custom-hook';

function Watch(props) {
  const previousYoutubeLibraryLoaded = UsePrevious(props.youtubeLibraryLoaded);
  const previousLocationKey = UsePrevious(props.location.search);
  const [isInitialContentLoaded, setIsInitialContentLoaded] = useState(false);

  useEffect(() => {
    if (props.youtubeLibraryLoaded) {
      fetchWatchContent();
      setIsInitialContentLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      previousYoutubeLibraryLoaded !== undefined &&
      previousYoutubeLibraryLoaded !== props.youtubeLibraryLoaded &&
      !isInitialContentLoaded
    ) {
      fetchWatchContent();
      setIsInitialContentLoaded(true);
    } else if (previousLocationKey !== props.location.search) {
      fetchWatchContent();
    }
  });

  function getVideoId() {
    return getSearchParam(props.location, 'v');
  }

  function fetchWatchContent() {
    const videoId = getVideoId();
    if (!videoId) {
      props.history.push('/');
    }

    props.fetchWatchDetails(videoId, props.channelId);
  }

  function fetchMoreComments() {
    if (props.nextPageToken) {
      props.fetchCommentThread(getVideoId(), props.nextPageToken);
    }
  }

  const videoId = getVideoId();
  return (
    <WatchContent
      videoId={videoId}
      channelId={props.channelId}
      bottomReachedCallback={fetchMoreComments}
      nextPageToken={props.nextPageToken}
    />
  );
}

function mapStateToProps(state, props) {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    channelId: getChannelId(state, props.location, 'v'),
    nextPageToken: getCommentNextPageToken(state, props.location)
  };
}

function mapDispatchToProps(dispatch) {
  const fetchWatchDetails = watchActions.details.request;
  const fetchCommentThread = commentActions.thread.request;
  return bindActionCreators(
    { fetchWatchDetails, fetchCommentThread },
    dispatch
  );
}

Watch.propTypes = {
  youtubeLibraryLoaded: PropTypes.bool,
  location: PropTypes.object,
  history: PropTypes.object,
  fetchWatchDetails: PropTypes.func,
  channelId: PropTypes.string,
  nextPageToken: PropTypes.string,
  fetchCommentThread: PropTypes.func
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Watch)
);
