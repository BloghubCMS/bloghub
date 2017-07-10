import React from 'react';
import { Link } from 'react-router';

/* component styles */
import s from './styles.css';

function Sidebar() {
  return (
    <div className={s.root}>
      <div className={s.logoContainer}>
        <Link to="/">
          <img className={s.logo} src="/static/images/bloghub-logo.png" alt="" />
        </Link>
      </div>
      <ul className={s.menu}>
        <li>
          <Link to="/sites/0/posts">
            <i className="fa fa-file" aria-hidden="true" /> POSTS
          </Link>
        </li>
        <li>
          <Link to="">
            <i className="fa fa-folder-open" aria-hidden="true" /> PAGES
          </Link>
        </li>
        <li>
          <Link to="">
            <i className="fa fa-bars" aria-hidden="true" /> MENUS
          </Link>
        </li>
        <li>
          <Link to="">
            <i className="fa fa-cogs" aria-hidden="true" /> SETTINGS
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
