import { useState, useEffect } from "react";
import * as movieService from '../../services/movieService';
import { useParams } from 'react-router-dom';

const MovieForm =(props)=>{
  const { movieId } = useParams();
const [formData,setFormData]=useState({
    title:'',
    poster:'',
    genre:'',
    description:'',
    director:'',
    releaseDate:''

});

const handleChange =(e)=>{
setFormData({...formData, [e.target.name]:e.target.value})

}
const handleSubmit = (evt) => {
  evt.preventDefault();
  if (movieId) {
      props.handleUpdateMovvie(movieId, formData)
  
  } else {
    props.handleAddMovie(formData);
  }
};

useEffect(() => {
  const fetchMovie = async () => {
  const movieData = await movieService.show(movieId);
  setFormData(movieData);
};
  if (movieId) fetchMovie();
}, [movieId]);


return(
    <main>
      <form onSubmit={handleSubmit}>
      <h1>{movieId ? 'Edit Movie' : 'New Movie'}</h1>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} />

        <label htmlFor="psoter">Poster:</label>
        <input type="text" name="poster" id="poster" value={formData.poster} onChange={handleChange}/>

        <label htmlFor="genre">Genre:</label>
        <select name="genre" id="genre" value={formData.genre} onChange={handleChange} >
            <option disabled></option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
            
        </select>        
        <label htmlFor="description">Description:</label>
        <textarea
        required
        type="text"
        name="description"
        id="description"
        value={formData.description}
        onChange={handleChange}
      />     
        <label htmlFor="director">Director:</label>   
        <input type="text" name="director" id="director" value={formData.director} onChange={handleChange} />    
        
        <label htmlFor="releaseDate">Release Date:</label>
        <input type="Date" name="releaseDate" id="releaseDate" value={formData.releaseDate} onChange={handleChange} />
    


        
        





                <button type="submit">SUBMIT</button>

        </form>  

    </main>

)


}

export default MovieForm