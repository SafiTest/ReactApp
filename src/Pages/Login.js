import React from "react"
import "antd/dist/antd.min.css";
import "../Styles/custom.css"
import { Form, Input } from "antd"
import { withRouter, Redirect } from "react-router-dom"
import { APIRequest, LoginUser ,ExcelfileRead,Alluser,ForgotPassword} from "./../APIManager"


class Login extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                username:'',
                password:'',
                isLogin:false
            }
            this.handleSubmit = this.handleSubmit.bind(this);
            this.onChange = this.onChange.bind(this);
    }
    handleSubmit = () =>{
        debugger
        console.log('login')
        let inputData = {
			email: this.state.username,
			password: this.state.password
		}
      
    //     APIRequest.getPostService(ExcelfileRead, inputData)
    //     .then((result) => {
    //         debugger
    //         if (result.status === 200) {
    //    console.log('Logged In : ',result)
    //         }
    //     })
    //     .catch((error) => {
    //         debugger
    //      console.log(error)
    //     }, 2000)
        console.log('login',inputData)
        let self=this
        APIRequest.getPostService(LoginUser, inputData)
			.then((res) => {
                debugger
				if (res.status === 200) {
           console.log('Logged In : ',res)
           alert("Login successfully")
           self.setState({...this.state,isLogin:true});
           localStorage.setItem("AcTech_token",res.token)
           localStorage.setItem("User_name", res.result.name)
           localStorage.setItem("User_email", res.result.email)
				}
			})
			.catch((error) => {
//                 debugger
			 console.log(error)
             alert("UserName & Password incorrect please try again")
             self.setState({...this.state,isLogin:false});
			}, 2000)
      
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value});
            }

        componentDidMount() {
        this.setState({...this.state})
        }
    render() {
        if (this.state.isLogin) {
			return <Redirect to={{ pathname: "tableList" }} />
		}

            return (
            
<div style={{height: "calc(80vh)"}}>
<div className=" banner-section theme-banner " >
    <div className="breadcrumbs-container">
        <div className="row">
            <div className="col">
                <div className="banner-content">
                    <h1 className="banner__page-title">Login</h1>                   
                     <div className="breadcrumbs-section">
                        <div id="crumbs" className="breadcrumbs"><span typeof="v:Breadcrumb">
                            <a rel="v:url" property="v:title" >Home</a>
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
        placeholder="username"
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

      <Form.Item >
        <button 
         type='submit'
         className="login-form-btn"
         >
          Login
        </button>
      </Form.Item>
    </Form>

                </div>
                
            )
    }
}

export default (withRouter(Login))
