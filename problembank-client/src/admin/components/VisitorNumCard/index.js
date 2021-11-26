import React, {useEffect,useState} from 'react';
import { IoMdArrowRoundUp, IoMdArrowRoundDown } from "react-icons/io";
import { GrDocumentUser } from "react-icons/gr";
import styled from 'styled-components';
import projectsAPI from '../../../apis/admin/problem';
import problemBankAPI from '../../../apis/problemsBank';

function VisitorNumCard(props) {

    const [todayVisitor, setTodayVisitor] = useState();
    const [visitorInc,setvisitorInc] = useState();
    const [isPlus, setisPlus] = useState();

	useEffect(() => {
        const fetchData = async () => {
            const res = await problemBankAPI.getStatusProblem();
            const {data} = res;
            const {visitor} = data;
           
            setTodayVisitor(visitor.visitor_Today);

            let visitor_increase = visitor.visitor_Today - visitor.visitor_Lastday;
            let increase_percentage = visitor_increase / visitor.visitor_Lastday * 100;

            if (increase_percentage >= 0) setisPlus(true);
            else setisPlus(false);

            if(!Number.isInteger(increase_percentage)) increase_percentage = increase_percentage.toFixed(2);
            setvisitorInc(Math.abs(increase_percentage));
        };
        fetchData();
    }, []);

	return (
        <Wrapper>
            <div className='Card'>
            
                <div className = "Title">Today Visitor</div> 
                <div className = "addIcon"><GrDocumentUser size="45"/></div>
              
                <div className='Card-body'>
                    {todayVisitor}
                </div>

                <div className='ArrowIcon'>   
                    {
                        isPlus
                        ?  <IoMdArrowRoundUp size= "30" color="red"/> 
                        :  <IoMdArrowRoundDown size= "30" color="blue"/> 
                    } 
                </div>
                <div className={isPlus? 'Plus-percentage':'Minus-percentage'}> {visitorInc}%</div>
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

        .Plus-percentage{
            grid-area: E;
            color:red;
            font-weight:bold;
            padding-top:5px;
            padding-left:15px;
        }

        .Minus-percentage{
            grid-area: E;
            color:blue;
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

export default VisitorNumCard;
