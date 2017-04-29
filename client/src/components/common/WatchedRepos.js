import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserRepos } from '../../actions/repoActions';
import RepoDetails from '../common/RepoDetails';

class WatchedRepos extends React.Component {
  constructor(props) {
    super();
    this.handleCheckboxCheck = this.handleCheckboxCheck.bind(this);
  }

  componentDidMount() {
    this.props.fetchUserRepos(this.props.user.id);
    const { isFetching } = this.props.repos;
  }

  handleCheckboxCheck(e) {
    e.preventDefault;
    //implement functionality to handle this
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
              onChange={this.handleCheckboxCheck}
            />
          </div>
          <div className="col-md-8">
            <span><strong>{repo.name}</strong></span>
          </div>
          <div className="col-md-2 text-right">
            <button className="btn btn-link icon-lg" type="button" onClick={(e) => {
              e.preventDefault();
              let repoToEdit;
              if (this.props.personalRepos.data[0].full_name.split('/')[0] === repo.name.split('/')[0]) {
                repoToEdit = this.props.personalRepos.data.filter(pRepo => repo.name === pRepo.full_name)[0];
              } else {
                repoToEdit = this.props.orgRepos.data.filter(pRepo => repo.name === pRepo.full_name)[0];
              }  
              this.props.handleEditButtonState(true, repoToEdit);
            }} >
              <span className="glyphicon glyphicon-cog"></span>
            </button>
          </div>
        </div>
        <div className="row" style={{ marginTop: '1em' }}>
          <div className="col-md-8 col-md-offset-2">
            <span>
              Last Report:&nbsp;
              {repo.lastReportDate ? repo.lastReportDate.split('T')[0] : ''}
            </span>
            <br />
            <span>PRs Since Last Update: {}</span>
          </div>
          <div className="col-md-2 text-right">
            <button className="btn btn-link icon-lg" type="button">
              <span className="glyphicon glyphicon-trash"></span>
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
      <form className="form-inline">
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
              <div className="col-md-2 text-center">
                <button className="btn btn-link" type="button">
                  <span className="glyphicon glyphicon-plus"></span>
                </button>
              </div>
              {this.renderReposList()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

WatchedRepos.propTypes = {
  fetchUserRepos: React.PropTypes.func,
  user: React.PropTypes.object,
  repos: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user.data.github,
    repos: state.watchedRepos,
    personalRepos: state.allRepos.personalRepos,
    orgRepos: state.allRepos.orgRepos
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUserRepos }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WatchedRepos);
