import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "./TitleCard";
import { getAllTitlesFromApi } from "./actionCreators";

function TitleList({ profile }) {
  const dispatch = useDispatch();

  let titles = useSelector((st) => st.titles);

  useEffect(() => {
    async function fetchAllTitles() {
      // console.log("fetching");
      dispatch(getAllTitlesFromApi());
    }
    fetchAllTitles();
  }, [dispatch]);

  if (profile) {
    titles = titles.filter((post) => post.username === profile);
    return (
      <div className="d-flex flex-wrap justify-content-around">
        {titles.length ? (
          titles.map((p) => {
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
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    );
  }

  return (
    <div className="d-flex flex-wrap justify-content-around">
      {titles.length ? (
        titles.map((p) => {
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
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default TitleList;
