import React, {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import DashboardLayout from '../../layout/DashboardLayout';
import './style.scss';
import UserNumCard from '../../components/UserNumCard';


function Analystic(props) {
	return (
		<DashboardLayout>
            <div className="Full_container">
                <div className="User_Num_Card"> <UserNumCard/></div>
                <div className="Accessor_Num_Card"> </div>
                <div className="User_Graph_Card"> </div>
                <div className="Accessor_Graph_Card"></div>
                <div className="User_Rank_Card"></div>
                <div className="Correct_Rate_Card"></div>
                <div className="Problem_Per_Day"></div>
                <div className="Wrong_Rate_Card"></div>
            </div>
        </DashboardLayout>

	);
}





export default Analystic;

