import { useState, useEffect ,useContext } from 'react';
import * as movieService from '../../services/movieService';
import { useParams } from 'react-router-dom';
import ReviewForm from '../ReviewForm/ReviewForm';
import { AuthedUserContext } from '../../App';

const MovieDetails = (props) => {

    const { movieId } = useParams();
    console.log('movieId', movieId);///////
    const [movie, setMovie] = useState(null); 
    const user = useContext(AuthedUserContext);



    useEffect(() => {
        const fetchMovie = async () => {
          const movieData = await movieService.show(movieId);
          console.log('movieData', movieData);
          setMovie(movieData);
        };
        fetchMovie();
      }, [movieId]);
      
      // Verify that movie state is being set correctly:
      console.log('movie state:', movie);

      const handleAddReview = async (reviewFormData) => {
        const newReview = await movieService.createReview(movieId, reviewFormData);
        setMovie({ ...movie, reviews: [...movie.reviews, newReview] });
      };
      if (!movie) return <main>Loading...</main>;

    return (

        <main>
    <header>
      <p>{movie.genre.toUpperCase()}</p>
      <h1>{movie.title}</h1>
      <p>
        {movie.author.username} released on
        {new Date(movie.createdAt).toLocaleDateString()}{/*  */}
      </p>
    </header>
    <p>{movie.description}</p>
    <section>
      <h2>Reviews</h2>
      <ReviewForm handleAddReview={handleAddReview}/>
      {!movie.reviews.length && <p>There are no reviews.</p>}

  {movie.reviews.map((review) => (
    <article key={review._id}>
      <header>
        <p>
          {review.author.username} posted on
          {new Date(review.createdAt).toLocaleDateString()} {/*   */}
        </p>
      </header>
      <p>{review.text}</p>
      <p>{review.rating}</p>
    </article>
  ))}
    </section>
  </main>

    )
  };
  
  export default MovieDetails;
