import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchUserRepos, updateRepoInfo, deleteWatchedRepo } from '../../actions/repoActions';

class WatchedRepos extends React.Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.fetchUserRepos(this.props.user.id);
    const { isFetching } = this.props.repos;
  }

  repoInfo(repo) {
    return (
      <li className="list-group-item" key={repo.id}>
        <div className="row">
          <div className="col-md-2">
            <input
              className="icon-lg"
              type="checkbox"
              defaultChecked={repo.report}
              onChange={() => {
                repo.report = !repo.report;
                this.props.updateRepoInfo(repo);
              }}
            />
          </div>
          <div className="col-md-8">
            <span><strong>{repo.name}</strong></span>
          </div>
        </div>
        <div className="row" style={{ marginTop: '1em' }}>
          <div className="col-md-8 col-md-offset-2">
            <span>
              Last Report:&nbsp;
              {repo.lastReportDate ? repo.lastReportDate.split('T')[0] : ''}
            </span>
          </div>
          <div className="col-md-2 text-right">
            <button className="btn btn-link icon-lg" type="button" onClick={(e) => {
              e.preventDefault();

              const token = this.props.localDetails.personalAccessToken;

              return this.props.deleteWatchedRepo(repo, token);
            }} >
              <span className="glyphicon glyphicon-trash red" style={{ color: 'red' }} ></span>
            </button>
          </div>
        </div>
      </li>
    );
  }

  renderReposList() {
    const repos = this.props.repos.data;
    let reposList;
    if (repos.length > 0) {
      reposList = repos.map((repo) => this.repoInfo(repo));
    } else {
      reposList = <div> You have no watched repos. Please add a repo </div>;
    }
    return (
      <div className="col-md-12">
        <ul className="list-group">
          {reposList}
        </ul>
      </div>
    );

  }

  watchedRepoSearch() {
    return (
      <form className="form-inline" style={{display:'none'}}>
        <div className="form-group" style={{ width: '100%' }}>
          <div className="input-group" style={{ width: '100%' }}>
            <input
              type="text"
              className="form-control rounded"
              placeholder="Search..."
              style={{ height: '3em' }}
            />
            <div className="input-group-addon">
              <button className="btn btn-link" type="submit">
                <span className="glyphicon glyphicon-search"></span>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div className="watched">
        <div className="panel-body">
          {this.watchedRepoSearch()}
          <div className="watched-repos">
            <div className="row">
              <div className="col-md-10">
                <h4>Repositories to Watch</h4>
              </div>
              {this.renderReposList()}
            </div>
          </div>
        </div>
      </div >
    );
  }
}

WatchedRepos.propTypes = {
  fetchUserRepos: React.PropTypes.func,
  updateRepoInfo: React.PropTypes.func,
  user: React.PropTypes.object,
  repos: React.PropTypes.object,
  deleteWatchedRepo: React.PropTypes.func,
  localDetails: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user.data.github,
    localDetails: state.user.data.local,
    repos: state.watchedRepos
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUserRepos,
    updateRepoInfo,
    deleteWatchedRepo
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchedRepos);
