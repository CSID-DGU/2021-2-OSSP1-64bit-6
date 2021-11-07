import React from 'react';
import MyListLayout from '../../../../layouts/MyListLayout';
import MyListContainer from '../../components/MyListContainer';
import ProgressPanel from '../../components/ProgressPanel';
import BarChart from '../../components/BarChart';
import './style.scss';

function WrongProblem(props) {
	return (
		<MyListLayout>
			<div className="mylist__container">
				<MyListContainer />
				<div className="middle">
					<BarChart />
				</div>
				{/* <ProgressPanel /> */}
			</div>
		</MyListLayout>
	);
}

export default WrongProblem;