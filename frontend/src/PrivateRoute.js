import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function PrivateRoute({ exact, path, children }) {
  const currentUser = useSelector((st) => st.user);
  // console.log("protected routes", currentUser);
  if (!currentUser.id) {
    return <Redirect to="/login" />;
  }

  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}

export default PrivateRoute;
