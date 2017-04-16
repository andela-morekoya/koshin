import React, { PropTypes } from 'react';
import Header from './common/Header';

class Base extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;