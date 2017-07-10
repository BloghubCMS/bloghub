import React from 'react';
import { Link } from 'react-router';

/* component styles */
import s from './styles.css';

function Header() {
  return (
    <div className={s.root}>
      <div className={s.logoContainer}>
        <Link to="/">
          <img className={s.logo} src="/static/images/bloghub-logo.png" alt="" />
        </Link>
      </div>
      <ul className={s.menu}>
        <li>
          <Link to="/sites">
            MY SITES
          </Link>
        </li>

        <li>
          <Link to="/about">
            DOCS
          </Link>
        </li>

        <li>
          <Link to=''>
            USER@EMAIL.COM <i className="fa fa-angle-down custom" aria-hidden="true"></i>
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Header;
