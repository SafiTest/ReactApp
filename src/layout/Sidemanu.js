import React from "react"
import { withRouter, Link } from "react-router-dom"
import { Avatar, Card, Image, Layout, Menu,  } from "antd"
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
    CaretDownOutlined,
    TeamOutlined,
    SettingOutlined,
    EditOutlined,
    EllipsisOutlined,
} from "@ant-design/icons"
import { ROUTES } from "../routing/routeConstants"
const { Sider } = Layout
const { SubMenu } = Menu
const { Meta } = Card;
class SideMenu extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			collapsed: false,
			FullName: "",
			UserProfilePhoto: "",
			Email: "",
            userFlag:"User"
		}
	}
	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		})
	}
    componentDidMount() {
        
       let userflags= localStorage.getItem("User_flag");
       let flag="User"
       if(userflags !=null){
        flag= userflags=="b02d1971-7c8c-4ec4-b158-4dc85ba2c9da"?"Admin":"User"
       }
		this.setState({ ...this.state,userFlag:flag })
	
	}
	render() {
        let userdetails = localStorage.getItem("User_name");
        let email = localStorage.getItem("User_email");
		const { match } = this.props
		const { isVisible } = this.state.collapsed
		return (
			<Layout style={{ minHeight: "92vh" }}>
				<Sider
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
					className='sidebar-menu-items-width'
				>
					{/* {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
						className: "trigger",
						onClick: this.toggle,
					})}
					 */}

				     
<Card
    style={{
      width: 200, 
    }}
    cover={
        <div className="side-menu-logo" />
    }
    // actions={[
    //   <SettingOutlined key="setting" />,
    //   <EditOutlined key="edit" />,
    //   <EllipsisOutlined key="ellipsis" />,
    // ]}
  >
    <Avatar  className="sidebar-span" style={{ backgroundColor: '#f56a00', width:"85px",height:"85px",marginTop:"25px",marginLeft: "48px" ,marginBottom:"10px"}}>{Array.from(userdetails)[0]}</Avatar>
    {/* <Meta
    //   avatar={ <Avatar style={{ backgroundColor: '#f56a00'}}>{Array.from(userdetails)[0]}</Avatar>}
      title="Card title"
      description="This is the description"
    /> */}
    <Meta style={{textAlign:"center"}}
      title={userdetails}
      description={email}
    />
  </Card>
					<div className=''>
                  
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                       
								
                                    <Menu.Item key='1' >
                                  
										<Link to={ROUTES.APPROVE} />
								<span>Approve Users</span>	
									</Menu.Item>
                                   
                                    {this.state.userFlag==="Admin"?(
										<Menu.Item key='2'   >
                                      
											<Link to={ROUTES.PENDING} />
											Pending Users
										</Menu.Item>
                                         ):null}
                                        {this.state.userFlag==="Admin"?(
										<Menu.Item key='3'  >
                                             
											<Link to={ROUTES.REJECT} />
											Rejected User
										</Menu.Item>
                                        ):null}
                                        </Menu>
					</div>
				</Sider>
			</Layout>
		)
	}
}


export default withRouter(SideMenu)
