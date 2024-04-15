import React from 'react';
import PropTypes from 'prop-types';
import { VideoGrid } from '../../../components/VideoGrid/VideoGrid';
import { InfiniteScroll } from '../../../components/InfiniteScroll/InfiniteScroll';
import './HomeContent.scss';
import {
  getMostPopularVideos,
  getVideosByCategory,
} from '../../../store/reducers/videos';
import { connect } from 'react-redux';

const AMOUNT_TRENDING_VIDEOS = 12;

function HomeContent(props) {
  const trendingVideos = getTrendingVideos();
  const categoryGrids = getVideoGridsForCategories();

  return (
    <div className="home-content">
      <div className="responsive-video-grid-container">
        <InfiniteScroll
          bottomReachedCallback={props.bottomReachedCallback}
          showLoader={props.showLoader}
        >
          <VideoGrid title="Trending" videos={trendingVideos} />
          {categoryGrids}
        </InfiniteScroll>
      </div>
    </div>
  );

  function getTrendingVideos() {
    return props.mostPopularVideos.slice(0, AMOUNT_TRENDING_VIDEOS);
  }

  function getVideoGridsForCategories() {
    const categoryTitles = Object.keys(props.videosByCategory || {});
    return categoryTitles.map((categoryTitle, index) => {
      const videos = props.videosByCategory[categoryTitle];
      // the last video grid element should not have a divider
      const hideDivider = index === categoryTitles.length - 1;
      return (
        <VideoGrid
          title={categoryTitle}
          videos={videos}
          key={categoryTitle}
          hideDivider={hideDivider}
        />
      );
    });
  }
}

function mapStateToProps(state) {
  return {
    videosByCategory: getVideosByCategory(state),
    mostPopularVideos: getMostPopularVideos(state),
  };
}

HomeContent.propTypes = {
  bottomReachedCallback: PropTypes.func,
  showLoader: PropTypes.bool,
  mostPopularVideos: PropTypes.array,
  videosByCategory: PropTypes.object,
};

export default connect(mapStateToProps, null)(HomeContent);
