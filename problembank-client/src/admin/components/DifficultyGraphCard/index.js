import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Pie, Doughnut} from 'react-chartjs-2';
import {useState} from 'react';

import {useSelector} from 'react-redux';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import {Link} from 'react-router-dom'

function DifficultyGraphCard(props) {
	const user = useSelector((state) => state.user);
	const [stateDoughnut, setStateDoughnut] = useState({});
    const [optionDoughnut, setOptionDoughnut] = useState({});

    const [sub_programming, setStatesubP] = useState({});
    const [sub_multiple, setStatesubM] = useState({});
    const [sub_shortan, setStatesubS] = useState({});
    const [option_sub, setOptionsub] = useState({});

    

    Chart.register(ChartDataLabels);

	useEffect(() => {
		const fetchData = async () => {
    

            let sub_programming = {
				labels: ['정답률', '오답률' ],
				datasets: [{
					backgroundColor: [
                        '#74C9C6', 
                        '#FE88A0'
                         
                       
                    ],
                    hoverBackgroundColor: [
                        '#36A2EB',
                        '#FF6384'
                    ],
					data: [1,4],
					}
				]
			};
			setStatesubP(sub_programming);

            let sub_option = {
                responsive:true,
                plugins:{
                    legend:{
                        display : true,
                        position : 'bottom',
                        fontSize: 10
                      },
                    datalabels: {
                        display: true,
                        formatter: (val, ctx) => {
                          let sum = 0;
                              let dataArr = ctx.chart.data.datasets[0].data;
                              dataArr.map(data => {
                                  sum += data;
                              });
                              let percentage = (val*100 / sum).toFixed(0)+"%";
              
                          return ctx.chart.data.labels[ctx.dataIndex] + ' (' +percentage +')';
                          //return '(' +percentage +')';
                        },
                        color: '#000',
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        font:{
                          size:10
                        }
                      },
                }

        };
        setOptionsub(sub_option);

        let sub_mul = {
            labels: ['정답률', '오답률' ],
            datasets: [{
                backgroundColor: [
                    '#74C9C6', 
                    '#FE88A0'
                     
                   
                ],
                hoverBackgroundColor: [
                    '#36A2EB',
                    '#FF6384'
                ],
                data: [2,2],
                }
            ]
        };
        setStatesubM(sub_mul);


        let sub_short = {
            labels: ['정답률', '오답률' ],
            datasets: [{
                backgroundColor: [
                    '#74C9C6', 
                    '#FE88A0'
                     
                   
                ],
                hoverBackgroundColor: [
                    '#36A2EB',
                    '#FF6384'
                ],
                data: [4,1],
                }
            ]
        };
        setStatesubS(sub_short);

		};
		fetchData();
	}, []);

    
	return (
		<Wrapper>
			<div className="container">
                <div className ="chart-header">
                <h2>난이도별 정답률</h2>
                 </div>
                
                <div className="chart-sub">
                    <div className="sub">
                        <h3>상</h3>
                        <Doughnut
                            data={sub_programming}
                            options={option_sub}
                        />
                    </div>
                    <div className="sub">
                        <h3>중</h3>
                        <Doughnut
                            data={sub_multiple}
                            options={option_sub}
                        />
                    </div>
                    <div className="sub">
                        <h3>하</h3>
                        <Doughnut
                            data={sub_shortan}
                            options={option_sub}
                        />
                    </div>
                </div>   
            </div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
    .container{
        box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px;
        border-radius: 5px;
        border: 3px solid #a0a0a0;
        

        .chart-header{
            padding: 20px 30px;
        }

        .chart-main{ 
            padding-top:10px;
            display: flex;
            justify-content: space-around;
            border-bottom:solid #a0a0a0;
            padding-bottom:20px;
            .chart{
                flex:0 0 400px;
            }
            .difficulty{
                flex:0 0 500px;
                display: flex;
                align-items: center;
                table{
                    border-collapse: collapse;
                  
                    .thead{
                        height:50px;
                    }
                    .th-category{
                        width:120px;
                        border-bottom:solid #c0c0c0;
                        text-align:left;
                    }
                    .th-ID{
                        border-bottom:solid #c0c0c0;
                        width:350px;
                        text-align:left;
                    }
                    .tbody{
                        height:200px;
                        .bull1{
                            color:#FE88A0;
                            font-size:20px;
                        }
                        .bull2{
                            color:#74C9C6;
                            font-size:20px;
                        }
                        .bull3{
                            color:#C2E88D;
                            font-size:20px;
                        }
                        .tr1{
                            font-weight:bold;
                        }
                     
                    }

                }
            }
        }
        .chart-sub{
            padding-top:30px;
            padding-bottom:30px;
            display:flex;
           
            justify-content: space-around;

            h3{
                display:flex;
                justify-content: space-around;
                padding-bottom:15px;
            }

            .sub{
                flex : 0 0 50px;
            }
          
        }

    }
   
`;
export default DifficultyGraphCard;