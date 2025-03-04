import { useState, useEffect ,useContext } from 'react';
import * as movieService from '../../services/movieService';
import { useParams } from 'react-router-dom';
import ReviewForm from '../ReviewForm/ReviewForm';
import { AuthedUserContext } from '../../App';
import {Link} from 'react-router-dom';
import {useNavigate } from 'react-router-dom';


const MovieDetails = (props) => {
  const { movieId ,reviewsID} = useParams();
  console.log('movieId', movieId);
  const [movie, setMovie] = useState(null); 
  const user = useContext(AuthedUserContext);
  const nav= useNavigate()
    


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

      const handleDeleteReview = async (movieId,reviewsID) => {
        const deletedReview=await movieService.deleteReview(movieId,reviewsID)
        setMovie({...movie,reviews: movie.reviews.filter((review) => review._id !== deletedReview._id)
          
        });
        const updatedMovie = await movieService.show(movieId);
        setMovie(updatedMovie);
        nav(`/movies/${movie._id}`)
      };
      
      if (!movie) return <main>Loading...</main>;

    return (

        <main className='Detail-Container'>
    <header>
      <h1>{movie.title}</h1>
      <p>Genre: {movie.genre.toUpperCase()}</p>
      <p>
        {movie.author.username} posted on {new Date(movie.createdAt).toLocaleDateString()}
        
      </p>
    </header>
    <p>Description: {movie.description}</p>
    {movie.releaseDate ? (
  <p>Release Date: {movie.releaseDate.split('T')[0]}</p>) : null}
    {movie.author._id===user._id && (<>
      <Link to={`/movies/${movieId}/edit`} class="btn btn-warning">Edit</Link>
    <button onClick={()=>props.handleDeleteMovie(movieId)} class="btn btn-danger">Delete</button>
    
    </>)}
    <section>
      {/*<h2>Reviews</h2>*/}
      
      {/*<ReviewForm handleAddReview={handleAddReview}/>*/}
      {/*!movie.reviews.length && <p>There are no reviews.</p>*/}
    
      {/*---------------------------*/}
      <div className="Review-Details">
      <div class="card">
  <div class="card-header">
  Reviews
  </div>
  <div class="card-body">
    <blockquote class="blockquote mb-0">
    {!movie.reviews.length && <p>There are no reviews.</p>}
    {movie.reviews.map((review) => (
    <article key={review._id}>
      <header>
        <p>
          {review.author.username} posted on {' '}
          {new Date(review.createdAt).toLocaleDateString()}  
        </p>
      </header>
      <p>Review: {review.text}</p>
      <p>Rating: {review.rating}</p>
      {review.author._id===user._id &&  (<>
        <Link to={`/movies/${movieId}/reviews/${review._id}/edit`}>
        <button type="button" class="btn btn-primary">Edit</button>
        </Link>
    <button type="button" class="btn btn-danger" onClick={()=>handleDeleteReview(movie._id,review._id)}>Delete</button>
    
    </>)}
    </article>
  ))}
    </blockquote>
  </div>
</div>
</div>
<ReviewForm handleAddReview={handleAddReview}/>
      
      

  
    </section>
  </main>

    )
  };
  
  export default MovieDetails;
