import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import { FcDataRecovery } from "react-icons/fc";
import projectsAPI from '../../../apis/admin/problem';
import problemBankAPI from '../../../apis/problemsBank';

function TotalProblemCard(props) {
    const [problemCnt, setproblemCnt] = useState();
    const [programmingCnt,setprogrammingCnt] = useState();
    const [multipleCnt,setmultipleCnt] = useState();
    const [shortanCnt,setshortanCnt] = useState();


	useEffect(() => {
        const fetchData = async () => {
            const res = await problemBankAPI.getStatusProblem();
            const {data} = res;
            const {problemCount} = data;
           
            setproblemCnt(problemCount.all_Problem_Count);
            setprogrammingCnt(problemCount.coding_Count);
            setmultipleCnt(problemCount.mul_Count);
            setshortanCnt(problemCount.short_Count);
        };
        fetchData();
    }, []);

	return (
        <Wrapper>
            <div className='Card'>
            
                <div className = "Title">Total Problem</div> 
                <div className = "addIcon"><FcDataRecovery size="48"/></div>
              
                <div className='Card-body'>
                    {problemCnt}
                </div>
                <div className='percentage'> Programming({programmingCnt}) + Multiple({multipleCnt}) + Shortan({shortanCnt})</div>
            </div>
        </Wrapper>
	);
}

const Wrapper = styled.div`
  
    .Card{
        display:grid;
        width:300px;
        height:160px;
        background-color:#fff;
        border: 3px solid #a0a0a0;
        border-radius:5px;

        grid-template-areas: 
        "A A A B"
        "C C . B"
        "C C . ."
        "E E E E";

        grid-template-rows: 40px 40px 40px 40px;
        grid-template-columns: 50px 90px 70px 80px;

       
        .Title{
             grid-area: A;
             font-size:23px;
             font-weight:bold;
             padding-left:30px;
             padding-top:13px;
        }
 
        .addIcon{
             grid-area: B;
             padding-top:10px;

        }
        
        .Card-body{
            grid-area: C;
            font-size:50px;
            padding-top:5px;
            padding-left:30px;
        }

        .ArrowIcon{
            grid-area: D;
            padding-left:30px;
        }

        .percentage{
            grid-area: E;
            color:#a0a0a0;
            font-size:12px;
            //font-weight:bold;
            padding-top:5px;
            padding-left:20px;
        }

        .sincefrom{
            grid-area: G;
            padding-top:5px;
            color:#a0a0a0
        }
        
    }


`

export default TotalProblemCard;
