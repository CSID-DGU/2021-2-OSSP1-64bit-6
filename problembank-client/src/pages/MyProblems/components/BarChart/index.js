import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Bar} from 'react-chartjs-2';
import {useState} from 'react';
import problemBankAPI from '../../../../apis/problemsBank';
import {useSelector} from 'react-redux';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import {Link} from 'react-router-dom'

function BarChart(props) {
    const user = useSelector((state) => state.user);
    const [stateBar, setStateBar] = useState({});
    const [BarOption, setBarOption] = useState({});

    Chart.register(ChartDataLabels);

    useEffect(() => {
        const fetchData = async () => {
            let data ={
                labels:[
                    '프로그래밍',
                    '객관식',
                    '단답형',
                ],
                datasets: [{
                      label: '틀린문제 수',
                      maxBarThickness: 50,
                      data: [4, 5, 1],
                      backgroundColor: ['#FE88A0', '#74C9C6',  '#C2E88D'],
                    }]
            };
            setStateBar(data);

            let options ={
                indexAxis: 'y',
                plugins:{
                    legend:{
                    display:false,
                }}
                
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
                  {/*favoritepanel 활용하기*/}
                    <div className="list-header">
                        <h2>틀린 문제 list</h2>
                    </div>
                    <div className="list-main">
                        <h2><small>1.프로그래밍 문제</small></h2>  
                        <Link to ={'codeproblems/view?id=12'}>12.집합 만들기</Link>
                        <h2><small>2.객관식 문제</small></h2>
                        <Link to ={'multiplechoice/view?id=25'}>25.반복문 출력 결과</Link>
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
                flex:0 0 1000px;
            }
        }
    }

    .list{
        //margin-top:10px;
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
        .list-main{
            padding:20px;
        }
    }
    
   
`;

export default BarChart;