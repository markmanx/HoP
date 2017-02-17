import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory, browserHistory } from 'react-router';
import App from './App';
import SplashScreen from './SplashScreen';
import Room from './Room';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={SplashScreen} />
      <Route path="room" component={Room}>
        <IndexRoute component={Room} />
        <Route path=":slug" component={Room} />
      </Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
