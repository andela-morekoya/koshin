import React from 'react';

const Footer = () =>
  <div style={{
    width: '100vw',
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#ddd'
  }}>
    Copyright &copy; KOSHIN {new Date().getFullYear()}
  </div>;

export default Footer;
