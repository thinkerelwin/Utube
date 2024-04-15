import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as videoActions from '../../store/actions/video';
import { bindActionCreators } from 'redux';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import {
  getVideoCategoryIds,
  videoCategoriesLoaded,
  videosByCategoryLoaded,
} from '../../store/reducers/videos';

import './Home.scss';

import { SideBar } from '../SideBar/SideBar';
import HomeContent from './HomeContent/HomeContent';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryIndex: 0,
    };
    this.bottomReachedCallback = this.bottomReachedCallback.bind(this);
  }
  componentDidMount() {
    if (this.props.youtubeLibraryLoaded) {
      this.fetchCategoriesAndMostPopularVideos();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
      this.fetchCategoriesAndMostPopularVideos();
    } else if (this.props.videoCategories !== prevProps.videoCategories) {
      this.fetchVideosByCategory();
    }
  }

  fetchCategoriesAndMostPopularVideos() {
    this.props.fetchMostPopularVideos();
    this.props.fetchVideoCategories();
  }

  fetchVideosByCategory() {
    const categoryStartIndex = this.state.categoryIndex;
    const categories = this.props.videoCategories.slice(
      categoryStartIndex,
      categoryStartIndex + 3,
    );
    this.props.fetchMostPopularVideosByCategory(categories);
    this.setState((prevState) => {
      return {
        categoryIndex: prevState.categoryIndex + 3,
      };
    });
  }

  bottomReachedCallback() {
    if (!this.props.videoCategoriesLoaded) {
      return;
    }
    this.fetchVideosByCategory();
  }

  shouldShowLoader() {
    if (this.props.videoCategoriesLoaded && this.props.videosByCategoryLoaded) {
      return this.state.categoryIndex < this.props.videoCategories.length;
    }
    return false;
  }

  render() {
    return (
      <>
        <SideBar />
        <HomeContent
          bottomReachedCallback={this.bottomReachedCallback}
          showLoader={this.shouldShowLoader()}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    videoCategories: getVideoCategoryIds(state),
    videoCategoriesLoaded: videoCategoriesLoaded(state),
    videosByCategoryLoaded: videosByCategoryLoaded(state),
  };
}

function mapDispatchToProps(dispatch) {
  const fetchMostPopularVideos = videoActions.mostPopular.request;
  const fetchVideoCategories = videoActions.categories.request;
  const fetchMostPopularVideosByCategory =
    videoActions.mostPopularByCategory.request;
  return bindActionCreators(
    {
      fetchMostPopularVideos,
      fetchVideoCategories,
      fetchMostPopularVideosByCategory,
    },
    dispatch,
  );
}

Home.propTypes = {
  youtubeLibraryLoaded: PropTypes.bool,
  fetchMostPopularVideos: PropTypes.func,
  fetchVideoCategories: PropTypes.func,
  videoCategories: PropTypes.array,
  fetchMostPopularVideosByCategory: PropTypes.func,
  videoCategoriesLoaded: PropTypes.bool,
  videosByCategoryLoaded: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
