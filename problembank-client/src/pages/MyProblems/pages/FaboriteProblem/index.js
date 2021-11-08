import React from 'react';
import MyListLayout from '../../../../layouts/MyListLayout';
import MyListContainer from '../../components/MyListContainer';
import FavoritePanel from '../../components/FavoritePanel';
import './style.scss';

function FavoriteProblem(props) {
	return (
		<MyListLayout>
			<div className="mylist__container">
				<MyListContainer />
				<div className="middle">
					<FavoritePanel/>
				</div>
			</div>
		</MyListLayout>
	);
}

export default FavoriteProblem;