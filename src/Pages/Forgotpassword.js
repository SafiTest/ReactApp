import { Form, Input } from "antd"
import { useState } from "react"
import { APIRequest, LoginUser ,ExcelfileRead,Alluser,ForgotPassword} from "./../APIManager"


const ForgotPasswords=()=>{


 const [data,setdata]=useState({
     email:"",
     password:"",
     confirmpassord:""
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
//      debugger
    let result=passwordcheck();
if(result===true){
   let inputData1 = {
			email: data.email,
            newpassword:data.confirmpassord
		}
           APIRequest.getPostService(ForgotPassword, inputData1)
			.then((result) => {
//                 debugger
				if (result.status === 200) {
           console.log('Logged In : ',result)
           setdata((prev)=>({ ...prev,email:" ",
           password:" ",
           confirmpassord:" "}))
           alert("Change password success")
           
				}
			})
			.catch((error) => {
//                 debugger
			 console.log(error)
             setdata((prev)=>({ ...prev,email:" ",
             password:" ",
             confirmpassord:" "}))
             alert("incorrect mail")
           
			}, 2000)

}
    
 }
return(
    <>
    <div className=" banner-section theme-banner ">
    <div className="breadcrumbs-container">
        <div className="row">
            <div className="col">
                <div className="banner-content">
                    <h1 className="banner__page-title">Forgot Password</h1>                   
                     <div className="breadcrumbs-section">
                        <div id="crumbs" className="breadcrumbs"><span typeof="v:Breadcrumb">
                            <a rel="v:url" property="v:title" >Home</a>
                            </span> / <span className="current">Forgot Password</span></div>         
                        </div>
                </div>
            </div>
        </div>
    </div>
</div>
<Form
    // initialvalues={{
    //     username: data.email,
    //     password: data.password,
    //     conformpassword: data.confirmpassord,
    // }}
      layout='vertical'
     onFinish={onsave}
      className='login-form-content'
    >
      <Form.Item
        name="username"
        //initialValue={data.email}
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input 
        style={{ borderRadius: " 25px" }}
        placeholder="Email"
        id='username'
        type='email'
        name='email'
        initialvalues={{
            remember: true,
        }}
        onChange={(e)=>handelonchange(e)}
      //  defaultValue={data.email}
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
       // initialValue={data.password}
      >
        <Input.Password  
        minLength={6}
        style={{ borderRadius: " 25px" }}
        id='password'
        type='password'
        placeholder='Password'
        name='password'
        onChange={(e)=>handelonchange(e)}
        // defaultValue={data.password}
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
      //  initialValue={data.confirmpassord}
      >
        <Input.Password  
        minLength={6}
        style={{ borderRadius: " 25px" }}
        id='confirmpassord'
        type='password'
        placeholder='Confirm password'
        name='confirmpassord'
        onChange={(e)=>handelonchange(e)}
        // defaultValue={data.confirmpassord}
        value={data.confirmpassord}/>
      </Form.Item>

      <Form.Item >
        <button 
        style={{
				backgroundColor: "#0FA6C9",
			}} 
         type='submit'
         className="login-form-btn"
         >
          Submit
        </button>
      </Form.Item>
    </Form>

                </>

)


}

  export default ForgotPasswords
