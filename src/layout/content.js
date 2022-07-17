import React from "react"
import { Layout } from "antd"
import { Switch, withRouter, Route } from "react-router-dom"
import login from "../Pages/Login.js"
import registration from "../Pages/Registration.js"
import FourNotFour from "../Pages/Page404.js"
import { ROUTES } from "../routing/routeConstants"
import Forgot from "../Pages/Forgotpassword"
import PrivateRoute from "../routing/privateRoute"
import layoutprivte from "../layout/layoutprivte"

class contentArea extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isAuth: false,
			
		}
	
	}
	componentDidUpdate() {
        console.log('layout')
		window.scrollTo(0, 0)
	}
	componentDidMount(){
		
		let Auth= localStorage.getItem("AcTech_token");
		let flag="User"
		if(Auth !=null){
			this.setState({isAuth:true})
		}

	}
	
	render() {
		return (
			<div>
					<Switch>
						
						<Route exact path={ROUTES.REGISTRATION} component={registration} />
						<Route exact path={ROUTES.LOGIN} component={login} />
						<Route exact path={ROUTES.FORGOTPASSWORD} component={Forgot} />
						{/* </>:null} */}
						<PrivateRoute path={ROUTES.HOME}component={layoutprivte}/>
						<Route component={FourNotFour} />
					</Switch>
			</div>
		)
	}
}

export default withRouter(contentArea)
