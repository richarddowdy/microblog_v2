import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import PostContainer from './PostContainer';
import NewPost from './NewPost.js';
import LoginPage from './LoginPage';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/posts/:id">
        <PostContainer />
      </Route>
      <PrivateRoute exact path="/new">
        <NewPost />
      </PrivateRoute>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
};

export default Routes;