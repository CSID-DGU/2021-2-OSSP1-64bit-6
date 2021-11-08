import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';

function MyListContainer(props) {
	return (
		<Wrapper className="all__lists">
			<div className="container">
                <div className="all__lists--header">
					<h3>마이 페이지</h3>
				</div>
				<div className="all__list--listgroup">
					<ul>
                       
						<li className="first"><NavLink exact activeClassName="active"  to ="/mylist">개요</NavLink></li>
						<li className="first"><NavLink activeClassName="active"  to ="/mylist/Wrong">틀린 문제</NavLink></li>
                        <li><NavLink activeClassName="active"  to ="/mylist/Favorite">다시 볼 문제</NavLink></li>
					</ul>
				</div>
			</div>
		</Wrapper>
	);
}
const Wrapper = styled.div`
    flex: 0 0 200px;
    .container{
        box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px;
        border-radius: 4px;
        border: 1px solid #ddd;

        .all__lists--header{
            background: #F5F5F5;
            display: flex;
            padding: 10px 20px;
            justify-content: space-evenly;
            button{
                border: none;
                float: right;
            }
        }
        .all__list--listgroup{
            
            background: #FFFFFF;
            text-align: center;
            line-height: 30px;
           
        }
        .first{
            border-bottom:  1px solid #ddd;
        }
        li{
            .active{
                font-weight: bold;
            }
            padding-top:10px;
            padding-bottom:10px;
        }
    }
   
`;




export default MyListContainer;

