import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Bar} from 'react-chartjs-2';
import {useState} from 'react';
import problemBankAPI from '../../../../apis/problemsBank';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom'

function BarChart(props) {
    const user = useSelector((state) => state.user);
    const [stateBar, setStateBar] = useState({});
    const [BarOption, setBarOption] = useState({});

    const [listProblem, setListProblem] = useState([]);
    const [multiple_list,setMulList] = useState([]);
    const [shortan_list,setShorList] = useState([]);
    const [coding_list,setCoding] = useState([]);

    

    Chart.register(ChartDataLabels);

    useEffect(() => {
        const fetchData = async () => {
            const res = await problemBankAPI.getStatusProblem();
            const {data} = res;
			const {coding, multichoice, shortans} = data;
            
            
            let wrong_list= [];
            
            let wrong_list1= [];
            let wrong_problem1= {};
            let wrong_list2= [];
            let wrong_problem2= {};
            let wrong_list3= [];
            let wrong_problem3= {};

            for(let i =0; i< multichoice.noCorrectArrayMul.length; i++){
                if(i%2 == 0){
                    wrong_problem1.type='multi';
                    wrong_problem1.problem_id = multichoice.noCorrectArrayMul[i];
                }
                else if(i%2 != 0){
                    wrong_problem1.title = multichoice.noCorrectArrayMul[i]
                    wrong_list1.push(wrong_problem1);
                    wrong_problem1=new Object();
                }
            }
            
            for(let i =0; i< coding.noCorrectArrayCoding.length; i++){
                
                if(i%2 == 0){
                    wrong_problem2.type='coding';
                    wrong_problem2.problem_id = coding.noCorrectArrayCoding[i];
                }
                else if(i%2 != 0){
                    wrong_problem2.title = coding.noCorrectArrayCoding[i]
                    wrong_list2.push(wrong_problem2);
                    wrong_problem2=new Object();
                }
                
            }


            for(let i =0; i< shortans.noCorrectArrayShortans.length; i++){
                if(i%2 == 0){
                    wrong_problem3.type='shortans';
                    wrong_problem3.problem_id = shortans.noCorrectArrayShortans[i];
                }
                else if(i%2 != 0){
                    wrong_problem3.title = shortans.noCorrectArrayShortans[i]
                    wrong_list3.push(wrong_problem3);
                    wrong_problem3=new Object();
                }
            }

            wrong_list = wrong_list1.concat(wrong_list2,wrong_list3);
           

            setListProblem(wrong_list);

            let B_data ={
                labels:['프로그래밍','객관식','단답형',],
                datasets: [{
                      label: '틀린문제 수',
                      maxBarThickness: 50,
                      data: [coding.noCorrectArrayCoding.length/2 , multichoice.noCorrectArrayMul.length/2, shortans.noCorrectArrayShortans.length/2],
                      backgroundColor: ['#FE88A0', '#74C9C6',  '#C2E88D'],
                    }]
            };
            setStateBar(B_data);

            

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
     
    }, []);

    
   
    return(
        <Wrapper>
            <div className="container">
                <div className="chart-header">
                    <h2> 틀린 문제</h2>
                 
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
           
            <div className="list">
                  {/*favoritepanel 활용하기
                    문제 번호,이름 유형, 틀린거 확인할 값
                  */}
                    <div className="list-header">
                        <h2>틀린 문제 list</h2>
                    </div>
                    <div className="list-problem">
                    {
                        listProblem.length !== 0 &&
                        listProblem.map((item, idx) =>{
                            let {problem_type} = item;
                            let categoryName;
                            let url;
                                if(item.type == 'multi'){
                                categoryName = '객관식 문제';
                                url = 'multiplechoice';
                                }
                                else if(item.type == 'shortans'){
                                categoryName = '단답형 문제';
                                url = 'shortans';
                                }
                                else{
                                categoryName = '프로그래밍 문제';
                                url = 'codeproblems';
                                }
                            return (
                                <ColComponent>
                               
                                    <div className="head">
                                        <p><span className="idx">{idx + 1} </span><span className="category">({categoryName})</span></p>
                                    </div>
                                    <div className="body">
                                        <Link to={`/${url}/view?id=${item.problem_id}`} key={idx} className="problem">
                                            ID : {item.problem_id} <br/> Title : {item.title} 
                                        </Link>
                                        
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
    .container{
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
    .list{
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
            border-width:50%     
		}
		
	}	
    :hover{
        .del-problem{
            opacity: 1
        }
    }
`;

export default BarChart;