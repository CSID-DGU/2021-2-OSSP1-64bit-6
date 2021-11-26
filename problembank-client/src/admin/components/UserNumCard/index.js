import React,{useEffect,useState} from 'react';
import { IoMdArrowRoundUp ,IoMdArrowRoundDown} from "react-icons/io";
import { GrUserAdd } from "react-icons/gr";
import styled from 'styled-components';
import projectsAPI from '../../../apis/admin/problem';
import problemBankAPI from '../../../apis/problemsBank';



function UserNumCard(props) {
    const [usercnt, setuserCnt] = useState();
    const [userincrease,setuserInc] = useState();

	useEffect(() => {
        const fetchData = async () => {
            const res = await problemBankAPI.getStatusProblem();
            const {data} = res;
            const {userCount} = data;
           
            setuserCnt(userCount.user_Cnt[0].user_cnt);
           
            let user_increase = userCount.user_Cnt[0].user_cnt - userCount.user_Lastday;
            let increase_percentage = user_increase/userCount.user_Lastday * 100;
            if(!Number.isInteger(increase_percentage)) increase_percentage = increase_percentage.toFixed(2);

            setuserInc(increase_percentage);
    
        };
        fetchData();
    }, []);

	return (
        <Wrapper>
            <div className='Card'>
            
                <div className = "Title">Total User</div> 
                <div className = "addIcon"><GrUserAdd size="50"/></div>
              
                <div className='Card-body'>
                    {usercnt}
                </div>

                <div className='ArrowIcon'> 
                        <IoMdArrowRoundUp size= "30" color="red"/> 
                </div>
                <div className='percentage'> {userincrease}%</div>
                <div className='sincefrom'> Since Last Day </div>
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
        "D E G G";

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
            color:red;
            font-weight:bold;
            padding-top:5px;
            padding-left:15px;
        }

        .sincefrom{
            grid-area: G;
            padding-top:5px;
            color:#a0a0a0
        }
        
    }


`

export default UserNumCard;
