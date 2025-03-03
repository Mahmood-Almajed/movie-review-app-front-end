const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/movies`;

//index movieList
const index = async () => {
    try {
      const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


  const show = async (movieId) => {
    try {
      const res = await fetch(`${BASE_URL}/${movieId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };


  const create = async (movieFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };
  

  const deleteMovie = async (movieId) => {
    try {
      const res = await fetch(`${BASE_URL}/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        }
       
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };











  const createReview = async (movieId, reviewFormData) => {
    try {
      const res = await fetch(`${BASE_URL}/${movieId}/reviews`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  async function update(movieId, movieFormData) {
    try {
      const res = await fetch(`${BASE_URL}/${movieId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  }
  
  export {
    index,
    show,
    create,
    createReview,
    deleteMovie,
    update,
  };
  
