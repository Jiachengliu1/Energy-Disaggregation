import React from 'react';
import {Link} from 'react-router-dom';

import MUtil from 'util/mm.jsx';
import dbData from 'service/data-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
// import Prediction from '../searchComponent/prediction.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';
import PredictionMethodSelect from '../searchComponent/predictionMethodSelect.jsx';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done'; 

import FileUploader from 'util/file-uploader/index.jsx';

import {VerticalBarSeries,
        VerticalBarSeriesCanvas,
        XYPlot, XAxis, YAxis, 
        HorizontalGridLines, 
        VerticalGridLines, 
        LabelSeries,
        AreaSeries,
        LineMarkSeries,
        Crosshair,
        LineSeries} 
from 'react-vis';
import '../../../node_modules/react-vis/dist/style.css';

import './index.css';

const _mm = new MUtil();
const _data = new dbData();

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


const timestamp1 = new Date('September 9 2017').getTime();
const timestamp2 = new Date('2011/05/01').getTime();
const time_six_hour = 21600000;
const time_half_hour = 1800000;
const time_ten_mins = 600000;
const time_five_mins = 300000;
// const time_data = [
//     [
//         {x: timestamp1 + time_six_hour, y: 10},
//         {x: timestamp1 + time_six_hour * 2, y: 4},
//         {x: timestamp1 + time_six_hour * 3, y: 2},
//         {x: timestamp1 + time_six_hour * 4, y: 15}
//     ]
// ];



class Prediction extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Category            : 'Random Forest',
            showContent         : [],
            disaggregate_done   : false,
            show_progress       : false,
            res                 : {},
            show_data           : [],
            crosshairValues     : [],
            isUploaded          : false,
            isFormat_CrossValue : false,
        };
    }

    // 展示
    onShow(Category){
        this.setState({
            Category  :  Category
        });
    }


    onDisaggregate(){
        this.setState({
            disaggregate_done   :  false,
            showContent         :  [],
            res                 :  {},
            show_data           :  [],
            show_progress       :  true,
        })
        let listParam = {};
        listParam.Category  = this.state.Category;
        _data.getData_ModelPrediction(listParam).then(res => {
            this.setState({
                res  :  res.res
            }, () => this.process_data())
        }, errMsg => {
            this.setState({
                data : []
            });
            _mm.errorTips(errMsg);
        });
    }

    process_data(){
        let resource_data = this.state.res,
            total_consumption_data = resource_data['total_consumption'],
            dish_data_list = resource_data['dish'],
            ref_data_list = resource_data['ref'];

        let startTime = total_consumption_data['time'].split(' ')[0].replaceAll('-', '/'),
            total_value_list = total_consumption_data['value'];

        let startTime_to_timestamp = new Date(startTime).getTime();
        
        let total_show_data = [],
            dish_show_data = [],
            ref_show_data = [];
        
        total_value_list.map((val, idx) => (
            total_show_data.push({x: startTime_to_timestamp + (idx+1) * time_five_mins, y: val})
        ));
        dish_data_list.map((val, idx) => (
            dish_show_data.push({x: startTime_to_timestamp + (idx+1) * time_five_mins, y: val})
        ));
        ref_data_list.map((val, idx) => (
            ref_show_data.push({x: startTime_to_timestamp + (idx+1) * time_five_mins, y: val})
        ));

        let total_data_dic = [],
            dish_data_dic = [],
            ref_data_dic = [];
        total_data_dic.push(total_show_data);
        dish_data_dic.push(dish_show_data);
        ref_data_dic.push(ref_show_data);

        let update_show_data = [];
        update_show_data.push(total_data_dic);
        update_show_data.push(dish_data_dic);
        update_show_data.push(ref_data_dic);

        this.setState({
            show_data           :  update_show_data,
            disaggregate_done   :  true,
            show_progress       :  false,
        });
    }

    onUploadSuccess(){
        this.setState({
            isUploaded          : true,
        })
    }


    onClear(){
        this.setState({
            disaggregate_done   :  false,
            showContent         :  [],
            res                 :  {},
            show_data           :  [],
        })
    }

    onDeleteFile(){
        _data.delete_File().then(res => {
            this.setState({
                isUploaded      : false,
            })
        });
    }


    onMouseLeave(){
        this.setState({
            crosshairValues     : [],
        })
    }

    onNearestX_totalConsumption(value, {index}){
        let crosshairValues = this.state.crosshairValues
        crosshairValues[0] = this.state.show_data[0].map(d => d[index].y !== null && d[index])
        // console.log('----------------')
        // console.log(crosshairValues[0][0])
        // console.log(crosshairValues[0][0]['x'])
        // console.log(crosshairValues[0][0].x)
        // console.log('----------------')
        // crosshairValues[0][0].x = this.formatDate(crosshairValues[0][0].x);
        // crosshairValues[0][0] = {x: this.formatDate(crosshairValues[0][0].x), y: crosshairValues[0][0].y};
        this.setState({
            crosshairValues: crosshairValues
        });
    }
    onNearestX_dishConsumption(value, {index}){
        let crosshairValues = this.state.crosshairValues
        crosshairValues[1] = this.state.show_data[1].map(d => d[index].y !== null && d[index])

        this.setState({
            crosshairValues: crosshairValues
        });
    }
    onNearestX_refConsumption(value, {index}){
        let crosshairValues = this.state.crosshairValues
        crosshairValues[2] = this.state.show_data[2].map(d => d[index].y !== null && d[index])
        this.setState({
            crosshairValues: crosshairValues
        });
    }


    add0(m){
        return m < 10 ? '0' + m : m;
    }

    // 将时间戳转换成日期
    formatDate(timeStamp){
        let time = new Date(timeStamp),
            y = time.getFullYear(),
            m = time.getMonth() + 1,
            d = time.getDate(),
            h = time.getHours(),
            mm = time.getMinutes(),
            s = time.getSeconds();

        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    }

    render(){
        let showContent = [];
        let da = 1304255100000;
        // console.log(this.formatDate(da))

        if(this.state.disaggregate_done){
            let resource  = this.state.show_data;
            // console.log(resource)
            let LineSeries_totalConsumption_Props = {
                data        : resource[0][0],
                onNearestXY : (datapoint, event) => this.onNearestX_totalConsumption(datapoint, event),
                getNull     : d => d.y !== null,
                color       : '#0066FF',
                key         : 'total'
            };
            let LineSeries_dishConsumption_Props = {
                data        : resource[1][0],
                onNearestXY : (datapoint, event) => this.onNearestX_dishConsumption(datapoint, event),
                getNull     : d => d.y !== null,
                color       : '#FF3333',
            };
            let LineSeries_refConsumption_Props = {
                data        : resource[2][0],
                onNearestXY : (datapoint, event) => this.onNearestX_refConsumption(datapoint, event),
                getNull     : d => d.y !== null,
                color       : '#00FF00',
            };
            showContent.push(
                <div>
                    <Card className={useStyles.root} style = {{backgroundColor: 'Snow'}}>
                        <CardContent>
                            <span style = {{color: '#0066FF', fontWeight: 'bold'}}>
                                Total consumption
                            </span>
                            <XYPlot xType="time" width={1150} height={200}>
                                <HorizontalGridLines />
                                <VerticalGridLines />
                                <XAxis title="Timestamp" />
                                <YAxis title="Power(W)" />
                                <Crosshair values={this.state.crosshairValues[0]} getNull={d => d.y !== null} />
                                <LineSeries {...LineSeries_totalConsumption_Props}/>
                            </XYPlot>
                        </CardContent>
                    </Card>
                    <Card className={useStyles.root} style = {{backgroundColor: 'Snow'}}>
                        <CardContent>
                            <span style = {{color: '#FF3333', fontWeight: 'bold'}}>
                                Dish washer
                            </span>
                            <XYPlot xType="time" width={1150} height={200}>
                                <HorizontalGridLines />
                                <VerticalGridLines />
                                <XAxis title="Timestamp" />
                                <YAxis title="Power(W)" />
                                <Crosshair values={this.state.crosshairValues[1]} getNull={d => d.y !== null} />
                                <LineSeries {...LineSeries_dishConsumption_Props}/>
                            </XYPlot>
                        </CardContent>
                    </Card>
                    <Card className={useStyles.root} style = {{backgroundColor: 'Snow'}}>
                        <CardContent>
                            <span style = {{color: '#00FF00', fontWeight: 'bold'}}>
                                Refrigerator
                            </span>
                            <XYPlot xType="time" width={1150} height={200}>
                                <HorizontalGridLines />
                                <VerticalGridLines />
                                <XAxis title="Timestamp" />
                                <YAxis title="Power(W)" />
                                <Crosshair values={this.state.crosshairValues[2]} getNull={d => d.y !== null} />
                                <LineSeries {...LineSeries_refConsumption_Props}/>
                            </XYPlot>
                        </CardContent>
                    </Card>
                </div>
            );
        } 

        
        return(
            <div id="page-wrapper">
                <Card className={useStyles.root} style = {{backgroundColor: 'GhostWhite'}}>
                    <CardContent>
                        <PageTitle title = {'Model Prediction'} size = {'h1'}/> 
                        <div>
                            <div style = {{display: 'inline-block'}}>
                                <FileUploader onUploadSuccess = {() => this.onUploadSuccess()}/>
                            </div>
                            {
                                this.state.isUploaded === true
                                    ?   <DoneIcon/>
                                    :   []
                            }
                            <div style = {{display: 'inline-block'}}>
                                <Button color="primary" variant="contained" style = {{margin: '0px 20px 18px 10px'}}
                                    size="small" onClick = {(e) => this.onDeleteFile(e)}>
                                    delete file
                                </Button>
                            </div>
                        </div>
                       
                        <br/>
                        <div style = {{display: 'flex'}}>
                            <PredictionMethodSelect onShow = {(Category) =>{this.onShow(Category)}}
                                                    onDisaggregate = {() => this.onDisaggregate()}
                                                    onClear = {() => this.onClear()}/>
                            {
                                this.state.show_progress === true
                                    ?  <CircularProgress size = {25} style = {{margin: '6px 0px 0px 0px'}}/> 
                                    : []
                            }
                        </div>
                    </CardContent>
                </Card>

                <br/>

                {
                    this.state.disaggregate_done === true 
                        ? showContent
                        : []
                }
            </div>
        );
    }
}

export default Prediction;