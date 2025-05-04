import React from 'react'
import FooterLinks from './FooterLinks/FooterLinks';
import './Footer.scss';

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <FooterLinks/>
      </div>
    </div>
  )
}

export default Footer