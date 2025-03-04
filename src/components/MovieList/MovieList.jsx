import { Link } from 'react-router-dom';

const MovieList = (props) => {
  return (
    <main className="container py-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {props.movies.map((movie) => (
          <div key={movie._id} className="col">
            <div className="card h-100 shadow-sm">
              <img 
                src={movie.poster || 'https://via.placeholder.com/286x180'} 
                className="card-img-top"
                alt={movie.title}
                style={{ height: '400px', objectFit: 'fill' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">{movie.title}</h5>
                <p className="card-text text-muted small mb-2">
                  Posted by {movie.author?.username} • {new Date(movie.createdAt).toLocaleDateString()}
                </p>
                <p className="card-text line-clamp-3">{movie.text}</p>
                <div className="mt-auto">
                  <Link 
                    to={`/movies/${movie._id}`} 
                    className="btn btn-primary stretched-link"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MovieList;
