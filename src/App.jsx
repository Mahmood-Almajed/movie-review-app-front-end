
import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice
import * as movieService from '../src/services/movieService';
import MoviesList from './components/MovieList/MovieList';

export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

  const [movies ,setMovies] =useState([])
  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };



  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const moviesData = await movieService.index();
        setMovies(moviesData);
      } catch (error) {
        console.error(error);
      }
    };
  
    if (user) {
      fetchAllMovies();
    }
  }, [user]); 

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <NavBar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
            <Route path="/" element={<Dashboard user={user} />} />
            <Route path="/movies" element={<MoviesList movies={movies}/> } />

            </>
            
          ) : (
            <Route path="/" element={<Landing />} />
          )}
          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
