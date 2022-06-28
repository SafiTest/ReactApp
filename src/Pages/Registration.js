import React, { useCallback } from "react"
import "antd/dist/antd.min.css";
import "../Styles/custom.css"
import { withRouter } from "react-router-dom"
import { Row, Col, Button, Modal, Form, Input, InputNumber } from 'antd'
import { APIRequest, SignupUser, CreateOrder } from "./../APIManager"
import { Alert } from "bootstrap";
// import useRazorpay from "react-razorpay";
class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      branch: '',
      email: '',
      yearofPassing: '',
      occupation: '',
      currentCompanyName: '',
      areaofExpertise: '',
      country: '',
      orderID: 0,
      mobile: '',
      address: '',
      street: '',
      city: '',
      postalcode: '',
      joiningDate: '',
      password: '',
      confirmPassword: '',
      isLogin: false,
      isModalVisible: false,
      amount: 0,
      type: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.openPayModal = this.openPayModal.bind(this);
  }
  handleSubmit = () => {
//     debugger
    console.log('login')
    let inputData = {
      name: this.state.name,
      branch: this.state.branch,
      email: this.state.email,
      yearofPassing: this.state.yearofPassing,
      occupation: this.state.occupation,
      currentCompanyName: this.state.currentCompanyName,
      areaofExpertise: this.state.areaofExpertise,
      country: this.state.country,
      orderID: this.state.orderID,
      mobile: this.state.mobile,
      address: this.state.address,
      street: this.state.street,
      city: this.state.city,
      postalcode: this.state.postalcode,
      joiningDate: this.state.joiningDate,
      password: this.state.password
    }
    console.log('login', inputData)
    APIRequest.getPostService(SignupUser, inputData)
      .then((result) => {
        if (result.status === 200) {
          console.log('Logged In : ', result)
        }
      })
      .catch((error) => {
        console.log(error)
      }, 2000)
    this.setState((prev) => ({ ...prev, isLogin: true }));
  }

  onChange(e) {
//     debugger
    this.setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  handleOk() {
    this.setState((prev) => ({ ...prev, isModalVisible: false }));
  };

  handleCancel() {
    this.setState((prev) => ({ ...prev, isModalVisible: false }));
  };
  handlePayment(amt, type) {
    this.setState((prev) => ({ ...prev, isModalVisible: true, amount: amt, type: type }));
  }
  componentDidMount() {
    this.setState({ ...this.state })
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }


  openPayModal() {
//     debugger
    var amount = this.state.amount * 100; //Razorpay consider the amount in paise
var self=this
    let inputData = {
      name: this.state.name,
      branch: this.state.branch,
      email: this.state.email,
      yearofPassing: parseInt(this.state.yearofPassing),
      occupation: this.state.occupation,
      currentCompanyName: this.state.currentCompanyName,
      areaofExpertise: this.state.areaofExpertise,
      country: this.state.country,
      orderID: this.state.orderID,
      mobile: parseInt(this.state.mobile),
      address: this.state.address,
      street: this.state.street,
      city: this.state.city,
      postalcode: parseInt(this.state.postalcode),
      joiningDate: this.state.joiningDate,
      password: this.state.password,
      membershipType: this.state.type,
      orderID: "",
      razorpay_signature: "",
      paymentid: "",
      amount: parseInt(this.state.amount),
      currency: "INR"
    }
    var options = {
      "key": process.env.REACT_APP_razorpaytest_id,
      "amount": amount, // 2000 paise = INR 20, amount in paisa
      "name": "",
      "description": "",
      'order_id': "",
      "handler": function (response) {
//         debugger
        console.log(response);
        var values = {
          razorpay_signature: response.razorpay_signature,
          razorpay_order_id: response.razorpay_order_id,
          transactionid: response.razorpay_payment_id,
          transactionamount: amount,
        }
        if (response.razorpay_payment_id) {
          inputData.orderID = response.razorpay_order_id;
          inputData.razorpay_signature = response.razorpay_signature;
          inputData.paymentid = response.razorpay_payment_id;
          console.log('login', inputData)
          APIRequest.getPostService(SignupUser, inputData)
            .then((result) => {
//               debugger
              if (result.status === 201) {
               
                self.setState((prev) => ({ ...prev, isModalVisible: false, amount: 0, type: "" }),()=> alert("Signup successfully"));
              }
            })
            .catch((error) => {
//               debugger
              console.log(error)
            }, 2000)
        }

      },
      "prefill": {
        "name": this.state.name,
        "email": this.state.email,
        "contact": this.state.mobile,
      },
      "notes": {
        "address": "Hello World"
      },
      "theme": {
        "color": "#528ff0"
      }
    };
    APIRequest.getPostService(CreateOrder, { "amount": amount, "currency": "INR" })
      .then(res => {
//         debugger
        options.order_id = res.id;
        options.amount = res.amount;
        console.log(options)
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch(e => console.log(e))

  };
  render() {

    return (

      <>
        <div class=" banner-section theme-banner ">
          <div class="breadcrumbs-container">
            <div class="row">
              <div class="col">
                <div class="banner-content">
                  <h1 class="banner__page-title">Registration</h1>
                  <div class="breadcrumbs-section">
                    <div id="crumbs" class="breadcrumbs"><span typeof="v:Breadcrumb">
                      <a rel="v:url" property="v:title" >Home</a>
                    </span> / <span class="current">Registration</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full py-8 font-sans registration-container">
          <div>
            <h4>Registration</h4>
          </div>
          <div class="reg-content-p">
            <p>You need to register only once, and your user name and password will remain valid . If you wish, you can reset your password at any time after registering.</p>
            <p>Please read the instructions below before proceeding to register.</p>
          </div>

          <div>
            <h4>Membership</h4>
          </div>
          <div class="reg-content-p">
            <p>Please select the type of Membership :- Life Time Membership / Patron Membership to continue Registration.</p>
          </div>
          <div>
            <Row>
              <Col span={12} className="reg-content-card">
                <div>
                  <h4 className="reg-content-card-h4">Life Time Membership Fee</h4>
                  <p className="reg-content-card-p">Membership fee of ₹ 1,000/- </p>
                  <div className="reg-content-card-btn" >
                    <Button type="button" onClick={() => this.handlePayment(1000, "Life Time")} style={{
                      backgroundColor: '#6E796F', color: 'white', fontFamily: "Roboto, Sans-serif",
                      fontWeight: 600
                    }}>
                      Pay Online
                    </Button></div>
                </div></Col>
              <Col span={12} className="reg-content-card">
                <div>
                  <h4 className="reg-content-card-h4">Patron Membership Fee</h4>
                  <p className="reg-content-card-p">Membership fee of ₹ 5,00,000/- </p>
                  <div className="reg-content-card-btn" >
                    <Button style={{
                      backgroundColor: '#6E796F', color: 'white', fontFamily: "Roboto, Sans-serif",
                      fontWeight: 600
                    }} type="button" onClick={() => this.handlePayment(500000, 'Patron Membership')}
                    >
                      Pay Online
                    </Button></div>
                </div>
              </Col>
            </Row>
          </div>
          <div className='reg-content-eligibility'>
            <div >
              <h4>Eligibility</h4>
            </div>
            <div class="reg-content-p">
              <p><b className="register-content-bolder">Alumni</b> are individuals who completed a degree at Alagappa College of Technology, Anna University in the following departments</p>
              <p>Department of Chemical Engineering<br />Department of Textile Technology<br />Department of Leather Technology<br />Department of Biotechnology<br />Department of Ceramic Technology<br />Department of Applied Science Technology<br />Crystal Growth Centre<br />Centre for Nano Science and Technology</p>
            </div>
          </div>
          <div className='reg-content-register'>
            <div>
              <h4>How to Register</h4>
            </div>
            <div class="reg-content-p">
              <p>1) Select the type of Membership provided.</p>
              <p>a) <b className="register-content-bolder">Life time Member</b>: People who pay the membership fee of ₹ 1,000/- can become Actech Alumni life time member. Life time members have full access to the Alumni registered portal.</p>
              <p>b)<b className="register-content-bolder"> Patron Member:</b> People who pay the membership fee of ₹ 5,00,000/- can become Actech Alumni life time member with the title as Patron member and will have the privileges over the lifetime members, including list of name and detail being displayed in the alumni website forever.</p>
              <p>2) Enter your Personal details and the Payment to proceed with the Registration.</p>
              <p>3) Select the Payment Methods available</p>
              <p>a) <b className="register-content-bolder">Online Payment Gateway:</b> You can pay the money online through</p>
              <p>(i) Credit cards<br />(ii) Debit Cards<br />(iii) Net Banking<br />(iv) Mobile Payments<br />(v) Paytm<br />(vi) Wallet (Freecharge, Mobikwik, Jio money, ITZ cash card,…)<br />(vii) UPI (BHIM, PhonePe, GPay, Paytm,…)</p>
              <p>b) <b className="register-content-bolder">NEFT / RTGS / IMPS Transfer:</b> You can pay the amount from your bank account through NEFT payment in the following Account.</p>
              <p>NAME : A C TECH ALUMNI ASSOCIATION<br />ACCOUNT NO. : 38254808029 <br />IFSC CODE : SBIN0006463,<br />SWIFT Code: SBININBB291<br />STATE BANK OF INDIA,<br />BRANCH : ANNA UNIVERSITY<br />CHENNAI – 600025<br />TN</p>
              <p>c) <b className="register-content-bolder">Cheque / DD / Cash:</b> Cheques are made available to the address.</p>
              <p>A C TECH ALUMNI ASSOCIATION <br />C/O DEAN OFFICE,A C COLLEGE OF TECHNOLOGY,<br />ANNA UNIVERSITY CAMPUS,GUINDY<br />CHENNAI – 600034<br />TN</p>
              <p>d) <b className="register-content-bolder">Cash:</b> Cash payment by hand.</p>
              <p>e) <b className="register-content-bolder">Prepaid Members:</b> The members who have already paid the Registration fees are considered as paid members.</p>
              <p>4) After successful payment, your Membership application will be under process for verification. After verification, the admin will activate the account. An activation email will be sent to you to enable you complete your registration.</p>
              <p>5) Click the one time Login link provided in the email and complete your profile where you can create your own password and save the account.</p>
              <p>6) Now you have full access to the Alumni registered portal.</p>                    </div>
          </div>
        </div>

        <Modal title="Sign Up" visible={this.state.isModalVisible} onCancel={this.handleCancel} footer={null}>
          <Form
            layout='vertical'
            className='reg-form-content'
            onFinish={this.handleSubmit}
          >
            <Form.Item
              label="Full Name"
              name="name"
              initialValue={this.state.name}
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input
                style={{ borderRadius: " 25px" }}
                placeholder="name"
                id='name'
                type='text'
                name='name'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.name}
                value={this.state.name} />
            </Form.Item>

            <Form.Item
              label="Branch"
              name="branch"
              initialValue={this.state.branch}
              rules={[{ required: true, message: 'Please input your branch!' }]}
            >
              <Input
                style={{ borderRadius: " 25px" }}
                placeholder="branch"
                id='branch'
                type='text'
                name='branch'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.branch}
                value={this.state.branch} />
            </Form.Item>

            <Form.Item
              label="E-mail"
              name="email"
              initialValue={this.state.email}
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input
                style={{ borderRadius: " 25px" }}
                placeholder="email"
                id='email'
                type='email'
                name='email'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.email}
                value={this.state.email} />
            </Form.Item>

            <Form.Item
              label="Year Of Passing"
              name="yearofPassing"
              initialValue={this.state.yearofPassing}
              rules={[{ required: true, message: 'Please input your year of Passing!' }]}
            >
              <Input
                minLength={4}
                maxLength={4}
                type='text'
                style={{ borderRadius: " 25px" }}
                placeholder="yearofPassing"
                id='yearofPassing'
                name='yearofPassing'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.yearofPassing}
                value={this.state.yearofPassing} />
            </Form.Item>

            <Form.Item
              label="Occupation"
              name="occupation"
              initialValue={this.state.occupation}
              rules={[{ required: true, message: 'Please input your year of occupation!' }]}
            >
              <Input
                style={{ borderRadius: " 25px" }}
                placeholder="occupation"
                id='occupation'
                type='text'
                name='occupation'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.occupation}
                value={this.state.occupation} />
            </Form.Item>

            <Form.Item
              label="Current Company Name"
              name="currentCompanyName"
              initialValue={this.state.currentCompanyName}
              rules={[{ required: true, message: 'Please input your year of current Company Name!' }]}
            >
              <Input
                style={{ borderRadius: " 25px" }}
                placeholder="currentCompanyName"
                id='currentCompanyName'
                type='text'
                name='currentCompanyName'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.currentCompanyName}
                value={this.state.currentCompanyName} />
            </Form.Item>

            <Form.Item
              label="Area of Expertise"
              name="areaofExpertise"
              initialValue={this.state.areaofExpertise}
              rules={[{ required: true, message: 'Please input your year of area of Expertise!' }]}
            >
              <Input
                style={{ borderRadius: " 25px" }}
                placeholder="areaofExpertise"
                id='areaofExpertise'
                type='text'
                name='areaofExpertise'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.areaofExpertise}
                value={this.state.areaofExpertise} />
            </Form.Item>

            <Form.Item
              label="Country"
              name="country"
              initialValue={this.state.country}
              rules={[{ required: true, message: 'Please input your year of country!' }]}
            >
              <Input
                style={{ borderRadius: " 25px" }}
                placeholder="country"
                id='country'
                type='text'
                name='country'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.country}
                value={this.state.country} />
            </Form.Item>

            <Form.Item
              label="Mobile"
              name="mobile"
              initialValue={this.state.mobile}
              rules={[{ required: true, message: 'Please input your year of mobile!' }]}
            >
              <Input
                minLength={10}
                maxLength={10}
                type='text'
                style={{ borderRadius: " 25px" }}
                placeholder="mobile"
                id='mobile'
                name='mobile'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.mobile}
                value={this.state.mobile} />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              initialValue={this.state.address}
              rules={[{ required: true, message: 'Please input your year of address!' }]}
            >
              <Input
                style={{ borderRadius: " 25px" }}
                placeholder="address"
                id='address'
                type='text'
                name='address'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.address}
                value={this.state.address} />
            </Form.Item>

            <Form.Item
              label="Street"
              name="street"
              initialValue={this.state.street}
              rules={[{ required: true, message: 'Please input your year of street!' }]}
            >
              <Input
                style={{ borderRadius: " 25px" }}
                placeholder="street"
                id='street'
                type='text'
                name='street'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.street}
                value={this.state.street} />
            </Form.Item>

            <Form.Item
              label="City"
              name="city"
              initialValue={this.state.city}
              rules={[{ required: true, message: 'Please input your year of city!' }]}
            >
              <Input
                style={{ borderRadius: " 25px" }}
                placeholder="city"
                id='city'
                type='text'
                name='city'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.city}
                value={this.state.city} />
            </Form.Item>

            <Form.Item
              label="Postal Code"
              name="postalcode"
              initialValue={this.state.postalcode}
              rules={[{ required: true, message: 'Please input your year of postal code!' }]}
            >
              <Input
                minLength={6}
                maxLength={6}
                type='text'
                style={{ borderRadius: " 25px" }}
                placeholder="postalcode"
                id='postalcode'
                name='postalcode'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.postalcode}
                value={this.state.postalcode} />
            </Form.Item>

            <Form.Item
              label="Joining Date"
              name="joiningDate"
              initialValue={this.state.joiningDate}
              rules={[{ required: true, message: 'Please input your year of joiningDate!' }]}
            >
              <Input
                style={{ borderRadius: " 25px" }}
                placeholder="joiningDate"
                id='joiningDate'
                type='text'
                name='joiningDate'
                initialvalues={{
                  remember: true,
                }}
                onChange={this.onChange}
                defaultValue={this.state.joiningDate}
                value={this.state.joiningDate} />
            </Form.Item>

            <Form.Item
              label="Password"
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
                minLength={6}
                maxLength={12}
                style={{ borderRadius: " 25px" }}
                id='password'
                type='password'
                placeholder='password'
                name='password'
                onChange={this.onChange}
                defaultValue={this.state.password}
                value={this.state.password} />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                {
                  required: true,
                  message: 'Please input your confirm Password!',
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
              initialValue={this.state.confirmPassword}
            >
              <Input.Password
                minLength={6}
                maxLength={12}
                style={{ borderRadius: " 25px" }}
                id='confirmPassword'
                type='Password'
                placeholder='confirmPassword'
                name='confirmPassword'
                onChange={this.onChange}
                defaultValue={this.state.confirmPassword}
                value={this.state.confirmPassword} />
            </Form.Item>
            <Form.Item >
              <button
                style={{
                  backgroundColor: "#0FA6C9",
                  marginRight: '10px'
                }}
                type='submit'
                className="login-form-btn "
                onClick={(e) => { this.openPayModal() }}
              >
                Pay ₹ 1,000/-
              </button>
              {/* 
        <button 
        style={{
				backgroundColor: "#0FA6C9",
			}} 
         className="login-form-btn"
         onClick={this.handleCancel}
         >
          Cancel
        </button> */}

            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  }
}

export default (withRouter(Registration))

