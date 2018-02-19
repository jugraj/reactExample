import React from 'react';
import './TopNav.scss';
import logo from '../..//logo.svg';


const TopNav = () => (
  <header className='header'>
    <a href="/">
      	<span className='logoText'>Skyscanner</span>
		<img className='logo' alt="Skyscanner" src={logo}/>      
    </a>
     <div className="menu-container">
		<div className="bar1"></div>
  		<div className="bar2"></div>
  		<div className="bar3"></div>
	</div>

  </header>
);

export default TopNav;
