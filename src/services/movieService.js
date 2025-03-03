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
  
  export {
    index,
    
    show,
  };
  
