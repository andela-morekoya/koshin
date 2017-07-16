import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserToken } from '../../actions/userActions';
import Toastr from 'toastr';

class AccessToken extends React.Component {
  constructor() {
    super();
    this.saveToken = this.saveToken.bind(this);
  }

  saveToken() {
    const user = {
      id: this.props.user.id,
      personalAccessToken: this.refs.pat.value
    };
    this.props.updateUserToken(user).then((res) => {
      Toastr.success(`Your Access Token has been updated`);
    });
  }

  tokenForm() {
    return (
      <div>
        <div className="form-group" style={{ width: '70%' }}>
          <label htmlFor="pat">Personal Access  Token:</label>
          <input type="text" ref="pat" className="form-control" id="pat" defaultValue={this.props.localDetails.personalAccessToken || ''} />
        </div>
        <div style={{ width: '70%' }}>
          <div className="form-group" style={{ width: '15%', float: 'right' }}>
            <input type="button" className="form-control btn btn-primary" value="Add / Update " onClick={this.saveToken} />
          </div>
        </div>
      </div>
    );
  }

  instruction() {
    return (
      <div style={{ paddingTop: '50px' }}>
        <h3 style={{ textDecoration: 'underline' }}>
          How To Generate Personal Access Token
        </h3>
        <div style={{fontSize: '20px', lineHeight: '2em'}}>
          Visit <a target="_blank" href="https://github.com/settings/tokens/new">github</a> to generate Personal Access Token.
          <p>At the minimum select:
            <ul>
              <li>Full access to private repos(if you intend to generate report for private repos)</li>
              <li>Admin read access</li>
            </ul>
          </p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.tokenForm()}
        {this.instruction()}
      </div>
    );
  }
}

AccessToken.propTypes = {
  user: React.PropTypes.object,
  updateUserToken: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.user.data.github,
    localDetails: state.user.data.local
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUserToken
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessToken);