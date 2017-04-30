import React from 'react';
import PersonalRepo from './PersonalRepo';
import WatchedRepos from './WatchedRepos';
import Report from './Report';
import OrgRepo from './OrgRepo';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const Home = (props) => {
  const tabOneHead = props.watchedRepos.length < 1 ? 'active' : '';
  const tabThreeHead = props.watchedRepos.length > 0 ? 'active' : '';

  const tabOneBody = props.watchedRepos.length < 1 ? 'in active' : '';
  const tabThreeBody = props.watchedRepos.length > 0 ? 'in active' : '';

  return (
    <div className="container-fluid container-fluid-main">
      <div className="row">
        <div className="col-md-3">
          <WatchedRepos />
        </div>
        <div className="col-md-9">
          <Link to="/settings">
            <div style={{ float: 'right', fontSize: '18px', cursor: 'pointer' }} >
              Settings <i className="fa fa-cog" aria-hidden="true" style={{ fontSize: '30px', verticalAlign: 'middle' }}></i>
            </div>
          </Link>
          <ul className="nav nav-tabs">
            <li className={tabOneHead} ><a data-toggle="tab" href="#your-repo">Your Repositories</a></li>
            <li><a data-toggle="tab" href="#org-repo">Organisation Repos</a></li>
            <li className={tabThreeHead}><a data-toggle="tab" href="#report">Reports</a></li>
          </ul>
          <div className="tab-content">
            <div id="your-repo" className={`tab-pane fade ${tabOneBody}`}>
              <PersonalRepo />
            </div>
            <div id="org-repo" className="tab-pane fade">
              <OrgRepo />
            </div>
            <div id="report" className={`tab-pane fade ${tabThreeBody}`}>
              <Report />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  watchedRepos: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    watchedRepos: state.watchedRepos.data
  };
}

export default connect(mapStateToProps)(Home);
