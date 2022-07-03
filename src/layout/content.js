import React from "react"
import { Layout } from "antd"
import { Switch, withRouter, Route } from "react-router-dom"
import login from "../Pages/Login.js"
import registration from "../Pages/Registration.js"
import { ROUTES } from "../routing/routeConstants"
import Forgot from "../Pages/Forgotpassword"
import PrivateRoute from "../routing/privateRoute"
import layoutprivte from "../layout/layoutprivte"

class contentArea extends React.Component {
	componentDidUpdate() {
        console.log('layout')
		window.scrollTo(0, 0)
	}
	render() {
		return (
			<div>
					<Switch>
						<Route exact path={ROUTES.REGISTRATION} component={registration} />
						<Route exact path={ROUTES.LOGIN} component={login} />
						<Route exact path={ROUTES.FORGOTPASSWORD} component={Forgot} />
						<PrivateRoute path={ROUTES.HOME}component={layoutprivte}/>
					</Switch>
			</div>
		)
	}
}

export default withRouter(contentArea)
