import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LeftNav from '../components/LeftNav.jsx';
import { dateParser, isEmpty } from '../components/Utils.js';
import FollowHandler from '../components/profil/FollowHandler.jsx';
import Card from '../components/post/Card.jsx';

const PublicProfil = () => {

	const [profilPublic, setProfilPublic] = useState([]);
	const [posts, setPosts] = useState([]);
	const usersData = useSelector(state => state.usersReducer);
	const userPosts = useSelector(state => state.allPostReducer);
	let {id} = useParams();

	useEffect(() => {
		if (!isEmpty(usersData[0]) && !isEmpty(userPosts[0]) && id) {
			setProfilPublic(usersData.filter(user => user._id === id));
			setPosts(userPosts.filter(post => post.posterId === id));
		}
	}, [usersData, userPosts, id]);


	return (
		<div className="public-profil">
			{!isEmpty(profilPublic) ? (
				<div className="public-profil__container">
					<h1>Profil de {profilPublic[0].pseudo}</h1>
					<LeftNav/>
					<div className="part-container">
						<div className="left-part-profil">
							<img src={__dirname + profilPublic[0].picture} alt="Profil picture"/>
							<h3>Bio :</h3>
							<p className="bio">{profilPublic[0].bio}</p>
							<h4 className="createdAt">Membre depuis le : {dateParser(profilPublic[0].createdAt)}</h4>
							<div className="data">
								<p>
									<span>{profilPublic[0].following ? profilPublic[0].following.length : 0}</span>
									&nbsp;Abonnement{profilPublic[0].following && profilPublic[0].following.length > 1 ? 's' : null}
								</p>
								<p>
									<span>{profilPublic[0].followers ? profilPublic[0].followers.length : 0}</span>
									&nbsp;Abonné{profilPublic[0].followers && profilPublic[0].followers.length > 1 ? 's' : null}
								</p>
							</div>
							<div className="btn-follow">
								<FollowHandler idToFollow={profilPublic[0]._id} type={'suggestion'}/>
							</div>
						</div>
						<div className="right-part-profil">
							<ul>
								{!isEmpty(posts) && posts.map(post => (
									<Card key={post._id} post={post}/>
								))}
							</ul>
						</div>
					</div>
				</div>
			) : (
				<div className="public-profil">
					<h1>L'utilisateur n'existe pas...</h1>
				</div>
			)}

		</div>
	);
};

export default PublicProfil;