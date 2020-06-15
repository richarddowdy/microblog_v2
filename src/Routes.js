import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Home } from './Home';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      {/* <Route exact path="/posts/:id">
        <Post />
      </Route>
      <Route exact path="/new">
        <AddPostForm />
      </Route>
      <Route exact path="/edit/:id">
        <EditPostForm />
      </Route> */}
      {/* <Route>
        <NotFound />
      </Route> */}
    </Switch>
  )
};

export default Routes;