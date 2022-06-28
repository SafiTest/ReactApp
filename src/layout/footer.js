import React from "react"
import {Anchor, Row, Col } from "antd"
import { FacebookOutlined, YoutubeOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons'

const { Link } = Anchor;

class footerArea extends React.Component {
	render() {
		return (
            <>
				<div className="footer-section-option">
                    <Row gutter={[16, 16]}>
                    <Col span={6}>
                   <Anchor affix={false}>
                    <Link className="footer-link-header" title="About ACTAA" />
                    <Link className="footer-link-option" title="About Us" />
                    <Link className="footer-link-option" title="A C Tech Distinguished Alumni Award" />
                    <Link className="footer-link-option" title="Departments and centers" />
                    <Link className="footer-link-option" title="Constitution" />
                    <Link className="footer-link-option" title="Contact" />
                    </Anchor>
                    </Col>
                    <Col span={6}>
                   <Anchor affix={false}>
                    <Link className="footer-link-header" title="Members" />
                    <Link className="footer-link-option" title="ACTAA Office Bearers" />
                    <Link className="footer-link-option" title="Lifetime Members" />
                    <Link className="footer-link-option" title="Patron Members" />
                    <Link className="footer-link-option" title="Prepaid Member" />
                    </Anchor>
                    </Col>
                    <Col span={6}>
                   <Anchor affix={false}>
                    <Link className="footer-link-header" title="Connect" />
                    <Link className="footer-link-option" title="Internships & Jobs" />
                    <Link className="footer-link-option" title="ACTECH Entrepreneurs Club" />
                    <Link className="footer-link-option" title="Alumni Business Directory" />
                    <Link className="footer-link-option" title="Add Listing" />
                    <Link className="footer-link-option" title="Discussion Forum" />
                    </Anchor>
                    </Col>
                    <Col span={6}>
                   <Anchor affix={false}>
                    <Link className="footer-link-header" title="Media" />
                    <Link className="footer-link-option" title="Blog" />
                    <Link className="footer-link-option" title="Gallery" />
                    <Link className="footer-link-option" title="Events" />
                    </Anchor> 
                    </Col>
                    </Row>
                </div>
                <div className="footer-section-copyright-header">
                <Row gutter={[16, 16]}>
                <Col span={8}> 
                © Copyright ACTech Alumni. All rights reserved
                </Col>
                <Col span={8}> 
                <Anchor affix={false}>
                    <Link className="footer-md-section-copyright" title="Privacy Policy" />
                    <Link className="footer-md-section-copyright" title="Terms and Conditions" />
                </Anchor> 
                </Col>
                <Col span={8}> 
                <Anchor affix={false}>
                    <Link className="footer-section-copyright footer-icons"><FacebookOutlined /></Link>
                    <Link className="footer-section-copyright footer-icons"><YoutubeOutlined /></Link>
                    <Link className="footer-section-copyright footer-icons"><LinkedinOutlined /></Link>
                    <Link className="footer-section-copyright footer-icons"><InstagramOutlined /></Link>
                    </Anchor> 
                </Col>
                </Row>
                </div>
                </>
		)
	}
}

export default footerArea

