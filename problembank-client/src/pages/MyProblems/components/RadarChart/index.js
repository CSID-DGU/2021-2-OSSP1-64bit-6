import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Radar} from 'react-chartjs-2';
import {useState} from 'react';
import problemBankAPI from '../../../../apis/problemsBank';
import {useSelector} from 'react-redux';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import {Link} from 'react-router-dom'

function RadarChart(props) {
	const user = useSelector((state) => state.user);
	const [stateRadar, setStateRadar] = useState({});
    const [radarOption, setRadarOption] = useState({});

    Chart.register(ChartDataLabels);

	useEffect(() => {
		const fetchData = async () => {
			let data ={
                labels:[
                    'Dynamic Programming',
                    'Graph',
                    'Math',
                    'Implementaion',
                    'Data Structure',
                    'String'
                ],
                datasets: [{
                    label : '프로그래밍',
                    data : [4,1,10,3,2,8],
                    fill : true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }, {
                    label : '객관식',
                    data : [10,2,3,8,8,5],
                    fill : true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                },{
                    label : '단답형',
                    data : [1,10,2,9,9,2],
                    fill : true,
                    backgroundColor: 'rgba(255, 153, 51, 0.2)',
                    borderColor: 'rgb(255, 153, 51)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'

                }]
            };
            setStateRadar(data);


            let options = {
                plugins:{
                    legend:{
                        position:'bottom',
                        fontSize: 15

                    }
                }
            }
            setRadarOption(options);

		};
		fetchData();
	}, []);
	return (
		<Wrapper>
			<div className="container">

                <div className ="chart-header">
                 <h2>&bull; Category 분포</h2>
                </div>

                <div className="chart-main">
                    <div className="chart">
                    <Radar 
                        data = {stateRadar}
                        options={radarOption}
                    />
                    </div>
                    <div className="category-table">
                        <table>
                            <thead className="thead">
                                <tr>
                                    <th className="th-category">Category </th>
                                    <th className="th-ID">Problem ID</th>
                                </tr>
                            </thead>
                            <tbody className="tbody">
                                <tr>
                                    <td><span className="bull">&bull;</span> <span className="tr1">D.P</span></td>
                                    <td><Link to ={'codeproblems/view?id=12'}><span className="programming">12</span></Link>, 
                                    <Link to ={'multiplechoice/view?id=2'}><span className="multiple"> 2</span></Link>, 
                                     34, 123, 554, 34, 123, 43, ....</td>
                                </tr>
                                <tr>
                                    <td><span className="bull">&bull;</span> <span className="tr1">Graph</span></td>
                                    <td>12, 2, 34, 123, 554, 34, 123, 43, ...</td>
                                </tr>
                                <tr>
                                    <td><span className="bull">&bull;</span> <span className="tr1">Math</span></td>
                                    <td>12, 2, 34, 123, 554, 34, 123, 43, ..</td>
                                </tr>
                                <tr>
                                    <td><span className="bull">&bull;</span> <span className="tr1">Implementaion</span></td>
                                    <td>12, 2, 34, 123, 554, 34, 123, 43, ..</td>
                                </tr>
                                <tr>
                                    <td><span className="bull">&bull;</span> <span className="tr1">Data Structure</span></td>
                                    <td>12, 2, 34, 123, 554, 34, 123, 43, ..</td>
                                </tr>
                                <tr>
                                    <td><span className="bull">&bull;</span> <span className="tr1">String</span></td>
                                    <td>12, 2, 34, 123, 554, 34, 123, 43, ..</td>
                                </tr>
                            </tbody>

                        </table>
                       

                      
                    </div>
                </div>
               
                
            </div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
    margin-top : 30px;
    margin-bottom:30px;
    flex: 0 0 1000px;

    .container{
        box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px;
        border: 1px solid #000;
        border-radius: 20px;
        background: #F5F5F5;

        .chart-header{
            padding: 20px 30px;
        }
        .chart-main{
            display: flex;
            justify-content: space-around;
            padding-bottom:20px;
            .chart{
                flex:0 0 400px;
            }
            .category-table{
                padding-left:30px;
                flex:0 0 500px;
                display: flex;
                align-items: center;
                table{
                    border-collapse: collapse;
                    .thead{
                        height:50px;
                    }
                    .th-category{
                        width:150px;
                        border-bottom:solid #c0c0c0;
                        text-align:left;
                    }
                    .th-ID{
                        border-bottom:solid #c0c0c0;
                        width:300px;
                        text-align:left;
                    }
                    .tbody{
                        height:300px;
                        .bull{
                            color:#cc0000;
                            font-size:20px;
                        }
                        .tr1{
                            font-weight:bold;
                        }
                        .programming{
                            color:#FE88A0;
                        }
                        .multiple{
                            color:#74C9C6;
                        }

                }
            }
        }
      

    }
   
`;
export default RadarChart;

