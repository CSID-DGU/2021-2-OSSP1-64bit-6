import React, {useEffect, useState} from 'react';
import { BiListPlus, BiListMinus } from "react-icons/bi";
import styled from 'styled-components';


function WrongRateCard(props) {
    const [isActive, setAtive] = useState(true);
    const [userRank, setUserRank] = useState([]); 
    useEffect(() => {
        const fetchData = async () => {
          let problem_id = ['adsf', 'hsadf', 'grgd', 'qwegf', 'rhkswnd', 'bvkfb', 'ewjrhkg', 'gfhfg'];
          let solved_num = [54, 48, 35, 33, 31, 22, 15, 7];

          let temp_user = [];
          for(let i = 1; i <= 8; i++){
            temp_user.push({rank:i, id:problem_id[i-1], problem:solved_num[i-1]});
          }
          setUserRank(temp_user);
        };
        fetchData();
    }, []);

    const handleSize = async(act) => {
        setAtive(!act)
    }

	return (
        <Wrapper>
            <div className={isActive ? 'Card':'Big-Card'}>
                <div className = 'Title'>Wrong Rate</div>
                <div className = 'Info'>
                {
                    isActive === true
                    ? <>more info...</>
                    : <>less info...</>
                }
                </div>
                <span onClick={() => handleSize(isActive)} className = 'PlusIcon'> 
                {
                  isActive === true
                  ? <BiListPlus size="30"/>
                  : <BiListMinus size="30"/>
                }
                </span>
                <div className = 'Body'>
                    {
                        isActive === true
                        ? 
                            <table className="Table">
                                <thead className ="thead">
                                    <tr>
                                        <th className='rank'>Rank</th><th className='userid'>problem ID</th><th className='problem'>Wrong Answer Rate</th> 
                                    </tr>
                                </thead>
                                <tbody className="tbody">
                                    {
                                        userRank.map((item,idx)=>{
                                            if(idx<3)
                                            {
                                            return(
                                                <tr>
                                                    <td className='lowRank'>{item.rank}</td><td>{item.id}</td><td className='lowProblem'>{item.problem}</td>
                                                </tr>
                                            );
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                        :
                            <>
                            <div className='table1_container'>
                                <div className="implementation">&bull; Implementation &bull;</div>
                                <table className ='table1'>
                                    <thead className ="thead">
                                        <tr>
                                             <th className='rank'>Rank</th><th className='userid'>problem ID</th><th className='problem'>Wrong Answer Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {
                                            userRank.map((item)=>{
                                                return(
                                                    <tr>
                                                        <td>{item.rank}</td><td>{item.id}</td><td>{item.problem}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='table2_container'>
                                <div className="datastructure">&bull; Data Structure &bull;</div>
                                <table className ='table2'>
                                    <thead className ="thead">
                                        <tr>
                                          <th className='rank'>Rank</th><th className='userid'>problem ID</th><th className='problem'>Wrong Answer Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {
                                            userRank.map((item)=>{
                                                return(
                                                    <tr>
                                                        <td>{item.rank}</td><td>{item.id}</td><td>{item.problem}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='table3_container'>
                                <div className="math">&bull; Math &bull;</div>
                                <table className ='table3'>
                                    <thead className ="thead">
                                        <tr>
                                            <th className='rank'>Rank</th><th className='userid'>problem ID</th><th className='problem'>Wrong Answer Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {
                                            userRank.map((item)=>{
                                                return(
                                                    <tr>
                                                        <td>{item.rank}</td><td>{item.id}</td><td>{item.problem}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='table4_container'>
                                <div className="algorithm">&bull; Algorithm &bull;</div>
                                <table className ='table1'>
                                    <thead className ="thead">
                                        <tr>
                                             <th className='rank'>Rank</th><th className='userid'>problem ID</th><th className='problem'>Wrong Answer Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {
                                            userRank.map((item)=>{
                                                return(
                                                    <tr>
                                                        <td>{item.rank}</td><td>{item.id}</td><td>{item.problem}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='table5_container'>
                                <div className="string">&bull; String &bull;</div>
                                <table className ='table1'>
                                    <thead className ="thead">
                                        <tr>
                                             <th className='rank'>Rank</th><th className='userid'>problem ID</th><th className='problem'>Wrong Answer Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {
                                            userRank.map((item)=>{
                                                return(
                                                    <tr>
                                                        <td>{item.rank}</td><td>{item.id}</td><td>{item.problem}</td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            </>
                    }
                </div>
            </div>
        </Wrapper>
	);
}

const Wrapper = styled.div`
    .Card{
        z-index : 0;
        display:grid;
        width:450px;
        height:240px;
        background-color:#fff;
        border: 3px solid #a0a0a0;
        border-radius:5px;
        font-size: medium;
        position: relative;
        top:10px;

        grid-template-areas: 
        "A A B D"
        "C C C C";
     
        grid-template-rows: 40px 450px; 
        grid-template-columns: 95px 95px 190px 50px; 

        .Body
        {
            text-align:center;
            padding-left:13px;
            padding-top:20px;
            grid-area : C;

           .Table{
                border-collapse: collapse;
                width:420px;
                
                th{
                    color:white;
                    font-weight:500;
                    border-top:none;
                    background-color:#1A1351;
                    border-bottom:3px solid #1A1351;
                }

                .thead{
                    height:10px;
                    font-size:15px;
                    .rank{
                        width:85px;
                        border-top-left-radius:5px;
                    }
                    .userid{
                        width:130px;
                    }
                    .problem{
                        width:205px;
                        border-top-right-radius:5px;
                    }
                }
    
                .tbody{
                    height:100px;
                }
                .tbody tr:nth-child(2n){
                    background-color:#f7f7f7;
                    cursor:default;
                }
                .tbody tr:nth-child(2n+1){
                    background-color:#fff;
                    cursor:default;
                }
                .tbody tr:nth-child(8) .lowRank {
                    border-bottom-left-radius:5px;
                }
                .tbody tr:nth-child(8) .lowPank {
                    border-bottom-right-radius:5px;
                }
            }
        }
    }

    .Big-Card{
        z-index : 99;
        display:grid;
        width:1390px;
        height:490px;
        background-color:#fff;
        border: 3px solid #a0a0a0;
        border-radius:5px;
        position: relative;
        right:460px;
        bottom:240px;
        
        grid-template-areas: 
        "A A A B D"
        "C C C C C";
     
        grid-template-rows: 40px 450px; 
        grid-template-columns: 360px 360px 360px 180px 70px; 
       
        .Body
        {
            text-align: center;
            grid-area : C;

            display:grid;
            grid-template-areas: 
            "A B C D E";
            border
            grid-template-columns: 278px 278px 278px 278px 278px;  
            
            .table1_container{
                height:445px;
                grid-area:A;
                
                display:flex;
                flex-direction:column;
                justify-content: center;
                align-items: center;
                border-right: #a0a0a0 solid;
                padding-right:5px;
                padding-left:15px;
                .implementation {
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }
               
                .table1{
                   
                    width:250px;
                    border-collapse: collapse;
                }
            }
           
            .table2_container{
                height:445px;
                grid-area:B;

                display:flex;
                flex-direction:column;
                justify-content: center;
                align-items: center;
                border-right: #a0a0a0 solid;
                padding-right:5px;
                padding-left:5px;

                .datastructure{
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }
                .table2{
                    width:250px;
                    border-collapse: collapse;
    
                }
            }
           
            .table3_container{
                height:445px;
                grid-area:C;

                display:flex;
                flex-direction:column;
                justify-content: center;
                align-items: center;
                border-right: #a0a0a0 solid;
                padding-right:5px;
                padding-left:5px;

                .math{
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }

                .table3{
                    width:250px;
                    border-collapse: collapse;
                }
            }

            .table4_container{
                height:445px;
                grid-area:D;

                display:flex;
                flex-direction:column;
                justify-content: center;
                align-items: center;
                border-right: #a0a0a0 solid;
                padding-right:5px;
                padding-left:5px;

                .algorithm{
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }

                .table4{
                    width:250px;
                    border-collapse: collapse;
                }
            }

            .table5_container{
                height:445px;
                grid-area:E;

                display:flex;
                flex-direction:column;
                justify-content: center;
                align-items: center;
                
                padding-left:5px;
                
                .string{
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }

                .table5{
                    width:250px;
                    border-collapse: collapse;
                }
            }
           
        
            th{
                color:white;
                font-weight:500;
                border-top:none;
                background-color:#1A1351;
                border-bottom:3px solid #1A1351;
            }
        
            .thead{
                height:30px;
                .rank{
                    width:100px;
                    border-top-left-radius:5px;
                    
                }
                .userid{
                    width:150px;
                }
                .problem{
                    width:250px;
                    border-top-right-radius:5px;
                }
            }

            .tbody{
                height:300px;
            }
            .tbody tr:nth-child(2n){
                background-color:#f7f7f7;
                cursor:default;
            }
            .tbody tr:nth-child(2n+1){
                background-color:#fff;
                cursor:default;
            }
            .tbody tr:nth-child(8) .lowRank {
                border-bottom-left-radius:5px;
            }
            .tbody tr:nth-child(8) .lowPank {
                border-bottom-right-radius:5px;
            }
        }
    
    }

    
    .Title{
        grid-area : A;
        font-weight : bold;
        font-size : 25px;
        padding-top : 10px;
        padding-left : 20px;
    }

    .Info{
        grid-area : B;
        font-size : 17px;
        padding-top : 20px;
        padding-left : 100px;
        color : #a0a0a0;
        //place-self: end end;
    }
    .PlusIcon{
        grid-area : D;
        padding-top:15px;
        padding-left:5px;
        cursor:pointer;

    }
`

export default WrongRateCard;
