import React, {useEffect} from 'react';
import styled from 'styled-components';
import {Pie, Doughnut} from 'react-chartjs-2';
import {useState} from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from 'chart.js';
import problemBankAPI from '../../../apis/problemsBank';


function DifficultyGraphCard(props) {
    const [sub_upper, setStatesubU] = useState({});
    const [sub_middle, setStatesubM] = useState({});
    const [sub_lower, setStatesubL] = useState({});
    const [option_upper, setOptionU] = useState({});
    const [option_middle, setOptionM] = useState({});
    const [option_lower, setOptionL] = useState({});

    Chart.register(ChartDataLabels);

	useEffect(() => {
		const fetchData = async () => {

            const res = await problemBankAPI.getStatusProblem();
            const {data} = res;
			const {level} = data;

          

            let sub_upper = {
				labels: ['O', 'X' ],
				datasets: [{
					backgroundColor: [
                        '#74C9C6', 
                        '#FE88A0'
                    ],
                    borderWidth:0,
                    hoverBackgroundColor: [
                        '#36A2EB',
                        '#FF6384'
                    ],
					data: [level.isCorrect_Level[2].iscorrect_cnt,level.noCorrect_Level[2].nocorrect_cnt],
					}
				]
			};
			setStatesubU(sub_upper);

            let sub_middle = {
                labels: ['O', 'X' ],
                datasets: [{
                    backgroundColor: [
                        '#74C9C6', 
                        '#FE88A0'
                    ],
                    borderWidth:0,
                    hoverBackgroundColor: [
                        '#36A2EB',
                        '#FF6384'
                    ],
                    data: [level.isCorrect_Level[1].iscorrect_cnt,level.noCorrect_Level[1].nocorrect_cnt],
                    }
                ]
            };
            setStatesubM(sub_middle);


            let sub_lower = {
                labels: ['O', 'X' ],
                datasets: [{
                    backgroundColor: [
                        '#74C9C6', 
                        '#FE88A0'
                    ],
                    borderWidth:0,
                    hoverBackgroundColor: [
                        '#36A2EB',
                        '#FF6384'
                    ],
                    data: [level.isCorrect_Level[0].iscorrect_cnt,level.noCorrect_Level[0].nocorrect_cnt],
                    }
                ]
            };
            setStatesubL(sub_lower);

            let sub_optU = {
                responsive:false,
                plugins:{
                    title: {
                        display: true,
                        text: '상',
                        font:{
                            size:20
                        },
                        padding:{
                            top:15
                        }
                    },
                    legend:{
                        display : false,
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
              
                          return  ctx.chart.data.labels[ctx.dataIndex] + ' (' +percentage +')';
                        },
                        color:   ['#36A2EB','#FF6384'],
                        backgroundColor: '#fff',
                        borderRadius: 5,
                        font:{
                          size:15,
                          wegiht:50
                        }
                      },
                }

        };
        setOptionU(sub_optU);

        let sub_optM = {
            responsive:false,
            plugins:{
                title: {
                    display: true,
                    text: '중',
                    font:{
                        size:20
                    },
                    padding:{
                        top:15
                    }
                },
                legend:{
                    display : false,
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
          
                      return ctx.chart.data.labels[ctx.dataIndex] + '(' +percentage +')';
                    },
                    color: ['#36A2EB','#FF6384'],
                    backgroundColor: '#fff',
                    borderRadius: 5,
                 
                    font:{
                      size:15,
                      wegiht:30
                    }
                  },
            }

        };
        setOptionM(sub_optM);

        let sub_optL = {
            responsive:false,
            plugins:{
                title: {
                    display: true,
                    text: '하',
                    font:{
                        size:20
                    },
                    padding:{
                        top:15
                    }
                },
                legend:{
                    display : false,
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
        
                    return ctx.chart.data.labels[ctx.dataIndex] + '(' +percentage +')';
                    },
                    color: ['#36A2EB','#FF6384'],
                    backgroundColor: '#fff',
                    borderRadius: 5,                
                
                    font:{
                    size:15,
                    wegiht:30
                    }
                },
            }
        };
        setOptionL(sub_optL);


		};
		fetchData();
	}, []);

    
	return (
		<Wrapper>
			<div className="container">
                <div className ="chart-header">난이도별 풀이 비율</div>
                
                <div className="chart-sub">
                    <div className="upper">
                        <Pie
                            data={sub_upper}
                            options={option_upper}
                            width={220}
                            height={220}
                        />
                    </div><br/>
                    <div className="middle">
                      
                        <Pie
                            data={sub_middle}
                            options={option_middle}
                            width={220}
                            height={220}
                           
                        />
                    </div><br/>
                    <div className="lower">
                      
                        <Pie
                            data={sub_lower}
                            options={option_lower}
                            width={220}
                            height={220}
                            
                        />
                    </div>
                </div>   
            </div>
		</Wrapper>
	);
}

const Wrapper = styled.div`
    .container{
        width:450px;
        height:490px;
        border-radius: 5px;
        border: 3px solid #a0a0a0;
        background-color:#fff;
        position:relative;
        top:10px;
        
        .chart-header{
            padding-left: 20px;
            padding-top:10px;
            font-size:27px;
            font-weight:bold;
        }

        }
        .chart-sub{
            
            display:grid;
            
            grid-template-areas: 
            ". . A A"
            "B B A A"
            "B B C C"
            ". . C C";
            
            grid-template-rows: 109px 109px 109px 109px; 
            grid-template-columns: 114px 114px 114px 114px; 

            .upper{
                grid-area:A;
                place-self: start start;
            }
            .middle{
                grid-area:B;
                place-self: center start;
            }
            .lower{
                grid-area:C;
                place-self: end start;
            }
            
          
        }

    }
   
`;
export default DifficultyGraphCard;