import React, { useState } from "react";
import { Link } from "react-router-dom";

function PostForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
    comments: [],
  });

  const handleChange = (evt) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  return (
    <div className="">
      <form className="col-8 m-auto">
        <hr />
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            className="form-control"
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <textarea
            style={{height: "150px"}}
            className="form-control"
            type="text"
            name="body"
            id="body"
            value={formData.body}
            onChange={handleChange}
          />
        </div>
        <input
          className="btn btn-primary"
          type="submit"
          value="Save"
          // onSubmit={handleSubmit}
        />
        <Link to="/" className="btn btn-secondary ml-5">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default PostForm;
