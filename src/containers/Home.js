import React from 'react';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

function Home() {
  return (
    <section>
      <h1>Welcome Home</h1>
      <Signup />
      <Login />
    </section>
  );
}

export default Home;
