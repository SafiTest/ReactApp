import React from "react"
import { withRouter, Redirect } from "react-router-dom"
import { Layout, Menu, Col, Row, Avatar, Button} from "antd"
import ContentPage from "./content"
import HeaderPage from "./header"
import FooterPage from "./footer"
import './../Styles/custom.css'
import { CaretDownOutlined, LogoutOutlined } from '@ant-design/icons';
import { ROUTES } from "../routing/routeConstants"


const { SubMenu } = Menu;

const { Header, Content ,Footer } = Layout;
class LayoutArea extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    isLogin:false,
    isRegistration:false,
    }
}
  clkLogin = () => {
    this.props.history.push({ pathname: ROUTES.LOGIN })
	}

  clkRegistration = () => {
    this.props.history.push({ pathname: ROUTES.REGISTRATION })
	}
  clkForgotPassword = () => {
    this.props.history.push({ pathname: ROUTES.FORGOTPASSWORD })
	}

  handleRegister =() =>{
    this.props.history.push({ pathname: ROUTES.REGISTRATION })
  }
  handleLogout =()=>{
    debugger
    localStorage.clear();
    alert("Logout successfully")
    this.props.history.push({ pathname: ROUTES.LOGIN })
  }
	render() {
    let userdetails = localStorage.getItem("User_name");
    let useremail = localStorage.getItem("User_email");
    console.log('user details',userdetails, useremail);
		return (
			<>
					<Layout   className="layout publiclayout">
						<Header  id="publiclayout">
              <Row>
                <Col span={14}>
						<div className="logo" onClick={(e) => { this.handleRegister() }}/>
            </Col>
            {userdetails === null ? 
            <Col span={2} offset={8} style={{marginTop:15}}>
							  <Menu
        theme="dark"
		mode="horizontal"
      >
        {/* <SubMenu key="1" title="ABOUT US" className='menu-option-header' icon={<CaretDownOutlined />}>
          <Menu.Item key="2" className='menu-option-child'>About Us</Menu.Item>
          <Menu.Item key="3" className='menu-option-child'>Distinguished Alumni Awards</Menu.Item>
          <Menu.Item key="5" className='menu-option-child'>Departments and centers</Menu.Item>
          <Menu.Item key="6" className='menu-option-child'>Constitution</Menu.Item>
        </SubMenu>
        <SubMenu key="7" title="MEMBERS"  className='menu-option-header' icon={<CaretDownOutlined />}>
          <Menu.Item key="8" className='menu-option-child'>ACTAA Office Bearers</Menu.Item>
          <Menu.Item key="9" className='menu-option-child'>Lifetime Members</Menu.Item>
          <Menu.Item key="10" className='menu-option-child'>Patron Members</Menu.Item>
          <Menu.Item key="11" className='menu-option-child'>Prepaid Members</Menu.Item>
        </SubMenu>
        <SubMenu key="12" title="CONNECT" className='menu-option-header' icon={<CaretDownOutlined />}>
          <Menu.Item key="13" className='menu-option-child'>Internships & Jobs</Menu.Item>
          <Menu.Item key="14" className='menu-option-child'>ACTECH Entrepreneurs Club1</Menu.Item>
          <Menu.Item key="15" className='menu-option-child'>Alumni Business Directory</Menu.Item>
          <Menu.Item key="16" className='menu-option-child'>Add Listing</Menu.Item>
          <Menu.Item key="17" className='menu-option-child'>Discussion Forum</Menu.Item>
          <Menu.Item key="18" className='menu-option-child'>Poll</Menu.Item>
          <Menu.Item key="19" className='menu-option-child'>Surveys</Menu.Item>
        </SubMenu>
        <SubMenu key="20" title="EVENTS" className='menu-option-header' icon={<CaretDownOutlined />}>
          <Menu.Item key="21" className='menu-option-child'>All Events</Menu.Item>
          <Menu.Item key="22" className='menu-option-child'>Alumni Meet</Menu.Item>
          <Menu.Item key="23" className='menu-option-child'>AC Tech Anniversary</Menu.Item>
        </SubMenu>
        <SubMenu key="24" title="SUPPORT" className='menu-option-header' icon={<CaretDownOutlined />}>
          <Menu.Item key="25" className='menu-option-child'>Apply for Scholarship</Menu.Item>
          <Menu.Item key="26" className='menu-option-child'>Shop</Menu.Item>
        </SubMenu>
        <SubMenu key="27" title="MEDIA" className='menu-option-header' icon={<CaretDownOutlined />}>
          <Menu.Item key="28" className='menu-option-child'>Blog</Menu.Item>
          <Menu.Item key="29" className='menu-option-child'>News</Menu.Item>
          <Menu.Item key="30" className='menu-option-child'>Gallery</Menu.Item>
        </SubMenu>
		<SubMenu key="31" title="CONTACT" className='menu-option-header' icon={<CaretDownOutlined />}>
          <Menu.Item key="32" className='menu-option-child'>Contact Us</Menu.Item>
        </SubMenu> >*/}
		<SubMenu key="33" title="LOGIN" className='menu-option-header' icon={<CaretDownOutlined />}>
          <Menu.Item key="1" className='menu-option-child hidden'><a onClick={this.clkRegistration} >Registration</a></Menu.Item>
		  <Menu.Item key="37" className='menu-option-child'><a onClick={this.clkLogin} >Login</a></Menu.Item>
     <Menu.Item key="36" className='menu-option-child'><a onClick={this.clkForgotPassword} >Forgot Password</a></Menu.Item>
         </SubMenu>
      </Menu> 
      </Col>
      : null}
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
						<Content>
							<ContentPage/>
						</Content>
						<Footer><FooterPage /></Footer>
					</Layout>
			</>
		)
	}
}
export default (withRouter(LayoutArea))
