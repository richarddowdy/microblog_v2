import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TitleCard from './TitleCard';
import Post from './Post';

function TitleList(){
  // const dispatch = useDispatch();
  
  // let posts = useSelector((st) => { st.posts })

  // useEffect(() => {
  //   async function fetchAllPosts(){
  //     dispatch(getAllTitlesFromApi()); *** TODO ***
  //   }
  // },[dispatch])

  return (
    <div className="d-flex flex-wrap justify-content-around">
      {/* { loadSuccess ? posts.map(post => {
        return <TitleCard id={post.id} title={post.title} description={post.description}/>
      }): 
      <h2>Loading...</h2>
      } */}

      <TitleCard />
      <TitleCard />
      <TitleCard />
      <TitleCard />
      <TitleCard />
      <TitleCard />
      <TitleCard />
      <TitleCard />
      <TitleCard />
      <TitleCard />
      <TitleCard />
      <TitleCard />
      <TitleCard />
    </div>
  )
}

export default TitleList;