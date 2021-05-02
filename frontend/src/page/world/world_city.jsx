import React from 'react';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import dbData from 'service/data-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import DataSearch from '../searchTablelistComponent/data-list-search.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';

import './index.scss';

const _mm = new MUtil();
const _data = new dbData();

class World_city extends React.Component{
	constructor(props){
		super(props);
		this.state = {
            // 初始化一个[], 不然一开始没法调用map函数
            list         : [],
			pageNum      : 1,
            listType     : 'list'
		};
	}
	componentDidMount(){
		// this.loadData();
	}
    // 加载数据，有search和不search两种
	loadData(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // 如果是搜索的话，要传入搜索类型和搜索参数
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }
        // 请求接口
        _data.getDataList(listParam).then(res => {
            this.setState({
                list : res
            });
            console.log(this.state.list)
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
	}
    // 搜索
    onSearch(searchType, searchScope, searchKeyword){
        console.log(searchType, searchScope, searchKeyword);
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType        : listType,
            pageNum         : 1,
            searchType      : searchType,
            searchScope     : searchScope,
            searchKeyword   : searchKeyword
        }, () => {
            this.loadData();
        });
    }
    // 当页数发生变化的时候
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.loadData();
        });
    }
	render(){
        let listBody = this.state.list.map((data, index) => {
            return(
                <tr key = {index}>
                    <td>{data.ID}</td>
                    <td>{data.Name}</td>
                    <td>{data.CountryCode}</td>
                    <td>{data.District}</td>
                    <td>{data.Population}</td>
                </tr>
            );
        });
        let tableHeads = [
            {name: 'ID', width: '20%'},
            {name: 'Name', width: '20%'},
            {name: 'CountryCode', width: '20%'},
            {name: 'District', width: '20%'},
            {name: 'Population', width: '20%'},
        ];
		return(
			<div id="page-wrapper">
			    <PageTitle title="world database - city table"/>
                <DataSearch onSearch = {(searchType, searchScope, searchKeyword) =>
                 {this.onSearch(searchType, searchScope, searchKeyword)}}/>
                <TableList tableHeads={tableHeads}>
                    {listBody}
                </TableList>
                <Pagination current={this.state.pageNum} 
                    total={this.state.total} 
                    onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
			</div>
		);
	}
}

export default World_city;