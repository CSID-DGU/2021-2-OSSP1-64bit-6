import React, {useEffect, useState} from 'react';
import { BiListPlus, BiListMinus } from "react-icons/bi";
import styled from 'styled-components';


function UserRankCard(props) {
    const [isActive, setAtive] = useState(true);
    const [userRank, setUserRank] = useState([]); 
    useEffect(() => {
        const fetchData = async () => {
          let user_name = ['adsf', 'hsadf', 'grgd', 'qwegf', 'rhkswnd', 'bvkfb', 'ewjrhkg'];
          let solved_num = [54, 48, 35, 33, 31, 22, 15];

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
                <div className = 'Table'>
                    {
                        isActive === true
                        ? 
                            <table>
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
                        :
                            <>
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

        .Table
        {
            text-align:center;
            padding-left:13px;
            padding-top:30px;
            grid-area : C;

            .tbody{
                height:300px;
            }
            .thead{
                height:30px;
                .rank{
                    width:50px;
                }
                .userid{
                    width:150px;
                }
                .problem{
                    width:250px;
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
       
        .Table
        {
            text-align:center;
            grid-area : C;

            display:grid;
            grid-template-areas: 
            "a b c"
            "A B C";
            grid-template-rows: 30px;
            grid-template-columns: 463px 463px 463px;  
            
            .programming {
                padding-top:20px;
                grid-area:a;
                font-size:22px;
                font-weight:bold;
               
            }
            .multiple{
                padding-top:20px;
                grid-area:b;
                font-size:22px;
                font-weight:bold;
            }
            .shortan{
                padding-top:20px;
                grid-area:c;
                font-size:22px;
                font-weight:bold;
            }
            .table1{
                gird-area:A;
                place-self: center center;
                width:400px;
            }
            .table2{
                gird-area:B;
                place-self: center center;
                width:400px;

            }
            .table3{
                gird-area:C;
                place-self: center center;
                width:400px;

            }

            .tbody{
                height:300px;
            }
            .thead{
                height:30px;
                .rank{
                    width:50px;
                }
                .userid{
                    width:150px;
                }
                .problem{
                    width:250px;
                }
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
