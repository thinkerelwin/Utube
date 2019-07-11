import React from 'react';
import './Layout.scss';
import Header from '../../containers/Header/Header';

export function Layout(props) {
  return (
    <div className="app-layout">
      <Header />
      {props.children}
    </div>
  );
}
