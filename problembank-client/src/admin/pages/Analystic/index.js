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
import VisitorNumCard from '../../components/VisitorNumCard';
import TotalProblemCard from '../../components/TotalProblemCard';
import CorrectRateCard from '../../components/CorrectRateCard';
import WrongRateCard from '../../components/WrongRateCard';
import DifficultyGraphCard from '../../components/DifficultyGraphCard';
import {HiOutlineRefresh} from "react-icons/hi";

function Analystic(props) {
    const [timeState,setTime] = useState();
    const [timerState,setTimer] = useState();

    const timeFunc = (func, dateTime) => {
        var year = Number(dateTime.substring(0,4));
        var month = Number(dateTime.substring(4,6));
        var day = Number(dateTime.substring(6,8));
        var time = Number(dateTime.substring(8,10));
        var minute = Number(dateTime.substring(10,12));
        var second = Number(dateTime.substring(12,14));

        var oprDate = new Date(year, month-1, day, time, minute, second); //동작을 원하는 시간의 Date 객체를 생성합니다.
        console.log(oprDate);
        var nowDate = new Date();
        
        var timer = oprDate.getTime() - nowDate.getTime(); //동작시간의 밀리세컨과 현재시간의 밀리세컨의 차이를 계산합니다.
        console.log(timer);
        if(timer < 0){ //타이머가 0보다 작으면 함수를 종료합니다.
            return;
        }
        else{
            setTimeout(func, timer);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            let present_date = new Date();
            let time_string =  present_date.getFullYear() + '/'+ ('0' + (present_date.getMonth() + 1)).slice(-2) +'/' + ('0' + present_date.getDate()).slice(-2) + " "
                             + ('0'+present_date.getHours()).slice(-2) + ":"+('0'+present_date.getMinutes()).slice(-2);
            setTime(time_string);

            let oneHourPlus = ''+ present_date.getFullYear() + ('0' + (present_date.getMonth() + 1)).slice(-2) + ('0' + present_date.getDate()).slice(-2) 
                            + ('0' + (present_date.getHours()+1)).slice(-2) + ('0000') ;
            
            // 매분 마다 relodad
            // let oneMinutePlus = ''+ present_date.getFullYear() + ('0' + (present_date.getMonth() + 1)).slice(-2) + ('0' + present_date.getDate()).slice(-2) 
            //                 + ('0' + (present_date.getHours())).slice(-2) + ('0' + (present_date.getMinutes()+1)).slice(-2) + ('00');
            
            timeFunc(function(){window.location.reload()}, oneHourPlus);
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
                <div className="Visitor_Num_Card"><VisitorNumCard/></div>
                <div className="Total_Problem_Card"><TotalProblemCard/></div>
                <div className="Problem_Num_Card"> <ProblemNumCard/></div>
                <div className="User_Graph_Card"> <UserGraphCard/> </div>
                <div className="Problem_Graph_Card"><ProblemGraphCard/></div>
                <div className="User_Rank_Card"><UserRankCard/></div>
                <div className="Correct_Rate_Card"><CorrectRateCard/></div>
                <div className="Diffyculty_Graph_Card"><DifficultyGraphCard/></div>
                <div className="Wrong_Rate_Card"><WrongRateCard/></div>
            </div>
        </DashboardLayout>

	);
}





export default Analystic;

