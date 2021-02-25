import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from './Utils.js';
import { NavLink } from 'react-router-dom';
import { clearNotifications } from '../actions/user.actions.js';
import { UidContext } from './AppContext.jsx';

const Notifications = ({userData}) => {

	const [showListNotifications, setShowListNotifications] = useState(false);

	const uid = useContext(UidContext);
	const usersData = useSelector(state => state.usersReducer);
	const dispatch = useDispatch();

	return (
		<div className="notifications">
			<img onClick={() => setShowListNotifications(!showListNotifications)} src={__dirname + 'img/icons/bell.png'} alt="Bell"/>
			{
				!isEmpty(userData.notifications) && (
					<>
						<span>{userData.notifications.length}</span>
						{showListNotifications &&
						<NotificationsList uid={uid} notifications={userData.notifications} usersData={usersData} onClose={setShowListNotifications} dispatch={dispatch}/>
						}
					</>
				)
			}
			{
				isEmpty(userData.notifications) && showListNotifications && (
					<div className="notifications-list">
						<div className="list-item">
							<h6>Rien de neuf pour le moment !</h6>
						</div>
					</div>
				)
			}
		</div>
	);
};

const NotificationsList = ({uid, notifications, usersData, onClose, dispatch}) => {

	const clear = () => {
		dispatch(clearNotifications(uid));
		onClose();
	};

	return (
		<div className="notifications-list">
			{usersData.map(user => notifications.includes(user._id) ? (
				<NavLink exact to={`/public-profil/${user._id}`} onClick={() => onClose()} key={user._id} className="list-item">
					<img src={user.picture} alt={user._id}/>
					<p className="text-notif"><strong>{user.pseudo}</strong> vous suit !</p>
				</NavLink>
			) : null)}
			<button onClick={clear}>Supprimer mes notifications</button>
		</div>
	);
};

export default Notifications;
