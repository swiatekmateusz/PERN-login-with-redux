import React, { useEffect } from 'react';
import { connect } from 'react-redux'

const Home = ({ auth: { user } }) => {
  useEffect(() => {
    console.log("zamontowano");
  }, []);

  return (
    <main>
      <h1>Home Page</h1>
      <h2>Hello {user.name}</h2>
    </main>
  )
};

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, {})(Home);