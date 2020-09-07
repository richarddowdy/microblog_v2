import React from 'react';
import { useSelector } from 'react-redux';


function UserProfile({ user }) {
  // const CurrentUser = useSelector((st) => (st.user))
  return (
    <div>
      <h2>{username}'s Profile</h2>
      {/* Users info? email? bio? about? */}
      <h2>Posts Made by {username}</h2>
      {userPosts ? (
        userPosts.map((post) => {
          return (
            <TitleCard />
          )
        })
      ) :(
        null
      )}
    </div>
  )
}

export default UserProfile;