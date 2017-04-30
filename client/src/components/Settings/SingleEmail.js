import React from 'react';
import Toastr from 'toastr';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEmail, deleteEmail } from '../../actions/emailActions';

class SingleEmail extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      disabled: true
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.removeEmail = this.removeEmail.bind(this);
    this.toggleDisable = this.toggleDisable.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  updateEmail() {
    const newEmail = this.refs.email.value;
    const email = this.props.email;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.email === newEmail) {
      return Toastr.info('No changes were made to: ' + newEmail);
    }

    if (!newEmail.match(regex)) {
      return Toastr.error('Please enter a valid email');
    }

    if (newEmail.length > 50) {
      return Toastr.error('Email address is too long');
    }
    const content = {
      userId: email.userId,
      email: newEmail,
      id: email.id
    };
    this.props.updateEmail(content);
    this.toggleDisable();
  }

  toggleDisable() {
    this.setState({ disabled: !this.state.disabled });
  }

  enableEdit(e) {
    const value = this.refs.email.value;
    this.setState({ email: value }, () => {
      this.toggleDisable();
    });
  }

  cancelEdit() {
    this.refs.email.value = this.state.email;
    this.toggleDisable();
  }

  removeEmail() {
    const email = this.props.email;
    const content = {
      userId: email.userId,
      id: email.id
    };
    this.props.deleteEmail(content);
    Toastr.success(email.email + ' was successfully deleted');
  }

  render() {
    return (
      <div className="form-group">
        <input
          className="form-control space"
          defaultValue={this.props.email.email}
          style={{ width: '58%', display: 'inline-block' }}
          disabled={this.state.disabled}
          ref="email"
        />
        {this.state.disabled ?
          <div style={{ width: '35%', display: 'inline-block', fontSize: '15px' }}>
            <i style={{ width: '30%', display: 'inline-block' }}
              className="form-control fa fa-pencil space btn btn-default"
              onClick={this.enableEdit}
            ></i>
            <i style={{ width: '30%', color: 'white', backgroundColor: '#C03B1E', display: 'inline-block' }}
              onClick={this.removeEmail}
              className="form-control fa fa-trash space btn"
            ></i>
          </div>
          :
          <div style={{ width: '35%', display: 'inline-block' }}>
            <input style={{ width: '40%', display: 'inline-block' }} type="button" className="btn btn-primary form-control space" value="Save" onClick={this.updateEmail} />
            <input style={{ width: '40%', display: 'inline-block' }} type="button" className="btn btn-danger form-control space" value="Cancel" onClick={this.cancelEdit} />
          </div>
        }
      </div>
    );
  }
}

SingleEmail.propTypes = {
  email: React.PropTypes.object,
  updateEmail: React.PropTypes.func,
  deleteEmail: React.PropTypes.func
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateEmail,
    deleteEmail
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(SingleEmail);