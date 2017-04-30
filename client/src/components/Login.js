import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../actions/userActions';

class Login extends React.Component {
  render() {
    return (
      <div className="container-fluid container-fluid-main">
        <div className="col-md-offset-3 col-md-6">
          <h2>Welcome to Koshin</h2>
          <p className="lead">Helping you automate the generation of summary reports for all your Github repos</p>
          <p className="add-repo-description">&nbsp;</p>
          <p className="add-repo-description">Ready To Get Started?</p>
          <a href="/auth/github">
            <div
              style={{ padding: '10px', textAlign: 'center', color: 'white', backgroundColor: 'black', display: 'inline-block', cursor: 'pointer' }}
            >
              <i className="fa fa-github" aria-hidden="true" style={{ fontSize: '25px', marginRight: '5px', verticalAlign: 'middle' }}></i>
              Login With GitHub
          </div>
          </a>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  fetchUser: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUser
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(Login);
