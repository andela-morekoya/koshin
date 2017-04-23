import React from 'react';
import { Link } from 'react-router';
import RepoDetails from './common/RepoDetails';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRepos } from '../actions/userActions';

class AddRepos extends React.Component {

  componentDidMount() {
    const user = this.props.user;
    this.props.fetchRepos(user.login);
  }

  displayBody() {
    const { isFetching, data } = this.props.allRepos;
    const isLoading = <div>
      <i className="fa fa-spinner" aria-hidden="true"></i>
    </div>;
    if (isFetching) {
      return isLoading;
    }
    if (data && !data.length) {
      return isLoading;
    }
    return data.map((item, index) => <RepoDetails key={item.id} repo={item} className={index === 0 ? 'in' : ''} />);
  }

  render() {
    return (
      <div className="panel panel-default">
        <div style={{ padding: '10px' }}>
          <span className="space">Your Repositories</span>|
          <span className="space">Add Organisation Repositories</span>|
          <Link to="#" className="space">Generate Report</Link>
        </div>
        {this.displayBody()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.data,
    allRepos: state.allRepos
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchRepos
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRepos);
