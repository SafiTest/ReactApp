
import React, { Fragment } from "react"
import "antd/dist/antd.min.css";
import "../Styles/custom.css"
import { Table, Input, Button, Space, Row, Col } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {sData} from './data'

class TableList extends React.Component {
    constructor(props) {
            super(props);
            this.state = {
                data: sData,
tabledata:[],
searchText: '',
    searchedColumn: '',
            }
        }
    
        componentDidMount() {
        this.setState({...this.state,tabledata:this.state.data})
        }
        getColumnSearchProps = dataIndex => ({
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
              <div style={{ padding: 8 }}>
                <Input
                  ref={node => {
                    this.searchInput = node;
                  }}
                  placeholder={`Search ${dataIndex}`}
                  value={selectedKeys[0]}
                  onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                  onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                  style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                  <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{ width: 90 }}
                  >
                    Search
                  </Button>
                  <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => {
                      confirm({ closeDropdown: false });
                      this.setState({
                        searchText: selectedKeys[0],
                        searchedColumn: dataIndex,
                      });
                    }}
                  >
                    Filter
                  </Button>
                </Space>
              </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) =>
              record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
            onFilterDropdownVisibleChange: visible => {
              if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
              }
            },
            render: text =>
              this.state.searchedColumn === dataIndex ? (
                <Highlighter
                  highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                  searchWords={[this.state.searchText]}
                  autoEscape
                  textToHighlight={text ? text.toString() : ''}
                />
              ) : (
                text
              ),
          });
        
          handleSearch = (selectedKeys, confirm, dataIndex) => {
            confirm();
            this.setState({
              searchText: selectedKeys[0],
              searchedColumn: dataIndex,
            });
          };
        
          handleReset = clearFilters => {
            clearFilters();
            this.setState({ searchText: '' });
          };
          
    render() {
         const columns = [ 
 { 
 title: 'Name', 
 dataIndex: 'name', 
 key: 'name', 
 width: '5%',
 sorter: (a, b) => a.name.length - b.name.length,
 ...this.getColumnSearchProps('name'),
}, 
 { 
 title: 'Branch', 
 dataIndex: 'branch', 
 key: 'branch', 
 width: '5%',
 sorter: (a, b) => a.branch.length - b.branch.length,
 ...this.getColumnSearchProps('branch'),
}, 
 { 
 title: 'E-mail', 
 dataIndex: 'email', 
 key: 'email', 
 width: '2%',
 sorter: (a, b) => a.email.length - b.email.length,
 ...this.getColumnSearchProps('email'),
}, 
 { 
 title: 'Year of Passing', 
 dataIndex: 'yearofPassing', 
 key: 'yearofPassing', 
 width: '3%',
 sorter: (a, b) => a.yearofPassing - b.yearofPassing,
 ...this.getColumnSearchProps('yearofPassing'),
}, 
 { 
 title: 'Occupation', 
 dataIndex: 'occupation', 
 key: 'occupation', 
 width: '5%',
 sorter: (a, b) => a.occupation.length - b.occupation.length,
 ...this.getColumnSearchProps('occupation'),
}, 
 { 
 title: 'Current Company Name', 
 dataIndex: 'currentCompanyName', 
 key: 'currentCompanyName', 
 width: '5%',
 sorter: (a, b) => a.currentCompanyName.length - b.currentCompanyName.length,
 ...this.getColumnSearchProps('currentCompanyName'),
}, 
 { 
 title: 'Area of Expertise', 
 dataIndex: 'areaofExpertise', 
 key: 'areaofExpertise', 
 width: '5%',
 sorter: (a, b) => a.areaofExpertise.length - b.areaofExpertise.length,
 ...this.getColumnSearchProps('areaofExpertise'),
},   
 { 
 title: 'Mobile', 
 dataIndex: 'mobile', 
 key: 'mobile', 
 width: '3%',
 ...this.getColumnSearchProps('mobile'),
} 
]; 
            return (
            
<>
<div className=" banner-section theme-banner ">
    <div className="breadcrumbs-container">
        <div className="row">
            <div className="col">
                <div className="banner-content">
                    <h1 className="banner__page-title">Member List</h1>                   
                     <div className="breadcrumbs-section">
                        <div id="crumbs" className="breadcrumbs"><span typeof="v:Breadcrumb"><a rel="v:url" property="v:title">Home</a></span> / <span className="current">Member List</span></div>                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
                <div className="bg-white py-8 font-sans table-content-container">
                {this.state.data.length > 0 ? (
                    <Table dataSource={this.state.data} columns={columns}/>
            ) : <h1>No Data</h1> }
                </div>
                </>
                
            )
    }
}

export default TableList

