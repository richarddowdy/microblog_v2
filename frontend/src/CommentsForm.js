import React, { useState } from 'react';

function CommentsForm({ postId, addComment }){
  
  const INITIAL_FORM_STATE = {
    postId,
    text: "",
  }

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

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
    addComment(formData);
    setFormData(INITIAL_FORM_STATE);
  }


  return (
  <div className="mb-4">
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="form-group">
        <input 
          className="form-control" 
          type="text" 
          name="text" 
          id="commentInput" 
          value={formData.text} 
          onChange={handleChange}
          placeholder="New Comment" 
          required
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