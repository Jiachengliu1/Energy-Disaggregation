import React from 'react';
import {Link} from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import dbData from 'service/data-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import TrainingSearch from '../searchComponent/trainingSearch.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import Process from './process.jsx';

import Table from './table.jsx';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


import './index.css';

const _mm = new MUtil();
const _data = new dbData();
const _process = new Process();

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class Training extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data                : [],
            Category            : 'Linear Regression',
            showContent         : [],
        };
    }
    componentWillMount(){

    }
    componentWillReceiveProps(){

    }
    componentDidMount(){

    }

    // 展示
    onShow(Category){
        this.setState({
            Category  :  Category
        }, () => {
            this.loadData(); 
        });
    }

    // 加载数据
    loadData(){
        let listParam = {};
        listParam.Category  = this.state.Category;
        // 请求接口
        _data.getData_modelTraining(listParam).then(res => {
            // this.setState({
            //     data : res.data 
            // }, () => console.log(this.state.data['Model Comparsion']['RMSE']['Head']))
            this.setState({
                data : res.data 
            }, () => this.makeShowList())
        }, errMsg => {
            this.setState({
                data : []
            });
            _mm.errorTips(errMsg);
        });
    }


    makeShowList(){
        let showContent = _process.getShowData(this.state.Category, this.state.data);
        
        this.setState({
            showContent  :  showContent,
        })
    }


    render(){
        let showContent = this.state.showContent;
        return(
            <div id="page-wrapper">
                <Card className={useStyles.root} style = {{backgroundColor: 'GhostWhite'}}>
                    <CardContent>
                        <PageTitle title = {'Model Training'} size = {'h1'}/> 
                        <TrainingSearch onShow = {(Category) =>{this.onShow(Category)}}/>
                    </CardContent>
                </Card>

                <div className="Table">
                    {showContent}
                </div>
            </div>
        );
    }
}

export default Training;