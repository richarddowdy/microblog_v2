import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "./TitleCard";
import { getAllTitlesFromApi } from "./actionCreators";

function TitleList() {
  const dispatch = useDispatch();

  const titles = useSelector((st) => st.titles);

  useEffect(() => {
    async function fetchAllTitles() {
      dispatch(getAllTitlesFromApi());
    }
    fetchAllTitles();
  }, [dispatch]);

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
