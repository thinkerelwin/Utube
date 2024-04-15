import React from 'react';
import './Trending.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { VideoList } from '../../components/VideoList/VideoList';
import * as videoActions from '../../store/actions/video';
import {
  getMostPopularVideos,
  getMostPopularVideosNextPageToken,
  allMostPopularVideosLoaded,
} from '../../store/reducers/videos';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';

class Trending extends React.Component {
  componentDidMount() {
    this.fetchTrendingVideos();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.youtubeLibraryLoaded !== this.props.youtubeLibraryLoaded) {
      this.fetchTrendingVideos();
    }
  }

  fetchTrendingVideos() {
    if (this.props.youtubeLibraryLoaded) {
      this.props.fetchMostPopularVideos(20, true);
    }
  }

  shouldShowLoader() {
    return !this.props.allMostPopularVideosLoaded;
  }

  fetchMoreVideos() {
    const { nextPageToken } = this.props;
    if (this.props.youtubeLibraryLoaded && nextPageToken) {
      this.props.fetchMostPopularVideos(12, true, nextPageToken);
    }
  }

  render() {
    const loaderActive = this.shouldShowLoader();

    return (
      <VideoList
        bottomReachedCallback={this.fetchMoreVideos}
        showLoader={loaderActive}
        videos={this.props.videos}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    videos: getMostPopularVideos(state),
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    allMostPopularVideosLoaded: allMostPopularVideosLoaded(state),
    nextPageToken: getMostPopularVideosNextPageToken(state),
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
  videos: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Trending);
