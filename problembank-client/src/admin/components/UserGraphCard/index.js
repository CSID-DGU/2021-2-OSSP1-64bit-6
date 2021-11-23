import React, {useEffect, useState} from 'react';
import { IoMdArrowRoundUp } from "react-icons/io";
import { GrUserAdd } from "react-icons/gr";
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import projectsAPI from '../../../apis/admin/problem';
import problemBankAPI from '../../../apis/problemsBank';

function UserGraphCard(props) {
    const [LineState,setLineState] = useState({});
    const [LineOption,setLineOption] = useState({});
    Chart.register(ChartDataLabels);

    useEffect(() => {

        const fetchData = async () => {
            const res = await problemBankAPI.getStatusProblem();
            const {data} = res;
            const {visitor} = data;

            let days = [];
            let visitor_num = [];
            for(let i = 6; i >= 0; i--){
                let day = new Date();
                day.setDate(day.getDate()-i);
                let dayString = ('0' + (day.getMonth() + 1)).slice(-2) +'/' + ('0' + day.getDate()).slice(-2);
                days.push(dayString);
                visitor_num.push(visitor.visitor_All[6-i].visitor_cnt);
            }

            let L_Date = {
                labels : days,
                datasets: [{
                    data: visitor_num,
                    fill: true,
                    backgroundColor : 'rgb(255, 128, 0,0.1)',
                    borderColor: 'rgb(255, 128, 0 ,0.5)',
                    tension: 0.5
                }]
            }
            setLineState(L_Date);

            let L_option = {
                responsive:false,
                plugins:{
                    legend:{
                        display:false,
                       
                    },
                    datalabels: {
                        display: false,
                      },
                },
                scales: {
                    y: {
                        suggestedMin:0,
                        suggestedMax:200,
                        ticks: {
                            
                            stepSize: 40
                          }
                    },

                    x:{
                        grid:{
                            display:false
                         },
                    }
                }
            }
            setLineOption(L_option);
            
        };
        fetchData();
    }, []);


	return (
        <Wrapper>
            <div className='Card'>
                <div className = 'Title'>Daily Visitor Change</div>
                <div ClassName = 'Chart'>
                    <Line
                        data={LineState}
                        options={LineOption}
                        width={650}
                        height={260}/>
                </div>
            </div>
        </Wrapper>
	);
}

const Wrapper = styled.div`
  
    .Card{
        display:grid;
        width:690px;
        height:350px;
        background-color:#fff;
        border: 3px solid #a0a0a0;
        border-radius:5px;

        grid-template-areas: 
        "A A"
        ". B";
     
        grid-template-rows: 65px 250px; 
      
        .Title{
            grid-area: A;
            font-size:24px;
            font-weight:bold;
            padding-left:30px;
            padding-top:13px;
           
        }
        .Chart{
            grid-area: B;
            margin-left:20px;
        }
        

       
       
        
    }


`

export default UserGraphCard;
