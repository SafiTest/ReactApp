import React from "react"
import "antd/dist/antd.min.css";
import "../Styles/custom.css"
import { Form, Input ,Spin} from "antd"
import { withRouter, Redirect } from "react-router-dom"
import { APIRequest, LoginUser ,ExcelfileRead,Alluser,ForgotPassword} from "./../APIManager"
import { ROUTES } from "../routing/routeConstants";


class Login extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                username:'',
                password:'',
                isLogin:false,
                loading:false
            }
            this.handleSubmit = this.handleSubmit.bind(this);
            this.onChange = this.onChange.bind(this);
    }
    handleSubmit = () =>{
        
        console.log('login')
        let inputData = {
			email: this.state.username,
			password: this.state.password
		}
        console.log('login',inputData)
        let self=this
        self.setState({...this.state,loading:true});
        APIRequest.getPostService(LoginUser, inputData)
			.then((res) => {
                
				if (res.status === 200) {
           console.log('Logged In : ',res)
           alert("Login successfully")
           self.setState({...this.state,isLogin:true,loading:false});
           localStorage.setItem("AcTech_token",res.token)
           localStorage.setItem("User_name", res.result.name)
           localStorage.setItem("User_email", res.result.email)
           let flag="20a5eebb-5247-494c-befe-81a91de7ec96"
           if(res.result.UserFlag==="Admin"){
            flag="b02d1971-7c8c-4ec4-b158-4dc85ba2c9da"
           }
           localStorage.setItem("User_flag", flag)
				}
			})
			.catch((error) => {
//                 
			 console.log(error)
             alert("UserName & Password incorrect please try again")
             self.setState({...this.state,isLogin:false,loading:false});
			}, 2000)
      
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
            }

        componentDidMount() {
      
        let Auth= localStorage.getItem("AcTech_token");
		let flag=false
		if(Auth !=null){
            flag=true
		}
        this.setState({...this.state, isLogin:flag})
        }
    render() {
        
        if (this.state.isLogin) {
			return <Redirect to={{ pathname: ROUTES.APPROVE }} />
		}
        else{

            return (
            	<Spin tip='Loading...' style={{margin:0,padding:0}} spinning={this.state.loading}>
				
<div style={{height: "calc(80vh)"}}>
<div className=" banner-section theme-banner  header-top" >
    <div className="breadcrumbs-container">
        <div className="row">
            <div className="col">
                <div className="">
                    <h1 className="banner__page-title">Login</h1>                   
                     <div className="breadcrumbs-section">
                        <div id="crumbs" className="breadcrumbs"><span typeof="v:Breadcrumb">
                            <a rel="v:url" property="v:title"  className="text-default-color" >Home</a>
                            </span> / <span className="current">Login</span></div>         
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
<Form
    initialvalues={{
        username: this.state.username,
        password: this.state.password,
    }}
      layout='vertical'
      onFinish={this.handleSubmit}
      className='login-form-content'
    >
      <Form.Item
        name="username"
        initialValue={this.state.username}
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input 
        placeholder="email"
        id='username'
        type='email'
        name='username'
        initialvalues={{
            remember: true,
        }}
        onChange={this.onChange}
        defaultValue={this.state.username}
        value={this.state.username}/>
      </Form.Item>

      <Form.Item
        name="password" 
        rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
        ]}
        initialValue={this.state.password}
      >
        <Input.Password  
        id='password'
        type='password'
        placeholder='password'
        name='password'
        onChange={this.onChange}
        defaultValue={this.state.password}
        value={this.state.password}/>
      </Form.Item>

      <Form.Item style={{width:"100%"}} >
        <button 
         type='submit'
         className="login-form-btn"
         >
          Login
        </button>
      </Form.Item>
    </Form>

                </div>
                </Spin>
            )
    }
}
}

export default (withRouter(Login))
