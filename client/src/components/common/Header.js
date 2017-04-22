import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';

class Header extends React.Component {
  renderOnLogin() {
    const user = this.props.user;
    return (
      <div style={{ float: 'right' }}>
        <div style={{ verticalAlign: 'bottom', display: 'inline-block' }}>
        <a href="/logout">Logout</a>
        <span>{user.name}</span>
        </div>
        <img style={{ height: '80%' }} src={user.avatar_url} alt="LoggedIn user avater" />
      </div>
    )
  }
  render() {
    const user = this.props.user;
    return (
      <nav className="navbar navbar-default" style={{ height: '50px' }}>
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">Koshin</a>
          </div>
          {
            user && user.name ?
              this.renderOnLogin()
              : ''
          }
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  user: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user.data
  }
}

export default connect(mapStateToProps)(Header);
