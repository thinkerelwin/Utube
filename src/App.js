import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './containers/Home/Home';
import { Watch } from './containers/Watch/Watch';
import { Layout } from './components/Layout/Layout';
import './assets/style/normalize.css';
import './assets/style/custom.scss';
import 'semantic-ui-css/semantic.min.css';

const App = () => (
  <>
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/watch" component={Watch} />
      </Switch>
    </Layout>
  </>
);

export default App;
