import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useParams } from "react-router";
import ProfileForm from "./ProfileForm";

function UserProfile() {
  const currentUser = useSelector((st) => st.user);
  const userId = useParams().id;

  // prettier-ignore
  if (!currentUser.id || (Number(userId) !== currentUser.id)) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <h2 className="m-3 text-center">Your Profile</h2>
      <ProfileForm userId={userId} />
    </>
  );
}

export default UserProfile;
