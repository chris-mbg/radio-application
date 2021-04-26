import { useEffect } from 'react';

const UserPage = () => {

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div>
      <h1>This is the user page 😇 </h1>
    </div>
  );
}

export default UserPage;