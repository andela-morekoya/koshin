import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import { connect } from 'react-redux';

function redirect(path) {
  window.location.href = path || '/';
}

class Main extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <div>
        {
          user.id ?
            <Home />
            :
            <Login />
        }
      </div>
    );
  }
}

Main.propTypes = {
  user: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user.data.github
  };
}

export default connect(mapStateToProps)(Main);
