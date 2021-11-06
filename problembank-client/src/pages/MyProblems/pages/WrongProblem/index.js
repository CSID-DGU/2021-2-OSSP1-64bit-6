import React from 'react';
import MyListLayout from '../../../../layouts/MyListLayout';
import FavoritePanel from '../../components/FavoritePanel';
import MyListContainer from '../../components/MyListContainer';
import ProgressPanel from '../../components/ProgressPanel';
import BarChart from '../../components/BarChart';
import RadarChart from '../../components/RadarChart';
import Heatmap from '../../components/HeatMap';
import './style.scss';

function WrongProblem(props) {
	return (
		<MyListLayout>
			<div className="mylist__container">
				<MyListContainer />
				<div className="middle">
					<BarChart />
				</div>
				{/* <FavoritePanel /> */}
				<ProgressPanel />
			</div>
		</MyListLayout>
	);
}

export default WrongProblem;