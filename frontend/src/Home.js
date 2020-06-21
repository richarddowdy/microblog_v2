import React from 'react';
import TitleList from './TitleList';

function Home(){
  return (
    <div className="">
      <h3 className="m-3">Welcome to <strong>Microblog</strong> where you can share your post.</h3>
      <TitleList />
    </div>
  )
};

export default Home;