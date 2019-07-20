import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as videoActions from '../../store/actions/video';
import { bindActionCreators } from 'redux';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';

import './Home.scss';

import { SideBar } from '../SideBar/SideBar';
import { HomeContent } from './HomeContent/HomeContent';
class Home extends React.Component {
  componentDidMount() {
    if (this.props.youtubeLibraryLoaded) {
      this.props.fetchMostPopularVideos();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.youtubeLibraryLoaded !== prevProps.youtubeLibraryLoaded) {
      this.props.fetchMostPopularVideos();
    }
  }

  render() {
    return (
      <React.Fragment>
        <SideBar />
        <HomeContent />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state)
  };
}

function mapDispatchToProps(dispatch) {
  const fetchMostPopularVideos = videoActions.mostPopular.request;
  return bindActionCreators({ fetchMostPopularVideos }, dispatch);
}

Home.propTypes = {
  youtubeLibraryLoaded: PropTypes.bool,
  fetchMostPopularVideos: PropTypes.func
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
