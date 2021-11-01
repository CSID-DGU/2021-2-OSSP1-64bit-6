import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Pie, Doughnut} from 'react-chartjs-2';
import {useState} from 'react';
import problemBankAPI from '../../../../apis/problemsBank';
import {useSelector} from 'react-redux';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import {Link} from 'react-router-dom'

function DoughnutChart(props) {
	const user = useSelector((state) => state.user);
	const [stateDoughnut, setStateDoughnut] = useState({});
    const [optionDoughnut, setOptionDoughnut] = useState({});

    const [sub_programming, setStatesubP] = useState({});
    const [sub_multiple, setStatesubM] = useState({});
    const [sub_shortan, setStatesubS] = useState({});

    const [option_sub, setOptionsub] = useState({});



    const [sum_Problems, setsum] = useState();


    Chart.register(ChartDataLabels);

	useEffect(() => {
		const fetchData = async () => {
            const res = await problemBankAPI.getStatusProblem();
            const {data} = res;
			const {problem, multichoice, shortans} = data;

			let D_data = {
				labels: ['프로그래밍', '객관식', '주관식'],
				datasets: [{
					backgroundColor: [
                         '#FE88A0',
                         '#74C9C6',
                         '#C2E88D'
                       
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
					data: [3,multichoice.isCorrectArrayMul.length,shortans.isCorrectArrayShortans.length],
					}
				]
			};
			setStateDoughnut(D_data);

            let D_option = {
                    responsive:true,
                    plugins:{
                        legend:{
                            display : true,
                            position : 'bottom',
                            fontSize: 15
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
                  
                              //return ctx.chart.data.labels[ctx.dataIndex] + ' (' +percentage +')';
                              return '(' +percentage +')';
                            },
                            color: '#fff',
                           // backgroundColor: '#fff',
                            backgroundColor: ['#FE88A0',
                                             '#74C9C6',
                                            '#C2E88D'],
                            borderRadius: 5,
                            font:{
                              size:20
                            }
                          },
                    }

            };
            setOptionDoughnut(D_option);

            let sub_programming = {
				labels: ['상', '중', '하'],
				datasets: [{
					backgroundColor: [
                         '#FE88A0',
                         '#74C9C6',
                         '#C2E88D'
                       
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
					data: [10,20,30],
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
                          size:13
                        }
                      },
                }

        };
        setOptionsub(sub_option);

        let sub_mul = {
            labels: ['상', '중', '하'],
            datasets: [{
                backgroundColor: [
                     '#FE88A0',
                     '#74C9C6',
                     '#C2E88D'
                   
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                data: [multichoice.levelMul[2],multichoice.levelMul[1],multichoice.levelMul[0]],
                }
            ]
        };
        setStatesubM(sub_mul);


        let sub_short = {
            labels: ['상', '중', '하'],
            datasets: [{
                backgroundColor: [
                    '#FE88A0',
                    '#74C9C6',
                    '#C2E88D'
                
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                data: [shortans.levelShortans[2],shortans.levelShortans[1],shortans.levelShortans[0]],
                }
            ]
        };
        setStatesubS(sub_short);

        let sum = multichoice.isCorrectArrayMul.length + shortans.isCorrectArrayShortans.length+3;
        setsum(String(sum));
		};
		fetchData();
	}, []);

	return (
		<Wrapper>
			<div className="container">
                <div className ="chart-header">
                 <h2>&bull; 총 풀이 문제 수 : {sum_Problems} </h2>
                 </div>
                <div className="chart-main">
                    <div className="chart">
                    <Doughnut
                        data={stateDoughnut}
                        options={optionDoughnut}
                    />
                    </div>
                    <div className="difficulty">
                        {/* <ul>
                        <li> 상 &nbsp; : &nbsp; 192, 123, 125, 1, 3</li>
                        <br/>
                        <li> 중 &nbsp; : &nbsp; 200, 213, 342, 123, 5, 323</li>
                        <br/>
                        <li> 하 &nbsp; : &nbsp; 24, 126, 341, 100, 200, 300, 500</li>
                        </ul> */}
                        <table>
                            <thead className="thead">
                                <tr>
                                    <th className="th-category">Category </th>
                                    <th className="th-ID">Problem ID</th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                                <tr>
                                    <td><span className="bull1">&bull;</span> <span className="tr1">프로그래밍</span></td>
                                    <td><Link to ={'codeproblems/view?id=12'}>12</Link>, 2, 34, 123, 554, 34, 123, 43, ....</td>
                                </tr>
                                <tr>
                                    <td><span className="bull2">&bull;</span> <span className="tr1">객관식</span></td>
                                    <td>12, 2, 34, 123, 554, 34, 123, 43, ...</td>
                                </tr>
                                <tr>
                                    <td><span className="bull3">&bull;</span> <span className="tr1">주관식</span></td>
                                    <td>12, 2, 34, 123, 554, 34, 123, 43, ..</td>
                                </tr>
                            </tbody>

                        </table>

                    </div>
                </div>
                <div className="chart-sub">
                    <div className="sub">
                        <h3>프로그래밍</h3>
                        <Doughnut
                            data={sub_programming}
                            options={option_sub}
                        />
                    </div>
                    <div className="sub">
                        <h3>객관식</h3>
                        <Doughnut
                            data={sub_multiple}
                            options={option_sub}
                        />
                    </div>
                    <div className="sub">
                        <h3>주관식</h3>
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
    flex: 0 0 1000px;
    .container{
        box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px;
        border-radius: 40px;
        border: 1px solid #000;
        background: #F5F5F5;

        .chart-header{
            //display: flex;
            padding: 20px 30px;
            //justify-content: space-evenly;
        }
        .chart-main{ 
            display: flex;
            justify-content: space-around;
            border-bottom:solid;
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
export default DoughnutChart;

