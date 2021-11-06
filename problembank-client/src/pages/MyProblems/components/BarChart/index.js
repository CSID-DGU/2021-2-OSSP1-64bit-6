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
                      data: [4, 5, 1],
                      backgroundColor: 'rgb(255, 99, 132)',
                    }]
            };
            setStateBar(data);

            let options ={
                indexAxis: 'y',
                    legend:{
                    display:true,
                    position:'right'
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
                    <h2>&bull; 틀린 문제</h2>
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
            <div><br></br></div>
            <div className="list">
                  
                  {/*favoritepanel 활용하기*/}
  
                    <h1>&bull; 틀린 문제 list</h1>
                       <h2><small>1.프로그래밍 문제</small></h2>  
                       <Link to ={'codeproblems/view?id=12'}>12.집합 만들기</Link>
                       <h2><small>2.객관식 문제</small></h2>
                       <Link to ={'multiplechoice/view?id=25'}>25.반복문 출력 결과</Link>
                      
             </div>
        </Wrapper>
    );
}
const Wrapper = styled.div`
    margin-top : 50px;
    margin-bottom:30px;
    flex: 0 0 1000px;
    box-sizing: border-box;

    .container{
        box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px;
        border: 5px solid #a0a0a0;
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
                flex:0 0 800px;
            }
           
        }
      

    }

    .list{
      
        box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px;
        border: 5px solid #a0a0a0;
        border-radius: 20px;
        background: #F5F5F5;
        
        padding:20px;
    }
    
   
`;

export default BarChart;