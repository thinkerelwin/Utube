import React from 'react';
import WatchContent from './WatchContent/WatchContent';
import { bindActionCreators } from 'redux';
import * as watchActions from '../../store/actions/watch';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getYoutubeLibraryLoaded } from '../../store/reducers/api';
import { getChannelId } from '../../store/reducers/videos';
import { getSearchParam } from '../../services/url/index';

class Watch extends React.Component {
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
    //this.props.channelId will get value, but not passed to fetchWatchDetails, maybe due to async problem
  }
  render() {
    const videoId = this.getVideoId();
    return <WatchContent videoId={videoId} channelId={this.props.channelId} />;
  }
}

function mapStateToProps(state, props) {
  return {
    youtubeLibraryLoaded: getYoutubeLibraryLoaded(state),
    channelId: getChannelId(state, props.location, 'v')
  };
}

function mapDispatchToProps(dispatch) {
  const fetchWatchDetails = watchActions.details.request;
  return bindActionCreators({ fetchWatchDetails }, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Watch)
);
