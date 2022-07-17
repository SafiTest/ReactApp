import React from "react"
import { Layout } from "antd"
import { Switch, withRouter, Route } from "react-router-dom"
import login from "../Pages/Login.js"
import RejectedList from "../Pages/RejectedList.js"
import ApprovedList from "../Pages/ApprovedList"
import { ROUTES } from "./routeConstants"
import PendingList from "../Pages/PendingList"
import FourNotFour from "../Pages/Page404"
const { Content } = Layout

class contentArea extends React.Component {
	componentDidUpdate() {
		window.scrollTo(0, 0)
	}
	render() {
		return (
			<div>
					<Switch>
						<Route exact path={ROUTES.PENDING} component={PendingList} />
						<Route exact path={ROUTES.APPROVE} component={ApprovedList} />
						<Route exact path={ROUTES.REJECT} component={RejectedList} />
						<Route component={FourNotFour} />
			
					</Switch>
			</div>
		)
	}
}

export default withRouter(contentArea)
