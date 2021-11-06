import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import MyListPage from './pages/MyListPage';
import WrongProblem from './pages/WrongProblem';

function MyProblems(props) {
	const match = useRouteMatch();
	return (
		<Switch>
			<Route exact path = {`${match.url}/`} component = {MyListPage} />
			<Route exact path = {`${match.url}/Wrong`} component = {WrongProblem} />
		</Switch>
	);
}

export default MyProblems;

