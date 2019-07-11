import React from 'react';
import { Home } from './containers/Home/Home';
import { Layout } from './components/Layout/Layout';
import './assets/style/normalize.css';
import './assets/style/custom.scss';
import 'semantic-ui-css/semantic.min.css';

const App = () => (
  <>
    <Layout>
      <Home />
    </Layout>
  </>
);

export default App;
