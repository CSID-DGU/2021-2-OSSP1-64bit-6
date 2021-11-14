import React, {useEffect, useState} from 'react';
import { IoMdArrowRoundUp } from "react-icons/io";
import { GrUserAdd } from "react-icons/gr";
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';

function ProblemGraphCard(props) {
    const [LineState,setLineState] = useState({});
    const [LineOption,setLineOption] = useState({});
    Chart.register(ChartDataLabels);

    useEffect(() => {

        const fetchData = async () => {
          
            let days = [];
            for(let i = 5; i >= 0; i--){
                let day = new Date();
                day.setDate(day.getDate()-i);
                let dayString = ('0' + (day.getMonth() + 1)).slice(-2) +'/' + ('0' + day.getDate()).slice(-2);
                days.push(dayString);
            }

            let L_Date = {
                labels : days,
                datasets: [{
                    data: [10, 70, 60, 90, 50, 30],
                    fill: true,
                    backgroundColor : 'rgb(250, 219, 15,0.5)',
                    borderColor: 'rgb(250, 219, 15 ,0.5)',
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
                        suggestedMax:100,
                        ticks: {
                            
                            stepSize: 20
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
                <div className = 'Title'>Daily Solved Problem</div>
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

export default ProblemGraphCard;
