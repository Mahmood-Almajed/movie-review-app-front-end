import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import * as movieService from '../../services/movieService';

const ReviewForm = (props) => {
  const { movieId, reviewId } = useParams();
  const [formData, setFormData] = useState({
    text: '',
    rating: 0,
  });

  const navigate = useNavigate();

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
      text: '',
      rating: 0,
    });
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await movieService.show(movieId);
      setFormData(movieData.reviews.find((review) => review._id === reviewId));
    };
    if (movieId && reviewId) fetchMovie();
  }, [movieId, reviewId]);

  return (
    <div className="container mt-5" id="Review-input">
              
        {reviewId ? (<h1 style={{color:'black'}}>Edit review</h1>) : (<h1>Add New Review</h1>)}
      
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text-input">Your review:</label>
          <textarea
            required
            type="text"
            name="text"
            id="text-input"
            className="form-control"
            rows="3"
            value={formData.text}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="number-input">Rate:</label>
          <input
            required
            type="number"
            min="0" 
            max="10"
            name="rating"
            id="number-input"
            className="form-control"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
        {reviewId ? "Update review" : "Add Review"}

          
        </button>
        
      </form>
    </div>
  );
};

export default ReviewForm;