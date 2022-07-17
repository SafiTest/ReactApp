import { Form, Input,Spin } from "antd"
import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom";
import { ROUTES } from "../routing/routeConstants";
import { APIRequest, LoginUser ,ExcelfileRead,Alluser,ForgotPassword} from "./../APIManager"


const ForgotPasswords=()=>{
  const [form] = Form.useForm();

 const [data,setdata]=useState({
     email:"",
     password:"",
     confirmpassord:"",
     isLogin: false,
     loading: false,
 })
 const handelonchange=(e)=>{
    setdata((prev)=>(
        {...prev,[e.target.name] : e.target.value}));
 }
 const passwordcheck=()=>{
     let result=true
   if(data.password!==data.confirmpassord)  {
       result=false;
       alert("The password and confirmation password do not match.")
   }
   return result;
 }
 const onsave =(e)=>{
  
    
    
    setdata((prev)=>({ ...prev,loading:true}))
    let result=passwordcheck();
if(result===true){
   let inputData1 = {
			email: data.email,
            newpassword:data.confirmpassord
		}
           APIRequest.getPostService(ForgotPassword, inputData1)
			.then((result) => {
				if (result.status === 200) {
           console.log('Logged In : ',result)
           form.resetFields();   
           form.setFieldsValue({username: "",password:"",confirmpassord:""});
                setdata((prev)=>({ ...prev,email:" ",
                password:" ",
                confirmpassord:" ",
                loading:false}))
                alert("Change password success")   
        }
          else{
            setdata((prev)=>({ ...prev,
            loading:false}))
          }    
				
			})
			.catch((error) => {
			 console.log(error)
             setdata((prev)=>({ ...prev,email:" ",
             password:" ",
             confirmpassord:" ", loading:false}))
             alert("incorrect mail")
           
			}, 2000)

}
    
 }
 useEffect(()=>{
  
  
  let Auth= localStorage.getItem("AcTech_token");
  let flag=false
  if(Auth !=null){
          flag=true
  }
      setdata({...data, isLogin:flag})
},[])
 if (data.isLogin) {
  return <Redirect to={{ pathname: ROUTES.APPROVE }} />
}
    else{
return(
 
    <>
    <Spin tip='Loading...' style={{margin:0,padding:0}} spinning={data.loading}>
				
    <div className=" banner-section theme-banner header-top ">
    <div className="breadcrumbs-container">
        <div className="row">
            <div className="col">
                <div className="">
                    <h1 className="banner__page-title">Forgot Password</h1>                   
                     <div className="breadcrumbs-section">
                        <div id="crumbs" className="breadcrumbs"><span typeof="v:Breadcrumb">
                            <a rel="v:url" property="v:title" className="text-default-color" >Home</a>
                            </span> / <span className="current">Forgot Password</span></div>         
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
<Form
form={form}
    initialvalues={{
        username: data.email,
        password: data.password,
        conformpassword: data.confirmpassord,
    }}
      layout='vertical'
     onFinish={onsave}
      className='login-form-content'
    >
      <Form.Item
        name="username"
        initialValue={data.email}
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input 
        // style={{ borderRadius: " 25px" }}
        placeholder="Email"
        id='username'
        type='email'
        name='email'
        initialvalues={{
            remember: true,
        }}
        onChange={(e)=>handelonchange(e)}
        defaultValue={data.email}
        value={data.email}/>
      </Form.Item>

      <Form.Item
        name="password" 
        rules={[
            {
                required: true,
                message: 'Please input your password!',
            },
        ]}
        initialValue={data.password}
      >
        <Input.Password  

        minLength={6}
        // style={{ borderRadius: " 25px" }}
        id='password'
        type='password'
        placeholder='Password'
        name='password'
        onChange={(e)=>handelonchange(e)}
         defaultValue={data.password}
         autoComplete="new-password"
        value={data.password}/>
      </Form.Item>
      <Form.Item
        name="confirmpassord" 
        rules={[
            {
                required: true,
                message: 'Please input your confirm password!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
        ]}
        initialValue={data.confirmpassord}
      >
        <Input.Password  
        minLength={6}
        // style={{ borderRadius: " 25px" }}
        id='confirmpassord'
        type='password'
        placeholder='Confirm password'
        name='confirmpassord'
        onChange={(e)=>handelonchange(e)}
        defaultValue={data.confirmpassord}
        autoComplete="new-password"
        value={data.confirmpassord}/>
        
      </Form.Item>

      <Form.Item >
        <button 
      
         type='submit'
         className="login-form-btn submite-form-btn"
         >
          Submit
        </button>
      </Form.Item>
    </Form>
</Spin>
                </>

)


}
}
  export default ForgotPasswords
