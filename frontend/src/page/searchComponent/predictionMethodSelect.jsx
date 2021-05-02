import React        from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';

import './trainingSearch.css';

// 品类选择器
class PredictionMethodSelect extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            CategoryList  : ['Random Forest', 'KNN', 'LSTM', 'CNN'],
            Category      : 'Random Forest',
        }
    }
    // 选择分类
    onCategoryChange(e){
        let newValue = e.target.value;
        this.setState({
            Category      : newValue
        }, () => this.props.onShow(this.state.Category));
    }
    
    // 开始预测
    onDisaggregate(e){
        this.props.onDisaggregate();
    }

    onClear(e){
        this.props.onClear();
    }


    render(){
        return (
            <div className="form-inline">
                {/*<Button color="primary" variant="outlined" style = {{margin: '0px 20px 0px 0px'}} size="small">
                    Select model
                </Button>*/}
                <Typography variant="h5" component="h5" display='inline'>
                    Select model:
                </Typography>
                <select className="form-control cate-select" style = {{margin: '0px 20px 3px 10px'}}
                    onChange={(e) => this.onCategoryChange(e)}>
                    {
                        this.state.CategoryList.map(
                            (category,index) => 
                            <option key={index}>{category}</option>
                        )
                    }    
                </select>
                <Button color="primary" variant="contained" style = {{margin: '0px 20px 0px 0px'}} 
                    size="small" onClick = {(e) => this.onDisaggregate(e)}>
                    disaggregate
                </Button>
                <Button color="primary" variant="contained" style = {{margin: '0px 20px 0px 0px'}}
                    size="small" onClick = {(e) => this.onClear(e)}>
                    clear
                </Button>
            </div>
        )
    }
}
export default PredictionMethodSelect;