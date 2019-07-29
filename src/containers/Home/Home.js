import React, { useState, useEffect } from 'react';
import './Home.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as videoActions from '../../store/actions/video';
import { bindActionCreators } from 'redux';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import {
  getVideoCategoryIds,
  videoCategoriesLoaded,
  videosByCategoryLoaded
} from '../../store/reducers/videos';

import { SideBar } from '../SideBar/SideBar';
import HomeContent from './HomeContent/HomeContent';
import UsePrevious from '../../services/custom-hook';

function Home(props) {
  const [categoryIndex, setCategoryIndex] = useState(0);

  const previousYoutubeLibraryLoaded = UsePrevious(props.youtubeLibraryLoaded);
  const previousVideoCategories = UsePrevious(props.videoCategories);

  useEffect(() => {
    if (props.youtubeLibraryLoaded) {
      fetchCategoriesAndMostPopularVideos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (previousYoutubeLibraryLoaded !== props.youtubeLibraryLoaded) {
      fetchCategoriesAndMostPopularVideos();
    } else if (props.videoCategories !== previousVideoCategories) {
      fetchVideosByCategory();
    }
  });

  function fetchCategoriesAndMostPopularVideos() {
    props.fetchMostPopularVideos();
    props.fetchVideoCategories();
  }

  function fetchVideosByCategory() {
    const categoryStartIndex = categoryIndex;
    const categories = props.videoCategories.slice(
      categoryStartIndex,
      categoryStartIndex + 3
    );
    props.fetchMostPopularVideosByCategory(categories);
    setCategoryIndex(categoryIndex + 3);
  }

  function bottomReachedCallback() {
    if (!props.videoCategoriesLoaded) {
      return;
    }
    fetchVideosByCategory();
  }

  function shouldShowLoader() {
    if (props.videoCategoriesLoaded && props.videosByCategoryLoaded) {
      return categoryIndex < props.videoCategories.length;
    }
    return false;
  }

  return (
    <>
      <SideBar />
      <HomeContent
        bottomReachedCallback={bottomReachedCallback}
        showLoader={shouldShowLoader()}
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    videoCategories: getVideoCategoryIds(state),
    videoCategoriesLoaded: videoCategoriesLoaded(state),
    videosByCategoryLoaded: videosByCategoryLoaded(state)
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
      fetchMostPopularVideosByCategory
    },
    dispatch
  );
}

Home.propTypes = {
  youtubeLibraryLoaded: PropTypes.bool,
  fetchMostPopularVideos: PropTypes.func,
  fetchVideoCategories: PropTypes.func,
  videoCategories: PropTypes.array,
  fetchMostPopularVideosByCategory: PropTypes.func,
  videoCategoriesLoaded: PropTypes.bool,
  videosByCategoryLoaded: PropTypes.number
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
