import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUserDetails } from '../../actions/userActions';

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
    this.props.updateUserDetails(user);
    this.refs.pat.value = '';
  }

  tokenForm() {
    return (
      <div>
        <div className="form-group" style={{ width: '70%' }}>
          <label htmlFor="pat">Personal Access  Token:</label>
          <input type="text" ref="pat" className="form-control" id="pat" />
        </div>
        <div style={{ width: '70%' }}>
          <div className="form-group" style={{ width: '10%', float: 'right' }}>
            <input type="button" className="form-control btn btn-primary" value="Add" onClick={this.saveToken} />
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
  updateUserDetails: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.user.data.github
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateUserDetails
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessToken);