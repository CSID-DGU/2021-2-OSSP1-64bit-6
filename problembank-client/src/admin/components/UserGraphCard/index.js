import React, {useEffect, useState} from 'react';
import { IoMdArrowRoundUp } from "react-icons/io";
import { GrUserAdd } from "react-icons/gr";
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';

function UserGraphCard(props) {
    const [LineState,setLineState] = useState({});
    const [LineOption,setLineOption] = useState({});
    Chart.register(ChartDataLabels);

    useEffect(() => {

        const fetchData = async () => {
          
            var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
            let months = [];
            let today = new Date().getMonth();
          
            for(let i = 5; i >= 0; i--){
                let temp = today - i;
                if(temp < 0) temp = temp + 12; 
                months.push(monthNames[temp]);
            }

            let L_Date = {
                labels : months,
                datasets: [{
                    data: [10, 23, 70, 77, 80, 89],
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
                <div className = 'Title'>Monthly User Change</div>
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
