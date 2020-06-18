import React, { useState } from 'react';

function CommentsForm({ id, addComment }){
  
  const [formData, setFormData] = useState({
    id,
    comment: "",
  });

  function handleChange(evt){
    evt.preventDefault();
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }))
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

  }


  return (
  <div>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input 
          className="form-control" 
          type="text" 
          name="comment" 
          id="commentInput" 
          value={formData.comment} 
          onChange={handleChange}
          placeholder="New Comment" 
        />
      </div>
      <button
        type="submit" 
        className="btn btn-primary"
      >Add</button>
    </form>
  </div>
  )
}

export default CommentsForm;