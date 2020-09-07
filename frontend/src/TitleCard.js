import React from "react";
import { Link } from "react-router-dom";
import Votes from "./Votes";
import "./TitleCard.css";

function TitleCard({ id, title, description, votes, author, userId }) {
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
        <br />
        <div className="pl-4">
          Author:
        <Link
            to={`/users/${userId}`}
            className="pl-2"
            style={{ fontSize: "20px", color: "darkgray" }}
          >
            {author}
          </Link>
        </div>
        <h6 className="card-subtitle text-muted p-4">{description}</h6>
        <div className="card-footer pl-4">
          <Votes className="" postId={id} votes={votes} />
        </div>
      </div>
    </div>
  );
}

export default TitleCard;
