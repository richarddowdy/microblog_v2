import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import PostContainer from "./PostContainer";
import UserProfile from "./UserProfile";
import NewPost from "./NewPost.js";
import LoginPage from "./LoginPage";
import NotFound from "./NotFound";
import PrivateRoute from "./PrivateRoute";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Routes() {
  const profile = useQuery().get("profile");

  return (
    <Switch>
      <Route exact path="/">
        <Home profile={profile} />
      </Route>
      <Route exact path="/posts/:id">
        <PostContainer />
      </Route>
      <Route exact path="/user/:id">
        <UserProfile />
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
  );
}

export default Routes;
