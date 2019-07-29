import React, { useEffect } from 'react';
import './Trending.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { VideoList } from '../../components/VideoList/VideoList';
import * as videoActions from '../../store/actions/video';
import {
  getMostPopularVideos,
  getMostPopularVideosNextPageToken,
  allMostPopularVideosLoaded
} from '../../store/reducers/videos';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import UsePrevious from '../../services/custom-hook';

function Trending(props) {
  const previousYoutubeLibraryLoaded = UsePrevious(props.youtubeLibraryLoaded);

  useEffect(() => {
    fetchTrendingVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (previousYoutubeLibraryLoaded !== props.youtubeLibraryLoaded) {
      fetchTrendingVideos();
    }
  });

  function fetchTrendingVideos() {
    if (props.youtubeLibraryLoaded) {
      props.fetchMostPopularVideos(20, true);
    }
  }

  function shouldShowLoader() {
    return !props.allMostPopularVideosLoaded;
  }

  function fetchMoreVideos() {
    const { nextPageToken } = props;
    if (props.youtubeLibraryLoaded && nextPageToken) {
      props.fetchMostPopularVideos(12, true, nextPageToken);
    }
  }

  const loaderActive = shouldShowLoader();

  return (
    <VideoList
      bottomReachedCallback={fetchMoreVideos}
      showLoader={loaderActive}
      videos={props.videos}
    />
  );
}

function mapStateToProps(state) {
  return {
    videos: getMostPopularVideos(state),
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    allMostPopularVideosLoaded: allMostPopularVideosLoaded(state),
    nextPageToken: getMostPopularVideosNextPageToken(state)
  };
}

function mapDispatchToProps(dispatch) {
  const fetchMostPopularVideos = videoActions.mostPopular.request;
  return bindActionCreators({ fetchMostPopularVideos }, dispatch);
}

Trending.propTypes = {
  youtubeLibraryLoaded: PropTypes.bool,
  fetchMostPopularVideos: PropTypes.func,
  allMostPopularVideosLoaded: PropTypes.bool,
  nextPageToken: PropTypes.string,
  videos: PropTypes.array
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trending);
