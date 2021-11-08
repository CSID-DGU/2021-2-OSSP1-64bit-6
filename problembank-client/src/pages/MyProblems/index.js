import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import MyListPage from './pages/MyListPage';
import WrongProblem from './pages/WrongProblem';
import FavoriteProblem from './pages/FaboriteProblem';

function MyProblems(props) {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route exact path = {`${match.url}/`} component = {MyListPage} />
			<Route exact path = {`${match.url}/Wrong`} component = {WrongProblem} />
			<Route exact path = {`${match.url}/Favorite`} component = {FavoriteProblem} />
		</Switch>
	);
}

export default MyProblems;

