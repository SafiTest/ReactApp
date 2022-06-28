import React from "react"
import { Layout } from "antd"
import { Switch, withRouter, Route } from "react-router-dom"
import login from "../Pages/Login.js"
import tableList from "../Pages/TableList.js"
import registration from "../Pages/Registration.js"
import { ROUTES } from "../routing/routeConstants"
import Forgot from "../Pages/Forgotpassword"
const { Content } = Layout

class contentArea extends React.Component {
	componentDidUpdate() {
        console.log('layout')
		window.scrollTo(0, 0)
	}
	render() {
		return (
			<div>
					<Switch>
						<Route exact path="/" component={registration} />
						<Route exact path={ROUTES.LOGIN} component={login} />
						<Route exact path={ROUTES.TABLELIST} component={tableList} />
						<Route exact path={ROUTES.FORGOTPASSWORD} component={Forgot} />
					</Switch>
			</div>
		)
	}
}

export default withRouter(contentArea)
