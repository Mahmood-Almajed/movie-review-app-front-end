import { useState, useEffect } from "react";
import * as movieService from "../../services/movieService";
import { useParams, Link } from "react-router-dom";

const MovieForm = (props) => {
  const { movieId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    poster: "",
    genre: "",
    description: "",
    director: "",
    releaseDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    movieId
      ? props.handleUpdateMovie(movieId, formData)
      : props.handleAddMovie(formData);
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await movieService.show(movieId);
      setFormData(movieData);
    };
    if (movieId) fetchMovie();
  }, [movieId]);

  return (
    <>
      <h1 className="text-center">
        {movieId ? "Edit Movie" : "Add New Movie"}
      </h1>
      <div className="form-div">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="poster" className="form-label">
            Poster URL:
          </label>
          <input
            type="text"
            className="form-control"
            name="poster"
            id="poster"
            value={formData.poster}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre:
          </label>
          <select
            className="form-select"
            name="genre"
            id="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Genre
            </option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="director" className="form-label">
            Director:
          </label>
          <input
            type="text"
            className="form-control"
            name="director"
            id="director"
            value={formData.director}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="releaseDate" className="form-label">
            Release Date:
          </label>
          <input
            type="date"
            className="form-control"
            name="releaseDate"
            id="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex gap-3">
          <button type="submit" className="btn btn-primary flex-grow-1">
            {movieId ? "Update" : "Submit"}
          </button>
          <Link to="/movies" className="btn btn-secondary flex-grow-1">
            Go Back
          </Link>
        </div>
      </form>
      </div>
    </>
  );
};

export default MovieForm;