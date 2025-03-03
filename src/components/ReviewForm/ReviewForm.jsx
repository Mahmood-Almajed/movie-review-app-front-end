import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import * as movieService from '../../services/movieService';

const ReviewForm = (props) => {
  const { movieId, reviewId } = useParams();
  const [formData, setFormData] = useState({
  text: '' ,
  rating:0

});

const navigate = useNavigate()

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (movieId && reviewId) {
        movieService.updateReview(movieId, reviewId, formData);
        navigate(`/movies/${movieId}`);
      } else {
        props.handleAddReview(formData);
      }
        
    
    setFormData({
        text: '' ,
        rating:0
      
      });
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await movieService.show(movieId);
      // Find comment in fetched movie data
      setFormData(movieData.reviews.find((review) => review._id === reviewId));
    };
    if (movieId && reviewId) fetchMovie();
  }, [movieId, reviewId]);
  
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