import React from 'react';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext.jsx';
import { useContext } from 'react';
import Logout from './log/Logout.jsx';
import { useSelector } from 'react-redux';
import Notifications from './Notifications.jsx';

const Navbar = () => {

	const uid = useContext(UidContext);
	const userData = useSelector(state => state.userReducer);

	return (
		<nav>
			<div className="nav-container">
				<div className="logo">
					<NavLink exact to="/">
						<div className="logo">
							<img src={__dirname + 'img/icon.png'} alt="logo"/>
							<h3>Pineapple</h3>
						</div>
					</NavLink>
				</div>
				{uid ? (
					<ul>
						<li/>
						<li className="welcome">
							<NavLink exact to="/profil">
								<h5>{userData.pseudo}</h5>
							</NavLink>
						</li>
						<Notifications userData={userData}/>
						<Logout/>
					</ul>
				) : (
					<ul>
						<li/>
						<li>
							<NavLink exact to="/profil">
								<img src={__dirname + 'img/icons/login.svg'} alt="logo"/>
							</NavLink>
						</li>
					</ul>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
