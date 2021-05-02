import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import SvgIcon from '@material-ui/core/SvgIcon';

class NavSide extends React.Component{
	constructor(props){
		super(props);
	}

	render(){

		return(
			<div className="navbar-default navbar-side">
            <div className="sidebar-collapse">
                <ul className="nav">
					<li>
                        <NavLink exact activeClassName = "active-menu" to = "/">
                            {/*<i className="fa fa-bar-chart-o"></i>*/}
                            {/*<HomeIcon />*/}
                            <SvgIcon style={{fontSize: 20, margin: '0px 12px -4px 5px'}}>
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </SvgIcon>
                            <span style={{ margin: '2px'}}>Home</span>
                        </NavLink>
                    </li>
                    <li className="active">
                        <Link to="/model-training">
                            {/*<i className="fa fa-sitemap"></i> */}
                            <i className="fa fa-bar-chart-o"/>
                            <span>Application</span>
                            <span className="fa arrow"></span>
                        </Link>
                        <ul className="nav nav-second-level collapse in">
                            {/*<li>
                                <NavLink to="/data-exploration" activeClassName="active-menu">Data Exploration</NavLink>
                            </li>*/}
                            <li>
                                <NavLink to="/model-training" activeClassName="active-menu">Model Training</NavLink>
                            </li>
                            <li>
                                <NavLink to="/model-prediction" activeClassName="active-menu">Model Prediction</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>

            </div>

        </div>
	    );
	}
}


export default NavSide;