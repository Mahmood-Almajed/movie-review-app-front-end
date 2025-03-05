import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
    <main className='dashboard'>
      <h1>Welcome, {user.username}</h1>
        <h2>
       <p>Your dashboard is your space to explore ,review, and organize your movie journey </p> 
       <p>Ready to dive in? Start exploring now!</p>
      </h2>
      <img src="/logo.png" alt="logo" className='Movie-Logo'/>
    </main>
  );
};

export default Dashboard;
