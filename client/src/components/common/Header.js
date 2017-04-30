import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends React.Component {
  renderOnLogin() {
    const user = this.props.user;
    return (
      <div style={{ float: 'right', display: 'flex', alignItems: 'center' }}>
        <span>Welcome {user.name} | &nbsp;</span>
        <a href="/logout">Logout</a>
        <img className="avatar" src={user.avatar_url} alt="LoggedIn user avater" />
      </div>
    )
  }
  render() {
    const user = this.props.user;
    return (
      <nav className="navbar navbar-default" style={{ height: '50px' }}>
        <div className="container-fluid">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/">Koshin</Link>
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
    user: state.user.data.github
  }
}

export default connect(mapStateToProps)(Header);
