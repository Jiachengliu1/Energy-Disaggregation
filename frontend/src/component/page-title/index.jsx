import React from 'react';


class PageTitle extends React.Component{
	constructor(props){
		super(props);
	}
	
	componentWillMount(){
		document.title = this.props.title + ' - INF560';
	}

	render(){
		return(
			<div className="row">
                    <div className="col-md-12">
                    	{
                    		this.props.size == 'h1' ?
                    		<h1 className="page-header">{this.props.title}</h1> :
                        	<h3 className="page-header">{this.props.title}</h3>
                    	}
                        {this.props.children}
                    </div>
			</div>
		);
	}
}


export default PageTitle;