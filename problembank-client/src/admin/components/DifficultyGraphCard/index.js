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
    const [option_sub1, setOptionsub1] = useState({});

    

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
                responsive:false,
                maintainAspectRatio: false,
                plugins:{
                    legend:{
                        display : false,
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
                       
                        borderRadius: 5,
                        font:{
                          size:10,
                          color:'fff'
                        }
                      },
                }

        };
        setOptionsub(sub_option);

        let sub_option1 = {
            responsive:false,
            maintainAspectRatio: false,
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
                      size:14
                    }
                  },
            }

    };
    setOptionsub1(sub_option1);

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
                        <Pie
                            data={sub_programming}
                            options={option_sub}
                           width={158}
                           height={158}
                        />
                    </div><br/>
                    <div className="sub">
                        <h3>중</h3>
                        <Pie
                            data={sub_multiple}
                            options={option_sub}
                            width={158}
                            height={158}
                        />
                    </div><br/>
                    <div className="sub">
                        <h3>하</h3>
                        <Pie
                            data={sub_shortan}
                            options={option_sub}
                            width={158}
                            height={158}
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
        background-color:#fff;
        position:relative;
        top:10px;
        

        .chart-header{
            padding: 5px 5px;
        }

      
        }
        .chart-sub{
            padding-top:5px;
            padding-bottom:5px;
            display:flex;
            flex-wrap: wrap;
           
            justify-content: space-around;

            h3{
                display:flex;
                justify-content: space-around;
                padding-bottom:5px;
            }

            .sub{
                margin:0 auto;
                flex : 0 0 50px;
            }
          
        }

    }
   
`;
export default DifficultyGraphCard;