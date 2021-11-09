import React, {useEffect, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import styled from 'styled-components';
import problemsBank from '../../../../apis/problemsBank';
import {Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';

function FavoritePanel() {
	const [listProblem, setListProblem] = useState([]);
	const [stateBar, setStateBar] = useState({});
    const [BarOption, setBarOption] = useState({});
    Chart.register(ChartDataLabels);

	useEffect(() => {
		
		try {
			const fetchData = async () => {
				const res = await problemsBank.getProblemFromMyList();
				const problems = res.data;
				setListProblem(problems);
			
				let category_num = [0,0,0];
				for(let i = 0; i < problems.length; i++){
					if(problems[i].problem_type === 1){
						category_num[0]++;
					}
					else if (problems[i].problem_type === 2){
						category_num[1]++;
					}
					else if (problems[i].problem_type === 3){
						category_num[2]++;
					}
				}

				let data ={
					labels:['프로그래밍','객관식','단답형',],
					datasets: [{
						  label: '문제 수',
						  maxBarThickness: 50,
						  data: [category_num[0], category_num[1], category_num[2]],
						  backgroundColor: ['#FE88A0', '#74C9C6',  '#C2E88D'],
						}]
				};
				setStateBar(data);
	
				let options ={
					indexAxis: 'y',
					scales: {
						x: 
						   {
								ticks:{
									min: 0,
									stepSize : 1,
									fontSize : 14,
								   }
						   }
					},
					plugins:{
						legend:{
							display:false
						},
						datalabels: {
                            display: false,
                          },
					}
				}
				setBarOption(options);
			};

			
			fetchData();
		} catch (error) {
			console.log('서버 연결 실패합니다. 다시 시도해주세요.');
		}
	}, []);

	const handleDeleteMyProblem = async (id) => {
		if (window.confirm('문제를 삭제 하시겠습니까?'))
		{
			let params = {id};
			const res = await problemsBank.deleteMyProblem(params);
			const listProblemTemp = listProblem.filter((problem) => problem.id !== id);
			setListProblem(listProblemTemp);

			let category_num = [0,0,0];
				for(let i = 0; i < listProblemTemp.length; i++){
					if(listProblemTemp[i].problem_type === 1){
						category_num[0]++;
					}
					else if (listProblemTemp[i].problem_type === 2){
						category_num[1]++;
					}
					else if (listProblemTemp[i].problem_type === 3){
						category_num[2]++;
					}
				}

				let data ={
					labels:['프로그래밍','객관식','단답형',],
					datasets: [{
						  label: '문제 수',
						  maxBarThickness: 50,
						  data: [category_num[0], category_num[1], category_num[2]],
						  backgroundColor: ['#FE88A0', '#74C9C6',  '#C2E88D'],
						}]
				};
				setStateBar(data);

		}
	};
	return (
		<Wrapper>
				<div className="chart-container">
					<div className="chart-header">
						<h2> 다시 볼 문제</h2>
					</div>
					<div className="chart-main">
						<div className="chart">
							<Bar 
								data = {stateBar}
								options={BarOption}
							/>
						</div>
					</div>
				</div>
				<div className="list-container">
					<div className="list-header">
						<h2>Problem List</h2>
					</div>
					<div className="list-problem">
						{
							listProblem.length !== 0 &&
								listProblem.map((item, idx) =>{
									let {problem_type} = item;
									let categoryName;
									let url;
									if (problem_type === 1) {
										categoryName = '프로그래밍 문제';
										url = 'codeproblems';
									}
									else if (problem_type === 2) {
										categoryName = '객관식 문제';
										url = 'multiplechoice';
									} else {
										categoryName = '단답형 문제';
										url = 'shortans';
									}
									return (
										<ColComponent>
											<div className="head">
												<p><span className="idx">{idx + 1} </span><span className="category">({categoryName})</span></p>
											</div>
											<div className="body">
												<Link to={`/${url}/view?id=${item.problem_id}`} key={idx} className="problem">
													ID : {item.problem_id} <br/> Title : {item.name} 
												</Link>
												<span onClick={() => handleDeleteMyProblem(item.id)} className="del-problem"><i className="fa fa-trash-o"></i></span>
											</div>
										</ColComponent>
									);
								},
								)
						}
					</div>
				</div>
		</Wrapper>
	);
}
const Wrapper = styled.div`
	flex: 0 0 1000px;
	.chart-container{
		border: 5px solid #F5F5F5;
		border-top-left-radius: 15px;
		border-top-right-radius: 15px;
		.chart-header{
			background: #F5F5F5;
			padding: 20px 30px;
			border-bottom: 5px solid #F5F5F5;
		}
		.chart-main{
			display: flex;
			justify-content: space-around;
			padding-bottom:20px;
			.chart{
                padding-top : 20px;
                padding-left : 10px;
                padding-right : 30px;
                flex:0 0 956px;
            }
			
		}
	}
	.list-container{
        border: 5px solid #F5F5F5;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        .list-header{
            background: #F5F5F5;
            border-bottom: 5px solid #F5F5F5;
            padding-left:20px;
            padding-top : 10px;
            padding-bottom : 10px;
        }
		.list-problem{
            padding-top: 20px; 
            display: grid;
			grid-template-columns: 450px 450px;
			
            row-gap: 5px;
			justify-content: space-around;
			
        }
    }
    margin-bottom:20px;   
`;
const ColComponent = styled.div`
	border : 3px solid #F5F5F5;
	border-radius:10px;
    margin-bottom: 10px;
	
    .head{
		padding-left:10px;
		margin-bottom:5px;
		border-bottom: 3px solid #F5F5F5;
		background: #F5F5F5;
		.idx{
			font-weight: bold;
			font-size:25px;
		}
		.category{
			font-size:15px;
		}
    }
	
	.body{
		padding-left:10px;
		padding-bottom:5px;

		.problem{
			font-size:18px;
			font-weight: bold;
		}
		.del-problem{
			cursor: pointer;
			opacity: 0;
			margin-left: 10px;
			border: 1px solid black;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			display: inline-block;
			text-align: center;
		}
	}	
    :hover{
        .del-problem{
            opacity: 1
        }
    }
`;
export default FavoritePanel;
