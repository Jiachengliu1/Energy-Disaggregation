import React        from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './trainingSearch.css';


// 品类选择器
class TrainingSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            CategoryList  : ['Linear Regression', 'Random Forest', 'KNN', 'LSTM', 'CNN', 'Model Comparsion'],
            Category      : 'Linear Regression',
        }
    }
    // 选择分类
    onCategoryChange(e){
        let newValue = e.target.value;
        this.setState({
            Category      : newValue
        }, () => this.props.onShow(this.state.Category));
    }
    
    render(){
        return (
            <div className="form-inline">
                <Button color="primary" variant="contained" style = {{margin: '0px 20px 0px 0px'}} size="small">
                    Select model
                </Button>
                <select className="form-control cate-select"
                    onChange={(e) => this.onCategoryChange(e)}>
                    {
                        this.state.CategoryList.map(
                            (category,index) => 
                            <option key={index}>{category}</option>
                        )
                    }    
                </select>
            </div>
        )
    }
}
export default TrainingSearch;