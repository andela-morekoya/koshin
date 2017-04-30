import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RepoDetails from '../common/RepoDetails';
import { fetchPersonalRepos } from '../../actions/repoActions';

class PersonalRepo extends React.Component {
  constructor() {
    super();
    this.fetchRepos = this.fetchRepos.bind(this);
  }

  componentDidMount() {
    this.fetchRepos();
  }

  fetchRepos() {
    const user = this.props.user.github;
    this.props.fetchPersonalRepos(user.login, this.props.user.local.personalAccessToken);
  }

  displayBody() {
    const { isFetching, data } = this.props.personalRepos;
    const isLoading = (<div>
      <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
    </div>);
    if (isFetching) {
      return isLoading;
    }
    if (data && !data.length) {
      return (<div style={{width: '100%', height: '50%'}}>
        No repository was found.
        <div className="btn btn-default btn-lg" style={{margin: 'auto'}} onClick={this.fetchRepos}>
          <i className="fa fa-refresh" aria-hidden="true"></i>
          Refresh
        </div>
      </div>);
    }
    return data.map((item, index) => <RepoDetails key={item.id} repo={item} />);
  }

  render() {
    return (
      <div className="panel panel-default">
        {this.displayBody()}
      </div>
    );
  }
}

PersonalRepo.propTypes = {
  personalRepos: React.PropTypes.object,
  fetchPersonalRepos: React.PropTypes.func,
  user: React.PropTypes.object
};

function mapStateToProps(state) {
  return {
    user: state.user.data,
    personalRepos: state.allRepos.personalRepos
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchPersonalRepos
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalRepo);
