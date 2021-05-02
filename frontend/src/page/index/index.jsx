import React from 'react';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import dbData from 'service/data-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import DataSearch from '../searchComponent/data-list-search.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';

import './index.css';

const _mm = new MUtil();
const _data = new dbData();

class Index extends React.Component{
	constructor(props){
		super(props);
		this.state = {
            // 初始化一个[], 不然一开始没法调用map函数
            list                : [],
            showList            : [],
			pageNum             : 1,
            listType            : 'list',
            title               : '',
            tableHead           : [],
            msg                 : 'nothing',
		};
	}
    componentWillMount(){
        this.getTitle();
    }
    componentWillReceiveProps(){
        this.getTitle();
        // this.loadData();
    }
	componentDidMount(){
		// this.loadData();
        this.getTest()
	}

    getTest(){
        let f = ''
        _data.getDataList().then(res => {
            this.setState({
                msg : res.msg
            }); 
        }, errMsg => {
            this.setState({
                msg : errMsg
            });
            _mm.errorTips(errMsg);
        });
    }

    // 获取用户当前点击页面的title
    getTitle(){
        let title = window.location.href.substring(window.location.origin.length + 1).replace('-', ' ');
        this.state.title = title;
        this.state.listType = 'list';
        this.state.multiTable = false;
    }
    // 加载数据，有search和不search两种
	loadData(){
        this.setState({
            list : []
        });
        let listParam = {};
        listParam.listType  = this.state.listType;
        listParam.pageNum   = this.state.pageNum;
        listParam.title     = this.state.title;
        // 如果是搜索的话，要传入搜索类型和搜索参数
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.searchScope = this.state.searchScope;
            listParam.keyword = this.state.searchKeyword;
            listParam.hyperLink = this.state.hyperLink;
        }
        // 请求接口
        _data.getDataList(listParam).then(res => {
            // 处理单表数据
            if (this.state.multiTable === false) {
                let firstShowList = []
                if (res.length >= 10) {
                    for (let i = 0; i < 10; i++) {
                        firstShowList.push(res[i]);
                    }
                } else {
                    for (let i = 0; i < res.length; i++) {
                        firstShowList.push(res[i]);
                    }
                }
                this.setState({
                    total       : res.length,
                    list        : res,
                    showList    : firstShowList
                });
            } 
        }, errMsg => {
            this.setState({
                tableHead : [],
                list : []
            });
            _mm.errorTips(errMsg);
        });
	}

    // 搜索
    onSearch(searchType, searchScope, searchKeyword){
        let input = document.getElementById('inputSearch').value;
        if (input != '') {
            this.state.hyperLink = false;
        }
        if (this.state.hyperLink === false) {
            let listType = searchKeyword === '' ? 'list' : 'search';
            if (searchType === 'Table') {
                this.state.multiTable = false;
            } else {
                this.state.multiTable = true;
            }
            this.state.title = searchScope.replace(".", "-");
            this.setState({
                listType        : listType,
                pageNum         : 1,
                searchType      : searchType,
                searchScope     : searchScope,
                searchKeyword   : searchKeyword,
            }, () => {
                this.loadData();
            });
        } else {
            this.state.title = searchScope.replace(".", "-");
            this.setState({
                listType        : 'search',
                pageNum         : 1,
                searchType      : 'Table',
                searchScope     : searchScope,
                searchKeyword   : searchKeyword,
            }, () => {
                this.loadData();
            });
        }
        
    }
    // 外键
    onHyperlink(searchType, searchScope, searchKeyword){
        this.state.hyperLink = true;
        document.getElementById('inputSearch').value = '';
        this.onSearch(searchType, searchScope, searchKeyword);
    }

    // 当页数发生变化的时候（单表查询）
    onPageNumChange(pageNum){
        this.setState({
            pageNum : pageNum
        }, () => {
            this.replaceData();
        });
    }
    // 当页数发生变化的时候（多表查询）
    onMultiPageNumChange(pageNum, idx){
        let newMultiPageNum = this.state.multiPageNum;
        newMultiPageNum[idx] = pageNum;
        this.setState({
            multiPageNum : newMultiPageNum
        }, () => {
            this.replaceMultiData(pageNum, idx);
        });
    }
    // 当用户切换页数时，更换展示数据内容（单表查询）
    replaceData(){
        let newData = []
        if (this.state.pageNum * 10 > this.state.total) {
            for (var i = (this.state.pageNum-1) * 10; i < this.state.list.length; i++) {
                newData.push(this.state.list[i])
            }
        } 
        else {
            for (var i = (this.state.pageNum - 1) * 10; i < this.state.pageNum * 10; i++) {
                newData.push(this.state.list[i])
            }
        }
        this.setState({
            showList  : newData
        })
    }
    // 当用户切换页数时，更换展示数据内容（多表查询）
    replaceMultiData(pageNum, idx){
        let newData = [],
            newMultiTableShowList = [];
        if (pageNum * 10 > this.state.multiTableTotal[idx]) {
            for (let i = (pageNum-1) * 10; i < this.state.multiTableList[idx].length; i++) {
                newData.push(this.state.multiTableList[idx][i]);
            }
        } 
        else {
            for (let i = (pageNum - 1) * 10; i < pageNum * 10; i++) {
                newData.push(this.state.multiTableList[idx][i]);
            }
        }
        newMultiTableShowList = this.state.multiTableShowList;
        newMultiTableShowList[idx] = newData;
        this.setState({
            multiTableShowList  : newMultiTableShowList
        })
    }
    // world外键
    onClickHyperLinkWorld(e){
        let keyword = e.target.text;
        this.onHyperlink('Table', 'world.country', keyword);
    }
    // 外键 - 页面回退
    onFallBack(){
        location.reload(); 
    }

	render(){
        let tableHeads = [],
            listBody = [],
            multiPageNum = [],
            multiTableTotal = [];

        // 处理单表
        if (this.state.multiTable === false) {
            listBody = this.state.showList.map((data, index) => {
                return(
                    <tr key = {index}>
                    {
                        this.state.tableHead.map((attri, idx) => {
                            if (this.state.title.split('-')[0] === 'world') {
                                if (attri === 'CountryCode') {
                                    return(
                                        <td key = {idx}>
                                            <a className="hyperLink" onClick={(e) => {this.onClickHyperLinkWorld(e)}}>
                                                {data[attri]}
                                            </a>  
                                        </td>
                                    );
                                } else {
                                    return(
                                        <td key = {idx}>{data[attri]}</td>
                                    );
                                }
                            }
                        })
                    }
                    </tr>
                );
            });
            if (this.state.listType === 'list') {
                tableHeads = this.state.tableHead;
            }
        } 
        // 处理多表
        else {
            tableHeads = this.state.multiTableHead;
            listBody = this.state.multiTableShowList;
            multiPageNum  = this.state.multiPageNum;
            multiTableTotal  = this.state.multiTableTotal;
        }
        
        let showContent = [];
        if (this.state.multiTable === false) {
            showContent.push(
                <div key = {1}>
                    <TableList tableHeads={tableHeads}>
                        {listBody}
                    </TableList>
                    <Pagination current={this.state.pageNum} 
                                total={this.state.list.length} 
                                onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
                </div>
            )
        } 
		return(
			<div id="page-wrapper">
			    {
                    this.state.multiTable == false ? <PageTitle title = {this.state.title}/> 
                        : <PageTitle title = {'Search in single database'}/>
                }
                <DataSearch onSearch = {(searchType, searchScope, searchKeyword) =>
                 {this.onSearch(searchType, searchScope, searchKeyword)}}/>
                {/*<div className = "fallBack">
                    <button className="btn btn-primary" 
                            onClick={() => this.onFallBack()}>Fall Back
                    </button>
                </div>*/}
                <div className="tableBottom">
                    {showContent}     
                </div>
{/*                <div>
                    {this.state.msg}
                </div>*/}
			</div>
		);
	}
}

export default Index;