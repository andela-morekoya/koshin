import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../actions/userActions';
import store from '../../store/configureStore';
import * as api from '../../utils/api';
import LoggedInView from '../loggedInView';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isLoggedIn: false
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    api.isUserLoggedIn().then(res => {
      this.setState({ isLoggedIn: true, isLoading: false });
      store.dispatch(userActions.receiveUserDetailsSuccess(res));
    }).catch((err) => {
      store.dispatch(userActions.receiveUserDetailsFailure(err));
      this.setState({ isLoggedIn: false, isLoading: false });
    });
  }

  renderBasedOnFetch() {
    if (this.state.isLoading) {
      return (<div />);
    }
    if (this.state.isLoggedIn) {
      return <LoggedInView />;
    }
    return (<div className="jumbotron">
      <h1>Welcome to Koshin</h1>
      <a href="/auth/github" className="btn btn-primary">Login with GitHub</a>
    </div>);
  }

  render() {
    return (
      <div>
        {this.renderBasedOnFetch()}
      </div>
    );
  }
}

function mapStateToProps(state, OwnProps) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);