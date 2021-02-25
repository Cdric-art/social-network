import React, { useContext } from 'react';
import LeftNav from '../components/LeftNav.jsx';
import Thread from '../components/Thread.jsx';
import { UidContext } from '../components/AppContext.jsx';
import NewPost from '../components/post/NewPost.jsx';
import Log from '../components/log/Log.jsx';
import Trends from '../components/Trends.jsx';
import FriendsHint from '../components/profil/FriendsHint.jsx';

const Home = () => {

	const uid = useContext(UidContext);

	return (
		<div className="home">
			<LeftNav/>
			<div className="main">
				<div className="home-header">
					{uid ? <NewPost/> : <Log signIn={true} signUp={false}/>}
				</div>
				<Thread/>
			</div>
			<div className="right-side">
				<div className="right-side-container">
					<div className="wrapper">
						<Trends />
						{uid && <FriendsHint/>}
					</div>
				</div>
			</div>`
		</div>
	);
};

export default Home;
