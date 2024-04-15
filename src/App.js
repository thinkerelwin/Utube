import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './containers/Home/Home';
import Watch from './containers/Watch/Watch';
import { Layout } from './components/Layout/Layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { youtubeLibraryLoaded } from './store/actions/api';

import './assets/style/normalize.css';
import './assets/style/custom.scss';
import 'semantic-ui-css/semantic.min.css';
import Trending from './containers/Trending/Trending';
import Search from './containers/Search/Search';

const App = (props) => {
  const { youtubeLibraryLoaded } = props;

  useEffect(() => {
    loadYoutubeApi();

    function loadYoutubeApi() {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/client.js';
      const API_KEY = process.env.REACT_APP_YOUTUBE_KEY;

      script.onload = () => {
        window.gapi.load('client', () => {
          window.gapi.client.setApiKey(API_KEY);
          window.gapi.client.load('youtube', 'v3', () => {
            youtubeLibraryLoaded();
          });
        });
      };

      document.body.appendChild(script);
    }
  }, [youtubeLibraryLoaded]);

  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/watch"
            render={() => <Watch key={props.location.key} />}
          />
          <Route path="/feed/trending" component={Trending} />
          <Route
            path="/results"
            render={() => <Search key={props.location.key} />}
          />
        </Switch>
      </Layout>
    </>
  );
};

App.propTypes = {
  youtubeLibraryLoaded: PropTypes.func,
  location: PropTypes.object,
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ youtubeLibraryLoaded }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(App));
