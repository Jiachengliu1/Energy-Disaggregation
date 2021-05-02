import React            from 'react';
import CategorySelector from './category-selector.jsx';

class DataSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchType      : 'Database', 
            searchScope     : 'world',
            searchKeyword   : ''
        }
    }
    onCategoryChange(firstCategory, secondCategory){
        this.setState({
            searchType  : firstCategory,
            searchScope : secondCategory
        })
    }
    // 数据变化的时候
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value.trim();
        this.setState({
            [name] : value
        });
    }
    // 点击搜索按钮的时候
    onSearch(){
        if (this.state.searchKeyword === '') {
            alert('Keyword cannot be null');
        }
        else {
            this.props.onSearch(this.state.searchType, 
                this.state.searchScope,this.state.searchKeyword);
        }
    }
    // 输入关键字后按回车，自动提交
    onSearchKeywordKeyUp(e){
        if(e.keyCode === 13){
            this.onSearch();
        }
    }
    render(){
        return (
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <CategorySelector onCategoryChange = {
                            (firstCategory, secondCategory) => this.onCategoryChange(firstCategory, secondCategory)}/>    
                        <div className="form-group">
                            <input id="inputSearch" 
                                type="text" 
                                className="form-control" 
                                placeholder="Keyword"
                                name="searchKeyword"
                                onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                                onChange={(e) => this.onValueChange(e)}/>
                        </div>
                        <button className="btn btn-primary" 
                            onClick={(e) => this.onSearch()}>Search</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default DataSearch;