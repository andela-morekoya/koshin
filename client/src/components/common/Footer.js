import React from 'react';

const Footer = () =>
  <div style={{
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    bottom: '0px',
    padding: '10px'
  }}>
    Copyright &copy; KOSHIN {new Date().getFullYear()}
  </div>;

export default Footer;
