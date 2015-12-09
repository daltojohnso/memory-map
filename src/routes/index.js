import React                 from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout            from 'layouts/CoreLayout';
import HomeView              from 'views/HomeView';
import LoginView             from 'views/LoginView';
import MapView from 'views/MapView';

export default (
  <Route        component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} />
    <Route      component={MapView}  path='/mapview' />
    <Route      component={LoginView}  path='/login' />
  </Route>
);
