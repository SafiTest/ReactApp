import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Col, Row } from "antd"
import { Header } from "antd/lib/layout/layout"
import React from "react"
import { ROUTES } from "../routing/routeConstants";

class headerArea extends React.Component {
	
	constructor(props) {
		debugger
		super(props);
		
	}
	handleLogout =()=>{
		debugger
		localStorage.clear();
		alert("Logout successfully")
		this.props.props.history.push({ pathname: ROUTES.LOGIN })
	  }
	render() {
		let userdetails = localStorage.getItem("User_name");
		return (
			<div style={{width:"100%"}}>
					<Header>
              <Row>
				
                <Col span={14}>
						{/* <div className="logo" onClick={(e) => { this.handleRegister() }}/> */}
            </Col>
          
        {userdetails !== null ? 
       
      <Col span={2}offset={8} style={{marginTop:5}}>
      <Avatar style={{ backgroundColor: '#f56a00', marginRight:10 }}>{Array.from(userdetails)[0]}</Avatar>
      <LogoutOutlined 
      style={{ color: 'rgb(151 149 147)', marginLeft: '10px', fontSize: 'large'}}
         onClick={(e) => { this.handleLogout() }}
         />
        </Col>
         : null }
      </Row>
						</Header>
			</div>
		)
	}
}

export default headerArea

