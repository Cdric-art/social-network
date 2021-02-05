import React from 'react';
import { NavLink } from 'react-router-dom';

const LeftNav = () => {
	return (
		<div className="left-nav-container">
			<div className="icons">
				<div className="icons-bis">
					<NavLink exact to='/' activeClassName="active-left-nav">
						<img src={__dirname + 'img/icons/home.svg'} alt="home"/>
					</NavLink>
					<br/>
					<NavLink exact to='/my-follow' activeClassName="active-left-nav">
						<img src={__dirname + 'img/icons/check.svg'} alt="check"/>
					</NavLink>
					<br/>
					<NavLink exact to='/trending' activeClassName="active-left-nav">
						<img src={__dirname + 'img/icons/rocket.svg'} alt="rocket"/>
					</NavLink>
					<br/>
					<NavLink exact to='/profil' activeClassName="active-left-nav">
						<img src={__dirname + 'img/icons/user.svg'} alt="user"/>
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default LeftNav;