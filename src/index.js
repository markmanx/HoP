import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SplashScreen from './SplashScreen';
import Room from './Room';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

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
