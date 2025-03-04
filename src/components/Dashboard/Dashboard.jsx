import { AuthedUserContext } from '../../App';
import { useContext } from 'react';

const Dashboard = ({}) => {
  const user = useContext(AuthedUserContext);
  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <h3>
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </h3>
    </main>
  );
};

export default Dashboard;
