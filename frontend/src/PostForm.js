import React, { useState } from "react";

function PostForm({ post, save, cancel }) {

  
  const [formData, setFormData] = useState({
    title: post.title,
    description: post.description,
    body: post.body,
  });

  const handleChange = (evt) => {
    evt.preventDefault();
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    save(formData);
  };

  return (
    <div className="">
      <form className="col-8 m-auto" onSubmit={handleSubmit}>
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
        <button className="btn btn-primary">Save</button>
        <button onClick={cancel} className='btn btn-secondary ml-5'>Cancel</button>
      </form>
    </div>
  );
}

export default PostForm;
