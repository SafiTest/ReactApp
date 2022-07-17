import React from "react"

class FourNotFour extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	render(props) {
	
		return (
			<div>
				<div className='' style={{textAlign: "center",marginTop:"80px"}} >
					<h1 >Page Not Found</h1>
					<div>
						<h5>We couldn't find what you looking for.</h5>
						<h5>Please contact the support Admin.</h5>
					</div>
				</div>
			</div>
		)
	}
}

export default (FourNotFour)