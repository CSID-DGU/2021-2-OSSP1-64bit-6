import React from 'react';
import MyListLayout from '../../../../layouts/MyListLayout';
import FavoritePanel from '../../components/FavoritePanel';
import MyListContainer from '../../components/MyListContainer';
import ProgressPanel from '../../components/ProgressPanel';
import DoughnutChart from '../../components/DoughnutChart';
import RadarChart from '../../components/RadarChart';
import './style.scss';

function MyListPage(props) {
	return (
		<MyListLayout>
			<div className="mylist__container">
				<MyListContainer />
				<div className="middle">
					<DoughnutChart/>
					<RadarChart/>
				</div>
				{/* <FavoritePanel /> */}
				<ProgressPanel />
			</div>
		</MyListLayout>
	);
}

export default MyListPage;

