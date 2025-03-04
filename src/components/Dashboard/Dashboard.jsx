import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <h3>
      Your dashboard is your space to explore, review, and organize your movie journey. Ready to dive in? Start exploring now!
      </h3>
    </main>
  );
};

export default Dashboard;
