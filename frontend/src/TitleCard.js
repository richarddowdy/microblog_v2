import React from "react";
import { Link } from "react-router-dom";
import Votes from "./Votes";

function TitleCard({ id, title, description, votes }) {
  return (
    <div className="card m-3" style={{ width: "28rem" }}>
      <div className="card-body p-0">
        <Link
          to={`/posts/${id}`}
          className="card-title font-large p-4"
          style={{ fontSize: "32px" }}
        >
          {title}
        </Link>
        <h6 className="card-subtitle text-muted p-4">{description}</h6>
        <div className="card-footer pl-4">
          <Votes className="" postId={id} votes={votes} />
        </div>
      </div>
    </div>
  );
}

export default TitleCard;
