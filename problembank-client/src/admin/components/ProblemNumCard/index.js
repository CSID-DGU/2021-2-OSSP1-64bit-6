import React from 'react';
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { GrUserAdd } from "react-icons/gr";
import { FcOk } from "react-icons/fc";
import styled from 'styled-components';

function ProblemNumCard(props) {
	
	return (
        <Wrapper>
            <div className='Card'>
            
                <div className = "Title">Solved Problem</div> 
                <div className = "solvedIcon"><FcOk size="45"/></div>
              
                <div className='Card-body1'>234 </div>
                <div className='Card-body2'>today</div>

                <div className='ArrowIcon'> <IoMdArrowRoundDown size= "30" color="blue"/> </div>
                <div className='percentage'> 5.24%</div>
                <div className='sincefrom'> Since From Month </div>
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
        "C C H ."
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
 
        .solvedIcon{
             grid-area: B;
             padding-left:15px;
             padding-top:10px;

        }
        
        .Card-body1{
            grid-area: C;
            font-size:50px;
            padding-top:5px;
            padding-left:30px;
        }
        .Card-body2{
            grid-area: H;
            font-size:20px;
        }

        .ArrowIcon{
            grid-area: D;
            padding-left:30px;
        }

        .percentage{
            grid-area: E;
            color:blue;
            font-weight:bold;
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

export default ProblemNumCard;