import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
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

const App = props => {
  const { youtubeLibraryLoaded } = props;

  useEffect(() => {
    loadYoutubeApi();

    function loadYoutubeApi() {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/client.js';
      const API_KEY = 'AIzaSyDU-wf9jmpi61D1W1Zqw8fs0CVdbDQqCL0';

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
          <Route path="/watch" component={Watch} />
        </Switch>
      </Layout>
    </>
  );
};

App.propTypes = {
  youtubeLibraryLoaded: PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ youtubeLibraryLoaded }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(App);
