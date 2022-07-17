import React, { Fragment } from "react"
import "antd/dist/antd.min.css"
import "../Styles/custom.css"
import { Table, Input, Button, Space, Spin } from "antd"
import Highlighter from "react-highlight-words"
import { SearchOutlined } from "@ant-design/icons"
import { sData } from "./data"
import { APIRequest, GetMembershipList, GetPendingList, UpdateStatus } from "../APIManager"

class PendingList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: [],
			tabledata: [],
			searchText: "",
			searchedColumn: "",
			loading: false,
			selectedRowKeys: [],
            userFlag:"User"
		}
		this.fetch = this.fetch.bind(this)
	}
	fetch() {
		
		this.setState({ loading: true })
		APIRequest.getGetService(GetPendingList)
			.then((result) => {
				
				if (result.status === 200) {
					this.setState({ ...this.state, data: result.result, loading: false })
					console.log("User List Data : ", result)
				}
			})
			.catch((error) => {
				
				this.setState({ loading: false })
				console.log(error)
			}, 2000)
	}
    onApproveRejectclick(flag) {
		
		this.setState({ loading: true })
        let inputData = {
			ids: this.state.selectedRowKeys,
            status:flag
		}
           APIRequest.getPostService(UpdateStatus, inputData)
			.then((result) => {
				
				if (result.status === 201) {
					this.setState({ ...this.state, selectedRowKeys: [], loading: false })
					if(flag==1){
                        alert("Approved successfully")
                    }
                    else{
                        alert("Rejected successfully")
                    }
                    this.fetch();
                   
				}
			})
			.catch((error) => {
				
				this.setState({ loading: false })
				console.log(error)
			}, 2000)
	}
	componentDidMount() {
        let userflags= localStorage.getItem("User_flag");
        let flag="User"
        if(userflags !=null){
         flag= userflags=="b02d1971-7c8c-4ec4-b158-4dc85ba2c9da"?"Admin":"User"
        }
		this.setState({ ...this.state, tabledata: this.state.data ,userFlag:flag})
		this.fetch()
	}
	getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={(node) => {
						this.searchInput = node
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type='primary'
						onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button onClick={() => this.handleReset(clearFilters)} size='small' style={{ width: 90 }}>
						Reset
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							confirm({ closeDropdown: false })
							this.setState({
								searchText: selectedKeys[0],
								searchedColumn: dataIndex,
							})
						}}
					>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
				: "",
		onFilterDropdownVisibleChange: (visible) => {
			if (visible) {
				setTimeout(() => this.searchInput.select(), 100)
			}
		},
		render: (text) =>
			this.state.searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
					searchWords={[this.state.searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ""}
				/>
			) : (
				text
			),
	})

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		this.setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex,
		})
	}

	handleReset = (clearFilters) => {
		clearFilters()
		this.setState({ searchText: "" })
	}

	onSelectChange = (selectedRowKeys) => {
		
		console.log("selectedRowKeys changed: ", selectedRowKeys)
		this.setState({ selectedRowKeys })
	}

	render() {
		const columns = [
			{
				title: "Name",
				dataIndex: "name",
				key: "name",
				width: "5%",
				sorter: (a, b) => a.name.length - b.name.length,
				...this.getColumnSearchProps("name"),
			},
			{
				title: "Branch",
				dataIndex: "branch",
				key: "branch",
				width: "5%",
				sorter: (a, b) => a.branch.length - b.branch.length,
				...this.getColumnSearchProps("branch"),
			},
			{
				title: "E-mail",
				dataIndex: "email",
				key: "email",
				width: "2%",
				sorter: (a, b) => a.email.length - b.email.length,
				...this.getColumnSearchProps("email"),
			},
			{
				title: "Year of Passing",
				dataIndex: "yearofPassing",
				key: "yearofPassing",
				width: "3%",
				sorter: (a, b) => a.yearofPassing - b.yearofPassing,
				...this.getColumnSearchProps("yearofPassing"),
			},
			{
				title: "Occupation",
				dataIndex: "occupation",
				key: "occupation",
				width: "5%",
				sorter: (a, b) => a.occupation.length - b.occupation.length,
				...this.getColumnSearchProps("occupation"),
			},
			{
				title: "Current Company Name",
				dataIndex: "currentCompanyName",
				key: "currentCompanyName",
				width: "5%",
				sorter: (a, b) => a.currentCompanyName.length - b.currentCompanyName.length,
				...this.getColumnSearchProps("currentCompanyName"),
			},
			{
				title: "Area of Expertise",
				dataIndex: "areaofExpertise",
				key: "areaofExpertise",
				width: "5%",
				sorter: (a, b) => a.areaofExpertise.length - b.areaofExpertise.length,
				...this.getColumnSearchProps("areaofExpertise"),
			},
			{
				title: "Mobile",
				dataIndex: "mobile",
				key: "mobile",
				width: "3%",
				...this.getColumnSearchProps("mobile"),
			},
		]
		const { selectedRowKeys } = this.state

		const hasSelected = selectedRowKeys.length > 0
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		}
		return (
			<>
				<Spin tip='Loading...' style={{margin:0,padding:0}} spinning={this.state.loading}>
					<div className=' banner-section theme-banner '>
						<div className='breadcrumbs-container'>
							<div className='row'>
								<div className='col'>
									 <div /*className='banner-content' */> 
										<h1 className='banner__page-title'>Pending List</h1>
										<div className='breadcrumbs-section'>
											<div id='crumbs' className='breadcrumbs'>
												<span typeof='v:Breadcrumb'>
													<a rel='v:url' property='v:title' className="text-default-color">
														Home
													</a>
												</span>{" "}
												/ <span className='current'>Pending List</span>
											</div>{" "}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='bg-white py-8 font-sans table-content-container'>
						<span style={{ marginLeft: 8 }}>
							{hasSelected ? `Selected ${this.state.selectedRowKeys.length} items` : ""}
						</span>
                        {this.state.userFlag==="Admin"?<>
						<Button className="btn-color" onClick={()=>this.onApproveRejectclick(1)}>Approve</Button>
						<Button className="btn-color"  onClick={()=>this.onApproveRejectclick(2)}>Reject</Button>
                        </>:null}
						{this.state.data.length > 0 ? (
							<Table style={{paddingBottom:"30px"}}
								rowSelection={this.state.userFlag==="Admin"?rowSelection:{}}
								dataSource={this.state.data}
								columns={columns}
								rowKey={(items) => items._id}
							/>
						) : (
							<h1>No Data</h1>
						)}
					</div>
				</Spin>
			</>
		)
	}
}

export default PendingList
