import React from 'react';

class SingleEmail extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      disabled: true
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.toggleDisable = this.toggleDisable.bind(this);
    this.enableEdit = this.enableEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }
  
  updateEmail(e) {
    const email = e.target.value;
    this.setState({ email });
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
              className="form-control fa fa-trash space btn"
            ></i>
          </div>
          :
          <div style={{ width: '35%', display: 'inline-block' }}>
            <input style={{ width: '40%', display: 'inline-block' }} type="button" className="btn btn-primary form-control space" value="Save" onClick={this.toggleDisable} />
            <input style={{ width: '40%', display: 'inline-block' }} type="button" className="btn btn-danger form-control space" value="Cancel" onClick={this.cancelEdit} />
          </div>
        }
      </div>
    );
  }
}

SingleEmail.propTypes = {
  email: React.PropTypes.object
};

export default SingleEmail;