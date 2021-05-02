import React        from 'react';
import './category-selector.css';

// 品类选择器
class CategorySelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            CategoryList  : ['Linear Regression', 'Random Forest', 'KNN', 'LSTM', 'CNN'],
            Category      : 'Linear Regression',
        }
    }
    // 选择分类
    onCategoryChange(e){
        let newValue = e.target.value;
        console.log('CategorySelector: ' + newValue)
        this.setState({
            Category       : newValue
        });
        this.props.onCategoryChange(this.state.Category);
        // console.log('CategorySelector: ' + this.state.Category)
    }
    // 传给父组件结果
    // onPropsCategoryChange(){
    //     // 判断props里的回调函数存在
    //     let categoryChangable = typeof this.props.onCategoryChange === 'function';
    //     if (categoryChangable) {
    //         this.props.onCategoryChange(this.state.Category);
    //     }
    // }
    render(){
        return (
            <div className="form-group">
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
export default CategorySelector;