import React, {useState} from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import DashboardLayout from '../../layout/DashboardLayout';
import './style.scss';
import UserNumCard from '../../components/UserNumCard';
import ProblemNumCard from '../../components/ProblemNumCard';
import UserGraphCard from '../../components/UserGraphCard';
import ProblemGraphCard from '../../components/ProblemGraphCard';
import UserRankCard from '../../components/UserRankCard';
import { HiOutlineRefresh} from "react-icons/hi";

function Analystic(props) {
    const [timeState,setTime] = useState();

    useEffect(() => {
        const fetchData = async () => {
            let present_date = new Date();
            let time_string =  present_date.getFullYear() + '/'+ ('0' + (present_date.getMonth() + 1)).slice(-2) +'/' + ('0' + present_date.getDate()).slice(-2) + " "
                             + ('0'+present_date.getHours()).slice(-2) + ":"+('0'+present_date.getMinutes()).slice(-2);
            setTime(time_string);
        };
        fetchData();
    }, []);


	return (
		<DashboardLayout>
            <div className="Header">
                <h1 className="Title_dashboard">DashBoard </h1>
                <div className="Refresh_Icon" onClick={() => window.location.reload()}><HiOutlineRefresh size="20" color ="grey"/></div>
                <div className="Refresh_Time">{timeState}</div>
            </div>
            <div className="Full_container">
                <div className="User_Num_Card"> <UserNumCard/></div>
                <div className="Problem_Num_Card"> <ProblemNumCard/></div>
                <div className="User_Graph_Card"> <UserGraphCard/> </div>
                <div className="Problem_Graph_Card"><ProblemGraphCard/></div>
                <div className="User_Rank_Card"><UserRankCard/></div>
                <div className="Correct_Rate_Card"></div>
                <div className="Problem_Per_Day"></div>
                <div className="Wrong_Rate_Card"></div>
            </div>
        </DashboardLayout>

	);
}





export default Analystic;

