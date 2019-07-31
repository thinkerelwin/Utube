import React from 'react';
import './SideBarFooter.scss';

export function SideBarFooter() {
  return (
    <>
      <div className="footer-block">
        <div>
          <span>About</span> <span>Press</span> <span>Copyright</span>
        </div>
        <div>
          <span>Contact Us</span>
          <span>Creators</span>
        </div>
        <div>
          <span>Advertise</span>
          <span>Developers</span>
        </div>
      </div>
      <div className="footer-block">
        <div>
          <span>Terms</span> <span>Privacy</span>
          <span>Policy & Safety</span>
        </div>
        <div>Test new features</div>
      </div>
      <div className="footer-block">
        <div>© Utube.com - A Youtube clone for learing purposes .</div>
      </div>
    </>
  );
}
