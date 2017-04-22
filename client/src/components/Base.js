import React, { PropTypes } from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

class Base extends React.Component {
  render() {
    return (
      <div className="container-fluid" style={{height: '100%'}}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;