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
    const [impproblem, setImp] = useState([]);
    const [dataproblem, setData] = useState([]);
    const [mathproblem, setMath] = useState([]);
    const [algoproblem, setAlgo] = useState([]);
    const [strproblem, setStr] = useState([]);

    
    Chart.register(ChartDataLabels);

	useEffect(() => {
		const fetchData = async () => {

            const res = await problemBankAPI.getStatusProblem();
            const {data} = res;
			const {proCate} = data;

            console.log(proCate);

            let sum_pro = proCate.proArray.length;

            let multi_category = [0,0,0,0,0]; let shortan_category = [0,0,0,0,0]; let programming_category = [0,0,0,0,0];
            let multi_sum = 0; let shortan_sum = 0; let programming_sum = 0;

            let Imp_arr = []; let Data_arr = []; let Math_arr = []; let Algo_arr = []; let Str_arr = [];

            for(let i = 0; i < sum_pro; i++)
            {
                let Cate = proCate.proCategory[i];
                let Type = proCate.proType[i];
                if(Cate === 'multi'){
                    multi_sum++;
                    if(Type === 'imp') {
                        multi_category[0]++;
                        Imp_arr.push({ID:proCate.proArray[i], type:'multi', time:proCate.proDate[i]})
                    }
                    else if(Type === 'data') {
                        multi_category[1]++;
                        Data_arr.push({ID:proCate.proArray[i], type:'multi', time:proCate.proDate[i]})
                    }
                    else if(Type === 'math')  {
                        multi_category[2]++;
                        Math_arr.push({ID:proCate.proArray[i], type:'multi', time:proCate.proDate[i]})
                    }
                    else if(Type === 'algo') {
                        multi_category[3]++;
                        Algo_arr.push({ID:proCate.proArray[i], type:'multi', time:proCate.proDate[i]})
                    }
                    else if(Type === 'str') {
                        multi_category[4]++;
                        Str_arr.push({ID:proCate.proArray[i], type:'multi', time:proCate.proDate[i]})
                    }
                }
                else if(Cate === 'short'){
                    shortan_sum++;
                    if(Type === 'imp') {
                        shortan_category[0]++;
                        Imp_arr.push({ID:proCate.proArray[i], type:'shortan', time:proCate.proDate[i]})
                    }
                    else if(Type === 'data') {
                        shortan_category[1]++;
                        Data_arr.push({ID:proCate.proArray[i], type:'shortan', time:proCate.proDate[i]})
                    }
                    else if(Type === 'math') {
                        shortan_category[2]++;
                        Math_arr.push({ID:proCate.proArray[i], type:'shortan', time:proCate.proDate[i]})
                    }
                    else if(Type === 'algo') {
                        shortan_category[3]++;
                        Algo_arr.push({ID:proCate.proArray[i], type:'shortan', time:proCate.proDate[i]})
                    }
                    else if(Type === 'str') {
                        shortan_category[4]++;
                        Str_arr.push({ID:proCate.proArray[i], type:'shortan', time:proCate.proDate[i]})
                    }
                }
                else if(Cate === 'prog'){
                    programming_sum++;
                    if(Type === 'imp') {
                        programming_category[0]++;
                        Imp_arr.push({ID:proCate.proArray[i], type:'programming', time:proCate.proDate[i]})
                    }
                    else if(Type === 'data') {
                        programming_category[1]++;
                        Data_arr.push({ID:proCate.proArray[i], type:'programming', time:proCate.proDate[i]})
                    }
                    else if(Type === 'math') {
                        programming_category[2]++;
                        Math_arr.push({ID:proCate.proArray[i], type:'programming', time:proCate.proDate[i]})
                    }
                    else if(Type === 'algo') {
                        programming_category[3]++;
                        Algo_arr.push({ID:proCate.proArray[i], type:'programming', time:proCate.proDate[i]})
                    }
                    else if(Type === 'str') {
                        programming_category[4]++;
                        Str_arr.push({ID:proCate.proArray[i], type:'programming', time:proCate.proDate[i]})
                    }
                }
            }
            Imp_arr = Imp_arr.sort((a,b)=>{
                if(a.time>b.time) return -1;
                if(a.time<b.time) return 1;
                return 0;
            })
            Data_arr = Data_arr.sort((a,b)=>{
                if(a.time>b.time) return -1;
                if(a.time<b.time) return 1;
                return 0;
            })
            Math_arr = Math_arr.sort((a,b)=>{
                if(a.time>b.time) return -1;
                if(a.time<b.time) return 1;
                return 0;
            })
            Algo_arr = Algo_arr.sort((a,b)=>{
                if(a.time>b.time) return -1;
                if(a.time<b.time) return 1;
                return 0;
            })
            Str_arr = Str_arr.sort((a,b)=>{
                if(a.time>b.time) return -1;
                if(a.time<b.time) return 1;
                return 0;
            })
            setImp(Imp_arr); setAlgo(Algo_arr); setData(Data_arr); setMath(Math_arr); setStr(Str_arr);
            
            let ratio_multi = multi_category.map((item)=> Math.round(item/multi_sum*10));
            let ratio_shortan = shortan_category.map((item)=> Math.round(item/shortan_sum*10));
            let ratio_programming = programming_category.map((item)=> Math.round(item/programming_sum*10));

			let R_data ={
                labels:[
                    'Implementaion',
                    'Data Structure',
                    'Math',
                    'Algorithm',
                    'String'
                ],
                datasets: [{
                    label : '프로그래밍',
                    data : [ratio_programming[0],ratio_programming[1],ratio_programming[2],ratio_programming[3],ratio_programming[4]],
                    fill : true,
                    backgroundColor: 'rgba(254, 136, 160, 0.2)',
                    borderColor: 'rgb(254, 136, 160)',
                   
                  
                }, {
                    label : '객관식',
                    data : [ratio_multi[0], ratio_multi[1],ratio_multi[2],ratio_multi[3],ratio_multi[4]],
                    fill : true,
                    backgroundColor: 'rgba(116, 201, 198, 0.2)',
                    borderColor: 'rgb(116, 201, 198)',
                    
                 
                },{
                    label : '단답형',
                    data : [ratio_shortan[0], ratio_shortan[1] ,ratio_shortan[2], ratio_shortan[3], ratio_shortan[4]],
                    fill : true,
                    backgroundColor: 'rgba(194, 232, 141, 0.2)',
                    borderColor: 'rgb(194, 232, 141)',
                    
                }]
            };
            setStateRadar(R_data);

            let options = {
                plugins:{
                    legend:{
                        position:'bottom',
                        fontSize: 15
                    }
                },
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 10
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
                                    <td><span className="bull">&bull;</span> <span className="tr1">Implementaion</span></td>
                                    <td>
                                    {
                                        impproblem.map((item,idx)=>{
                                            if (idx > 8) return false;

                                            if(item.type === 'programming'){
                                                return(
                                                    <Link to = {`codeproblems/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#FE88A0'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                            else if(item.type === 'shortan'){
                                                return(
                                                    <Link to = {`shortans/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#66cc00'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                            else if(item.type === 'multi'){
                                                return(
                                                    <Link to = {`multiplechoice/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#0080ff'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                        })
                                    }


                                    </td>
                                </tr>
                                <tr>
                                    <td><span className="bull">&bull;</span> <span className="tr1">Data Structure</span></td>
                                    <td>
                                    {
                                        dataproblem.map((item,idx)=>{
                                            if (idx > 8) return false;

                                            if(item.type === 'programming'){
                                                return(
                                                    <Link to = {`codeproblems/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#FE88A0'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                            else if(item.type === 'shortan'){
                                                return(
                                                    <Link to = {`shortans/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#66cc00'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                            else if(item.type === 'multi'){
                                                return(
                                                    <Link to = {`multiplechoice/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#0080ff'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                        })
                                    }
                                    </td>
                                </tr>
                                <tr>
                                    <td><span className="bull">&bull;</span> <span className="tr1">Math</span></td>
                                    <td>
                                    {
                                        mathproblem.map((item,idx)=>{
                                            if (idx > 8) return false;

                                            if(item.type === 'programming'){
                                                return(
                                                    <Link to = {`codeproblems/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#FE88A0'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                            else if(item.type === 'shortan'){
                                                return(
                                                    <Link to = {`shortans/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#66cc00'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                            else if(item.type === 'multi'){
                                                return(
                                                    <Link to = {`multiplechoice/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#0080ff'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                        })
                                    }

                                    </td>
                                </tr>
                                <tr>
                                    <td><span className="bull">&bull;</span> <span className="tr1">Algorithm</span></td>
                                    <td>
                                    {
                                        algoproblem.map((item,idx)=>{
                                            if (idx > 8) return false;

                                            if(item.type === 'programming'){
                                                return(
                                                    <Link to = {`codeproblems/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#FE88A0'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                            else if(item.type === 'shortan'){
                                                return(
                                                    <Link to = {`shortans/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#66cc00'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                            else if(item.type === 'multi'){
                                                return(
                                                    <Link to = {`multiplechoice/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#0080ff'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                        })
                                    }
                                    </td>
                                </tr>
                                <tr>
                                    <td><span className="bull">&bull;</span> <span className="tr1">String</span></td>
                                    <td>
                                    {
                                        strproblem.map((item,idx)=>{
                                            if (idx > 8) return false;

                                            if(item.type === 'programming'){
                                                return(
                                                    <Link to = {`codeproblems/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#FE88A0'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                            else if(item.type === 'shortan'){
                                                return(
                                                    <Link to = {`shortans/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#66cc00'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                            else if(item.type === 'multi'){
                                                return(
                                                    <Link to = {`multiplechoice/view?id=${item.ID}`}> 
                                                       <span style ={{color:'#0080ff'}}> {item.ID} &nbsp; </span>
                                                    </Link>
                                                );
                                            }
                                        })
                                    }
                                    </td>
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
    margin-top : 50px;
    margin-bottom:30px;
    flex: 0 0 1000px;

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
                        height:250px;
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

