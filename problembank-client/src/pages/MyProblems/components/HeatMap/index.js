import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import problemBankAPI from '../../../../apis/problemsBank';


function Heatmap(props) {
	const user = useSelector((state) => state.user);
	const [date_count_state, set_date_count] = useState([]);
    const [max_date_count, set_max_date] = useState();

    const [today_date, set_today] = useState();
    const [old_date, set_old] = useState();

	useEffect(() => {
		const fetchData = async () => {
            const res = await problemBankAPI.getStatusProblem();
            const {data} = res;
            const {heatmap} = data;
     
            set_max_date(heatmap.con_heat[0].maxcon);

            let value =[];
            for(let i = 0; i < heatmap.count_heat.length; i++){
                value.push({date: heatmap.count_heat[i].submit_time2, count:parseInt(heatmap.count_heat[i].cnt)});
            }           
            
            set_date_count(value);

            let today = new Date();
            let todayString =  today.getFullYear() + '/' + ('0' + (today.getMonth() + 1)).slice(-2) +'/' + ('0' + today.getDate()).slice(-2);
            set_today(todayString);
            
            today.setMonth(today.getMonth()-9);
            let oldString = today.getFullYear() + '/' + ('0' + (today.getMonth() + 1)).slice(-2) +'/' + ('0' + today.getDate()).slice(-2);
            set_old(oldString);

		};
		fetchData();
	}, []);

    
	return (
        <Wrapper>
            <div className="contanier">
                <h2 className="header">&bull; 최대 연속 문제 해결 일수 : {max_date_count}일</h2>
                <div className="heatmap">
                    <HeatMap 
                        value={date_count_state} 
                        startDate={new Date(old_date)} 
                        endDate={new Date(today_date)} 
                        width={850}
                        height={200}
                        rectSize = {18}
                        legendCellSize={0}
                        panelColors={{
                            0:'#e0e0e0', 8: '#7BC96F', 4: '#C6E48B', 12: '#239A3B', 32: '#196127'
                        }}
                        rectProps={{
                            rx: 5
                        }}
                        rectRender={(props, data) => {
                            return (
                                <Tooltip key={props.key} placement="top" content={`| Date : ${data.date}  | Count : ${data.count || 0} |`}>
                                    <rect {...props} />
                                </Tooltip>
                        );}
                        }
                    />
                </div>
            </div>
        </Wrapper>
	);
}

const Wrapper = styled.div`
{
    .contanier{
        margin-bottom:50px;
        border-radius: 20px;
        border: 3px solid #a0a0a0;
        background: #F5F5F5;

        .heatmap{
            padding-top:5px;
            padding-left:65px;
        }
        .header{
            padding : 20px 30px;
            padding-bottom : 10px;
        }
    }

}
`;
export default Heatmap;

