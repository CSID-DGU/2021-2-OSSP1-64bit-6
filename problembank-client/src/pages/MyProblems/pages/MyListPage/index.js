import React from 'react';
import MyListLayout from '../../../../layouts/MyListLayout';
import FavoritePanel from '../../components/FavoritePanel';
import MyListContainer from '../../components/MyListContainer';
import ProgressPanel from '../../components/ProgressPanel';
import DoughnutChart from '../../components/DoughnutChart';
import RadarChart from '../../components/RadarChart';
import Heatmap from '../../components/HeatMap';
import './style.scss';

function MyListPage(props) {
	return (
		//<Wrapper>
			<MyListLayout>
				<div className="mylist__container">
					<MyListContainer />
					<div className="middle">
						<Heatmap/>
						<DoughnutChart/>
						<RadarChart/>
					</div>
					{/* <FavoritePanel /> */}
					{/* <ProgressPanel /> */}
				</div>
			</MyListLayout>
		//</Wrapper>
	);
}


export default MyListPage;

