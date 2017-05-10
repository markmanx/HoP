import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Slide from './Slide';
import './index.css';
import { Router, Route, Redirect, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Slide} />
      <Route path="room/:slug" component={Slide} />
      <Redirect from="*" to="/" />
    </Route>
  </Router>,
  document.getElementById('root')
);
