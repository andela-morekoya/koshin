import React from 'react';

const Footer = () =>
  <div style={{
    width: '100%',
    textAlign: 'center',
    position: 'fixed',
    bottom: '0px',
    marginLeft: '-15px',
    padding: '10px',
    backgroundColor: '#ddd'
  }}>
    Copyright &copy; KOSHIN {new Date().getFullYear()}
  </div>;

export default Footer;
