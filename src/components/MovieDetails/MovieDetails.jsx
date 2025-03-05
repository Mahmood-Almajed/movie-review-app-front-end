import { useState, useEffect ,useContext } from 'react';
import * as movieService from '../../services/movieService';
import { useParams } from 'react-router-dom';
import ReviewForm from '../ReviewForm/ReviewForm';
import { AuthedUserContext } from '../../App';
import {Link} from 'react-router-dom';
import {useNavigate } from 'react-router-dom';


const MovieDetails = (props) => {
  const { movieId ,reviewsID} = useParams();
  const [movie, setMovie] = useState(null); 
  const user = useContext(AuthedUserContext);
  const nav= useNavigate()
    


    useEffect(() => {
        const fetchMovie = async () => {
          const movieData = await movieService.show(movieId);
          setMovie(movieData);
        };
        fetchMovie();
      }, [movieId]);
      
      

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

        <main className='Detail-Container' style={{backgroundImage: `url(${movie.poster})`}}>
            <div className="movie-content">
            <header>
                 <h1 style={{color: 'white'}}>{movie.title}</h1>
                 <p style={{color: 'white'}}>Genre: {movie.genre.toUpperCase()}</p>
            </header>

            <p style={{color: 'white'}}>Description: {movie.description}</p>
            {movie.releaseDate ? (
               <p style={{color: 'white', margin: '10px'}}>Release Date: {movie.releaseDate.split('-')[0]}</p>) : null}

            <div className='buttons'>
                {movie.author._id===user._id && (<>
                     <Link to={`/movies/${movieId}/edit`} className="btn btn-warning">Edit</Link>
                     <button onClick={()=>props.handleDeleteMovie(movieId)} className="btn btn-danger">Delete</button>
                </>)}
            </div>

            <section>

                <div className="Review-Details">
                   <div className="card" id='card-details'>
                      <div className="card-header">
                          Reviews
                      </div>
                     
                        <div className="card-body">
                          <blockquote className="blockquote mb-0">
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
                                    
                                    {[...Array(review.rating)].map((_, index) => (
                                         <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-star" viewBox="0 0 16 16" key={index}>
                                              <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z"/>
                                         </svg>   
                                     ))}


                                    <div className='buttons'>
                                      {review.author._id===user._id &&  (<>
                                            <Link to={`/movies/${movieId}/reviews/${review._id}/edit`}>
                                                <button type="button" className="btn btn-warning">Edit</button>
                                            </Link>
                                            <button type="button" className="btn btn-danger" onClick={()=>handleDeleteReview(movie._id,review._id)}>Delete</button>
                                       </>)}
                                    </div>
                                   <hr />

                                  </article>
    
                              ))}
                          </blockquote>
                        </div>
                    </div>
                 </div>
                 <ReviewForm handleAddReview={handleAddReview}/>
      
      

  
            </section>
          </div>
         </main>

    )
  };
  
  export default MovieDetails;
