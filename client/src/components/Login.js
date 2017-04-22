import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../actions/userActions';

class Login extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="col-md-8">
          <h3>Welcome to Koshin</h3>
          <p>This section contains a brief description of what koshin is about.</p>
        </div>
        <div className="col-md-4">
          <p>Ready To Get Started?</p>
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
