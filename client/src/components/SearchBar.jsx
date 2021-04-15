import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const SearchBar = () => {

	const [searchUser, setSearchUser] = useState([]);
	const inputRef = useRef(null);
	const allUsers = useSelector(state => state.usersReducer);

	const handleSearch = () => {
		let value = inputRef.current.value;
		allUsers.map(user => {
			let pseudo = user.pseudo.trim().toLowerCase();
			value && pseudo.startsWith(value) && !searchUser.includes(user.pseudo)
				? setSearchUser([user.pseudo, ...searchUser])
				: null;
		});
	};

	return (
		<div className="search-bar">
			<input ref={inputRef} onChange={handleSearch} onKeyDown={e => e.key === 'Backspace' ? setSearchUser([]) : null} type="search" name="search" placeholder="Recherche..."/>
			{
				searchUser.length > 0 ? (
					<ul className="search-list">
						{searchUser.map(u => (
							<li key={u}>{u}</li>
						))}
					</ul>
				) : null
			}
		</div>
	);
}
;

export default SearchBar;
