import React from 'react';
import Header from './components/Header/Header';
import { SideBar } from './containers/SideBar/SideBar';
import './assets/style/normalize.css';
import './assets/style/custom.scss';
import 'semantic-ui-css/semantic.min.css';

const App = () => (
  <>
    <Header />
    <SideBar />
  </>
);

export default App;
