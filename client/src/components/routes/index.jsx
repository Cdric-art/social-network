import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending.jsx';
import Navbar from '../Navbar.jsx';

const Index = () => {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route exact path="/profil" component={Profil}/>
				<Route exact path="/trending" component={Trending}/>
				<Redirect to='/' />
			</Switch>
		</Router>
	);
};

export default Index;