import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchBar = () => {

	const [searchUser, setSearchUser] = useState([]);
	const inputRef = useRef(null);
	const allUsers = useSelector(state => state.usersReducer);

	const handleSearch = () => {
		let value = inputRef.current.value;
		allUsers.map(user => {
			let pseudo = user.pseudo.trim().toLowerCase();
			let matches = searchUser.find(u => u.pseudo === user.pseudo);
			value && pseudo.startsWith(value) && !matches
				? setSearchUser([...searchUser, user])
				: null;
		});
	};

	return (
		<div className="search-bar">
			<input ref={inputRef} onChange={handleSearch}
				   onKeyDown={e => e.key === 'Backspace' ? setSearchUser([]) : null}
				   type="search" name="search" placeholder="Recherche..."/>
			{
				searchUser.length > 0 ? (
					<ul className="search-list">
						{searchUser.map(user => (
							<li key={user._id}>
								<Link to={`/public-profil/${user._id}`}>{user.pseudo}</Link>
							</li>
						))}
					</ul>
				) : null
			}
		</div>
	);
}
;

export default SearchBar;
