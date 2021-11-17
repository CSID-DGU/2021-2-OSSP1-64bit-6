import React, {useEffect, useState} from 'react';
import { BiListPlus, BiListMinus } from "react-icons/bi";
import styled from 'styled-components';


function UserRankCard(props) {
    const [isActive, setAtive] = useState(true);
    const [userRank, setUserRank] = useState([]); 
    useEffect(() => {
        const fetchData = async () => {
          let user_name = ['adsf', 'hsadf', 'grgd', 'qwegf', 'rhkswnd', 'bvkfb', 'ewjrhkg', 'gfhfg'];
          let solved_num = [54, 48, 35, 33, 31, 22, 15, 7];

          let temp_user = [];
          for(let i = 1; i <= user_name.length; i++){
            temp_user.push({rank:i, id:user_name[i-1], problem:solved_num[i-1]});
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
                <div className = 'Title'>User Rank</div>
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
                  ? <BiListPlus size="40"/>
                  : <BiListMinus size="40"/>
                }
                </span>
                <div className = 'Body'>
                    {
                        isActive === true
                        ? 
                            <table className="Table">
                                <thead className ="thead">
                                    <tr>
                                        <th className='rank'>Rank</th><th className='userid'>User ID</th><th className='problem'>Num of Solved Problem</th> 
                                    </tr>
                                </thead>
                                <tbody className="tbody">
                                    {
                                        userRank.map((item)=>{
                                            return(
                                                <tr>
                                                    <td className='lowRank'>{item.rank}</td><td>{item.id}</td><td className='lowProblem'>{item.problem}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        :
                            <>
                            <div className='table1_container'>
                                <div className="programming">&bull; 프로그래밍 &bull;</div>
                                <table className ='table1'>
                                    <thead className ="thead">
                                        <tr>
                                            <th className='rank'>Rank</th><th className='userid'>User ID</th><th className='problem'>Num of Solved Problem</th> 
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
                                <div className="multiple">&bull; 객관식 &bull;</div>
                                <table className ='table2'>
                                    <thead className ="thead">
                                        <tr>
                                            <th className='rank'>Rank</th><th className='userid'>User ID</th><th className='problem'>Num of Solved Problem</th> 
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
                                <div className="shortan">&bull; 단답형 &bull;</div>
                                <table className ='table3'>
                                    <thead className ="thead">
                                        <tr>
                                            <th className='rank'>Rank</th><th className='userid'>User ID</th><th className='problem'>Num of Solved Problem</th> 
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
        z-index : 1;
        display:grid;
        width:450px;
        height:490px;
        background-color:#fff;
        border: 3px solid #a0a0a0;
        border-radius:5px;

        grid-template-areas: 
        "A A B D"
        "C C C C";
     
        grid-template-rows: 40px 450px; 
        grid-template-columns: 95px 95px 190px 50px; 

        .Body
        {
            text-align:center;
            padding-left:13px;
            padding-top:30px;
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
                    height:30px;
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
                    height:350px;
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

        grid-template-areas: 
        "A A B D"
        "C C C C";
     
        grid-template-rows: 40px 450px; 
        grid-template-columns: 500px 620px 180px 90px; 
       
        .Body
        {
            text-align: center;
            grid-area : C;

            display:grid;
            grid-template-areas: 
            "A B C";
            border
            grid-template-columns: 463px 463px 463px;  
            
            .table1_container{
                height:445px;
                gird-area:A;
                
                display:flex;
                flex-direction:column;
                justify-content: center;
                align-items: center;
                border-right: #a0a0a0 solid;
               
                .programming {
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }
               
                .table1{
                    width:420px;
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

                .multiple{
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }
                .table2{
                    width:420px;
                    border-collapse: collapse;
    
                }
            }
           
            .table3_container{
                gird-area:C;
                height:445px;

                display:flex;
                flex-direction:column;
                justify-content: center;
                align-items: center;

                .shortan{
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }

                .table3{
                    width:420px;
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
        font-size : 30px;
        padding-top : 10px;
        padding-left : 20px;
    }

    .Info{
        grid-area : B;
        font-size : 17px;
        padding-top : 25px;
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

export default UserRankCard;
