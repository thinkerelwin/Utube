import React from 'react';
import PropTypes from 'prop-types';
import './Layout.scss';
import Header from '../../containers/Header/Header';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

export function Layout(props) {
  return (
    <ScrollToTop>
      <div className="app-layout">
        <Header />
        {props.children}
      </div>
    </ScrollToTop>
  );
}

Layout.propTypes = {
  children: PropTypes.object,
};
