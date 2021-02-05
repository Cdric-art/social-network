import React, { useContext } from 'react';
import { UidContext } from '../components/AppContext.jsx';
import LeftNav from '../components/LeftNav.jsx';
import NewPost from '../components/post/NewPost.jsx';
import Log from '../components/log/Log.jsx';
import Trends from '../components/Trends.jsx';
import FriendsHint from '../components/profil/FriendsHint.jsx';
import FollowThread from '../components/FollowThread.jsx';

const MyFollow = () => {

	const uid = useContext(UidContext);

	return (
		<div className="home">
			<LeftNav/>
			<div className="main">
				<div className="home-header">
					{uid ? <NewPost/> : <Log signIn={true} signUp={false}/>}
				</div>
				{uid && <FollowThread/>}
			</div>
			<div className="right-side">
				<div className="right-side-container">
					<div className="wrapper">
						<Trends/>
						{uid && <FriendsHint/>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyFollow;