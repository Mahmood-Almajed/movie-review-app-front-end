import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as movieService from '../../services/movieService';

const ReviewForm = (props) => {
  
  const [formData, setFormData] = useState({
  text: '' ,
  rating:0

});

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
        props.handleAddReview(formData);
    
    setFormData({
        text: '' ,
        rating:0
      
      });
  };


  
  return (
    <form onSubmit={handleSubmit}>
        
      <label htmlFor="text-input">Your review:</label>
      <textarea
        required
        type="text"
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
      />
     <label htmlFor="number-input">Rate:</label>
      <input 
        required
        type="number"
        name="rating"
        id="number-input"
        value={formData.rating}
        onChange={handleChange}
      />


      <button type="submit">SUBMIT</button>
    </form>
  );
};

export default ReviewForm;