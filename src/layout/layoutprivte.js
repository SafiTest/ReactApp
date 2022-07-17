
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu } from 'antd';
  import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routing/routeConstants';
  import ContentPage from "../routing/PrivateContent"
  import Sidemanu from "./Sidemanu"
  import HeaderPage from "./header"
  const { Header, Sider, Content } = Layout;
  
  const App = (props) => {
    
    const [collapsed, setCollapsed] = useState(false);
    useEffect(()=>{
        
        var element = document.getElementById("publiclayout");
  element.classList.add("hidden");
  element.classList.add("privatelayout");
    },[])
    return (
      <Layout>
        <Sider className='transbox-body-sidebar-bg default-backgroundColor sidebar-scroll-overflow-auto sidebar-width-radius'>
        <Sidemanu/>
        </Sider>
        <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
              position:'sticky' ,top:0 ,width:"100%" ,zIndex:1
          }}
        >
         <HeaderPage props={props}/>
        
        </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            // overflow: 'scroll' 
            }}
          >
           	<ContentPage/>
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default App;