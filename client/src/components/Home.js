import React from 'react';
import WatchedRepos from './repos/watchedRepos';

const Home = () =>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <WatchedRepos />
        </div>
        <div className="col-md-8 repo-list">
          list of repos
        </div>
      </div>
    </div>
;

export default Home;
