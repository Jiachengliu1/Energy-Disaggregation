import React  from 'react';
import {Link} from 'react-router-dom';

class NavTop extends React.Component{
	constructor(props){
		super(props);
	}
    // 退出登陆
    onLogout(){

    }
	render(){
		return(
			<div className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/"><b>DSCI</b>560</Link>
            </div>
            {/*<ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;" >
                        <i className="fa fa-user fa-fw"></i> 
                        <span>Welcome，adminxxx</span>
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>s
                            <a onClick = {() => {this.onLogout()}}>
                                <i className="fa fa-sign-out fa-fw"></i> 
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>*/}
        </div>
		);
	}
}


export default NavTop;