import React from 'react';
import PersonalRepo from './PersonalRepo';
import WatchedRepos from './WatchedRepos';
import Report from './Report';
import OrgRepo from './OrgRepo';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      tabs: {
        one: { head: '', body: 'tab-pane fade' },
        three: { head: 'active', body: 'tab-pane fade in active' }
      }
    };
    this.setActiveTab = this.setActiveTab.bind(this);
  }

  setActiveTab() {
    const tabs = this.state.tabs;
    if (!this.props.watchedRepos.length) {
      tabs.one.head = 'active';
      tabs.one.body = 'tab-pane fade in active';
      tabs.three.head = '';
      tabs.three.body = 'tab-pane fade';
    }
    this.setState({ tabs });
  }

  render() {
    const tabs = this.state.tabs;
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
              <li className={tabs.one.head} ><a data-toggle="tab" href="#your-repo">Your Repositories</a></li>
              <li><a data-toggle="tab" href="#org-repo">Organisation Repos</a></li>
              <li className={tabs.three.head}><a data-toggle="tab" href="#report">Reports</a></li>
            </ul>
            <div className="tab-content">
              <div id="your-repo" className={tabs.one.body}>
                <PersonalRepo />
              </div>
              <div id="org-repo" className="tab-pane fade">
                <OrgRepo />
              </div>
              <div id="report" className={tabs.three.body}>
                <Report />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  watchedRepos: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    watchedRepos: state.watchedRepos.data
  };
}

export default connect(mapStateToProps)(Home);
