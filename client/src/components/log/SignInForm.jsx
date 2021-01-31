import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = (e) => {
		e.preventDefault();
		const emailError = document.querySelector('.email.error');
		const passwordError = document.querySelector('.password.error');

		axios({
			method: 'post',
			url: `${process.env.REACT_APP_API_URL}api/user/login`,
			withCredentials: true,
			data: {
				email: email,
				password: password
			},
		})
			.then(res => {
				if (res.data.errors) {
					emailError.innerHTML = res.data.errors.email;
					passwordError.innerHTML = res.data.errors.password;
				} else {
					window.location = '/';
				}
			})
			.catch(err => console.log(err));
	};

	return (
		<form onSubmit={handleLogin} id="sign-up-form">
			<label htmlFor="email">Email</label>
			<br/>
			<input onChange={(e) => setEmail(e.target.value)} type="text" name="email" id="email" value={email}/>
			<div className="email error" />
			<br/>
			<label htmlFor="password">Mot de passe</label>
			<br/>
			<input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" value={password}/>
			<div className="password error" />
			<br/>
			<input type="submit" value="Se connecter"/>
		</form>
	);
};

export default SignInForm;