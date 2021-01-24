import React from 'react';
import TitleList from './TitleList';

function Home({profile}){

  function WelcomeMessage(){
    return (
      <div className="text-center">
        <h2 className="m-3">Welcome to <strong>Microblog</strong> where you can share your post.</h2>
        <p className="m-3">Share your posts but please be kind!</p>
      </div>
    )
  }

  return (
    <div >
      {profile ? <h2 className="m-3 text-center">Posts by <strong>{profile}</strong>.</h2> : <WelcomeMessage />} 
      <TitleList profile={profile}/>
    </div>
  )
};

export default Home;