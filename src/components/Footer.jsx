import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">MaternalHealth Research</h3>
          <p className="footer-text">
            Improving maternal nutrition through community research in Kapsabet County.
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/survey">Take Survey</Link></li>
            <li><Link to="/login">Admin Portal</Link></li>
              <li><Link to="/">About</Link></li>

          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Contact</h4>
          <p className="footer-text">
            Kapsabet County Referral Hospital<br />
            Maternal Health Department<br />
            Email: maternalhealth@kcrh.go.ke<br/>
            Kaimosi Friends University<br/>
            Department of Nursing

          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MaternalHealth Research. Brian Dominic Otieno. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;