import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "./TitleCard";
import axios from "axios";
import { BASE_API_URL } from "./actionCreators";
import { useParams } from "react-router";
import CommentsForm from "./CommentsForm";

function UserProfile({}) {
  let userId = useParams().id;
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    Comments: [],
    posts: [],
  });
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    async function fetchUserInformation() {
      let result = await axios.get(`${BASE_API_URL}/users/${userId}`);
      console.log(result);
      setUserData(result.data);
    }
    async function fetchUserTitles(userId) {
      let result = await axios.get(`${BASE_API_URL}/posts`);
      console.log("USER TITLES QUERY", result.data, typeof userId, userId);
      let usersPosts = result.data.filter((p) => p.user_id === Number(userId));
      console.log("THIS PERSON'S POSTS", usersPosts);
      setUserPosts(usersPosts);
    }
    fetchUserInformation();
    fetchUserTitles(userId);
  }, []);

  const { username, posts } = userData;
  console.log("PROFILE DATA", userData, posts);
  return (
    <>
      <h2 className="m-3">{username}'s Profile</h2>
      <h2 className="m-3">Posts Made by {username}</h2>
      <div className="d-flex flex-wrap justify-content-around">
        {/* Users info? email? bio? about? */}
        {userPosts.length
          ? userPosts.map((p) => {
              return (
                <TitleCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  description={p.description}
                  votes={p.votes}
                  author={p.username}
                  userId={p.user_id}
                />
              );
            })
          : null}
      </div>
    </>
  );
}

export default UserProfile;
