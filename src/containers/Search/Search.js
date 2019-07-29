import React, { useEffect } from 'react';
import './Search.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import {
  getSearchNextPageToken,
  getSearchResults
} from '../../store/reducers/search';
import * as searchActions from '../../store/actions/search';
import { getSearchParam } from '../../services/url';
import { VideoList } from '../../components/VideoList/VideoList';
import UsePrevious from '../../services/custom-hook';

function Search(props) {
  const previousYoutubeApiLoaded = UsePrevious(props.youtubeApiLoaded);

  useEffect(() => {
    if (!getSearchQuery()) {
      // redirect to home component if search query is not there
      props.history.push('/');
    }
    searchForVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (previousYoutubeApiLoaded !== props.youtubeApiLoaded) {
      searchForVideos();
    }
  });

  function searchForVideos() {
    const searchQuery = getSearchQuery();
    if (props.youtubeApiLoaded) {
      props.searchForVideos(searchQuery);
    }
  }

  function getSearchQuery() {
    return getSearchParam(props.location, 'search_query');
  }

  function bottomReachedCallback() {
    if (props.nextPageToken) {
      props.searchForVideos(getSearchQuery(), props.nextPageToken, 25);
    }
  }

  return (
    <VideoList
      bottomReachedCallback={bottomReachedCallback}
      showLoader={true}
      videos={props.searchResults}
    />
  );
}

function mapStateToProps(state, props) {
  return {
    youtubeApiLoaded: getYoutubeLibraryLoaded(state),
    searchResults: getSearchResults(state, props.location.search),
    nextPageToken: getSearchNextPageToken(state, props.location.search)
  };
}

function mapDispatchToProps(dispatch) {
  const searchForVideos = searchActions.forVideos.request;
  return bindActionCreators({ searchForVideos }, dispatch);
}

Search.propTypes = {
  youtubeApiLoaded: PropTypes.bool,
  searchForVideos: PropTypes.func,
  history: PropTypes.func,
  location: PropTypes.object,
  nextPageToken: PropTypes.string,
  searchResults: PropTypes.array
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
