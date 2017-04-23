import React from 'react';
import AddRepos from './AddRepos';
import WatchedRepos from './repos/watchedRepos';

const Home = () =>
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-3">
        <WatchedRepos />
      </div>
      <div className="col-md-8">
        <AddRepos />
      </div>
    </div>
  </div>;

export default Home;
