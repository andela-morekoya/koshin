import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserEmails, addEmails } from '../../actions/emailActions';
import Toastr from 'toastr';
import SingleEmail from './SingleEmail';

class Emails extends React.Component {
  constructor() {
    super();
    this.checkEmails = this.checkEmails.bind(this);
    this.saveEmails = this.saveEmails.bind(this);
  }

  componentDidMount() {
    const id = this.props.user.id;
    this.props.fetchUserEmails(id);
  }

  checkEmails(list) {
    const emails = list.split(',');
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailList = [];
    emails.forEach(email => {
      const item = email.trim();

      if (item.match(regex)) {
        emailList.push(item);
      }
    });
    if (emailList.length < emails.length) {
      Toastr.error('Some contents are not valid emails, and were discarded.');
    }
    return emailList;
  }

  saveEmails() {
    const data = {
      emails: this.checkEmails(this.refs.emails.value),
      userId: this.props.user.id
    };
    this.props.addEmails(data);
  }

  addUserEmails() {
    return (
      <div style={{ width: '45%', display: 'inline-block' }} className="space">
        <div className="form-group">
          <label htmlFor="emails">Add comma Separated email list:</label>
          <textarea className="form-control" ref="emails" rows="20" cols="50" id="emails" />
        </div>
        <div>
          <div className="form-group" style={{ width: '10%', float: 'right' }}>
            <input type="button" className="form-control btn btn-primary" value="Add" onClick={this.saveEmails} />
          </div>
        </div>
      </div>
    );
  }

  showUsersEmails() {
    const { data, isFetching } = this.props.emails;
    const emails = data.emails || [];

    const isLoading = (<div>
      <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
    </div>);

    if (isFetching) {
      return isLoading;
    }
    if (emails && !emails.length) {
      return (<div style={{ width: '100%', height: '50%' }}>
        You have not added emails.
      </div>);
    }
    return (
      <div className="space">
        {emails.map((email) => <SingleEmail email={email} key={email.id} />)}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div style={{ width: '45%', display: 'inline-block' }}>
          {this.showUsersEmails()}
        </div>
        {this.addUserEmails()}
      </div>
    );
  }
}

Emails.propTypes = {
  user: React.PropTypes.object,
  emails: React.PropTypes.object,
  fetchUserEmails: React.PropTypes.func,
  addEmails: React.PropTypes.func
};

function mapStateToProps(state) {
  return {
    user: state.user.data.github,
    emails: state.emails
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchUserEmails,
    addEmails
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Emails);