import React from 'react';
import './Search.scss';
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

class Search extends React.Component {
  componentDidMount() {
    if (!this.getSearchQuery()) {
      // redirect to home component if search query is not there
      this.props.history.push('/');
    }
    this.searchForVideos();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.youtubeApiLoaded !== this.props.youtubeApiLoaded) {
      this.searchForVideos();
    }
  }
  searchForVideos() {
    const searchQuery = this.getSearchQuery();
    if (this.props.youtubeApiLoaded) {
      this.props.searchForVideos(searchQuery);
    }
  }

  getSearchQuery() {
    return getSearchParam(this.props.location, 'search_query');
  }

  bottomReachedCallback = () => {
    if (this.props.nextPageToken) {
      this.props.searchForVideos(
        this.getSearchQuery(),
        this.props.nextPageToken,
        25
      );
    }
  };

  render() {
    return (
      <VideoList
        bottomReachedCallback={this.bottomReachedCallback}
        showLoader={true}
        videos={this.props.searchResults}
      />
    );
  }
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Search)
);
