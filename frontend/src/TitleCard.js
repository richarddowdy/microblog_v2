import React from "react";
import { Link } from 'react-router-dom';

function TitleCard({ id, title, description }) {
  return (
    <div className="card m-3 " style={{ width: "28rem" }}>
      <div className="card-body">
        <Link to={`/posts/${id}`} className="card-title font-large" style={{ fontSize: "24px"}}>{title}</Link>
        <h6 className="card-subtitle mt-2 text-muted">{description}</h6>
      </div>
    </div>
  );
}

export default TitleCard;
