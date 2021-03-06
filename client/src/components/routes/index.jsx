import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending.jsx';
import Navbar from '../Navbar.jsx';
import PublicProfil from '../../pages/PublicProfil.jsx';
import MyFollow from '../../pages/MyFollow.jsx';

const Index = () => {
	return (
		<Router>
			<Navbar/>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route exact path="/profil" component={Profil}/>
				<Route exact path="/public-profil/:id" component={PublicProfil}/>
				<Route exact path="/trending" component={Trending}/>
				<Route exact path="/my-follow" component={MyFollow}/>
				<Redirect to='/'/>
			</Switch>
		</Router>
	);
};

export default Index;