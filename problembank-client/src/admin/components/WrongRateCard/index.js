import React, {useEffect, useState} from 'react';
import { BiListPlus, BiListMinus } from "react-icons/bi";
import styled from 'styled-components';
import problemBankAPI from '../../../apis/problemsBank';


function WrongRateCard(props) {
    const [isActive, setAtive] = useState(true);
    const [incorectRank, setIncorrectRank] = useState([]); 
    const [impRank, setImpRank] = useState([]);
    const [dataRank, setDataRank] = useState([]);
    const [mathRank, setMathRank] = useState([]);
    const [algoRank, setAlgoRank] = useState([]);
    const [strRank, setStrRank] = useState([]); 
    useEffect(() => {
        const fetchData = async () => {
            const fetchData = async () => {
                const res = await problemBankAPI.getStatusProblem();
                const {data} = res;
                const {rankAll,rankImp,rankStr,rankData,rankMath,rankAlgo} = data;
                setIncorrectRank(rankAll.incoArray);
                setImpRank(rankImp.incoImpArray);
                setDataRank(rankData.incoDataArray);
                setMathRank(rankMath.incoMathArray);
                setAlgoRank(rankAlgo.incoAlgoArray);
                setStrRank(rankStr.incoStrArray);
                };
                fetchData();
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
                                        <th className='rank'>Rank</th><th className='userid'>problem ID</th><th className='problem'>Correct Answer Rate(%)</th> 
                                    </tr>
                                </thead>
                                <tbody className="tbody">
                                    {
                                       incorectRank.map((item,idx)=>{
                                        if(idx<4)
                                        {
                                        return(
                                            <tr>
                                                <td className='lowRank'>{idx+1}</td><td>{item.nn}</td><td className='lowProblem'>{item.aa}</td>
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
                                             <th className='rank'>Rank</th><th className='userid'>problem ID</th><th className='problem'>Correct<br/> Answer Rate(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {
                                             impRank.map((item,idx)=>{
                                                if(idx<8)
                                                {
                                                return(
                                                    <tr>
                                                        <td className='lowRank'>{idx+1}</td><td>{item.pp}</td><td className='lowProblem'>{item.aa}</td>
                                                    </tr>
                                                );
                                                }
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
                                          <th className='rank'>Rank</th><th className='userid'>problem ID</th><th className='problem'>Correct<br/> Answer Rate(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {
                                           dataRank.map((item,idx)=>{
                                            if(idx<8)
                                            {
                                            return(
                                                <tr>
                                                    <td className='lowRank'>{idx+1}</td><td>{item.pp}</td><td className='lowProblem'>{item.aa}</td>
                                                </tr>
                                            );
                                            }
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
                                            <th className='rank'>Rank</th><th className='userid'>problem ID</th><th className='problem'>Correct<br/> Answer Rate(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {
                                          mathRank.map((item,idx)=>{
                                            if(idx<8)
                                            {
                                            return(
                                                <tr>
                                                    <td className='lowRank'>{idx+1}</td><td>{item.pp}</td><td className='lowProblem'>{item.aa}</td>
                                                </tr>
                                            );
                                            }
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='table4_container'>
                                <div className="algorithm">&bull; Algorithm &bull;</div>
                                <table className ='table4'>
                                    <thead className ="thead">
                                        <tr>
                                             <th className='rank'>Rank</th><th className='userid'>problem ID</th><th className='problem'>Correct<br/> Answer Rate(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {
                                           algoRank.map((item,idx)=>{
                                            if(idx<8)
                                            {
                                            return(
                                                <tr>
                                                    <td className='lowRank'>{idx+1}</td><td>{item.pp}</td><td className='lowProblem'>{item.aa}</td>
                                                </tr>
                                            );
                                            }
                                        })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='table5_container'>
                                <div className="string">&bull; String &bull;</div>
                                <table className ='table5'>
                                    <thead className ="thead">
                                        <tr>
                                             <th className='rank'>Rank</th><th className='userid'>problem ID</th><th className='problem'>Correct<br/> Answer Rate(%)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="tbody">
                                        {
                                           strRank.map((item,idx)=>{
                                            if(idx<8)
                                            {
                                            return(
                                                <tr>
                                                    <td className='lowRank'>{idx+1}</td><td>{item.pp}</td><td className='lowProblem'>{item.aa}</td>
                                                </tr>
                                            );
                                            }
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
        width:470px;
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
        grid-template-columns: 95px 95px 220px 50px; 

        .Body
        {
            text-align:center;
            padding-left:16px;
            padding-top:11px;
            grid-area : C;

           .Table{
                border-collapse: collapse;
                width:430px;
                
                th{
                    color:white;
                    font-weight:500;
                    border-top:none;
                    background-color:#1A1351;
                    border-bottom:3px solid #1A1351;
                }

                .thead{
                    font-size:15px;
                    tr{
                        height:40px;
                    }
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
        grid-template-columns: 360px 360px 360px 230px 70px; 
       
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
              
                .implementation {
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }
               
                .table1{
                    width:260px;
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

                .datastructure{
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }
                .table2{
                    width:260px;
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

                .math{
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }

                .table3{
                    width:260px;
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
 

                .algorithm{
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }

                .table4{
                    width:260px;
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
                
                .string{
                    font-size:20px;
                    font-weight:bold;
                    padding-bottom:10px;
                }

                .table5{
                    width:260px;
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
        color : #a0a0a0;
        place-self: end end;
    }
    .PlusIcon{
        grid-area : D;
        padding-top:7px;
        cursor:pointer;
        place-self: start start;

    }
`

export default WrongRateCard;
