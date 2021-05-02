import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom';


import Layout from 'component/layout/index.jsx';
// 页面
import Home from 'page/home/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import Exploration from 'page/dataExploration/index.jsx';
import Training from 'page/modelTraining/index.jsx';
import Prediction from 'page/modelPrediction/index.jsx';


class App extends React.Component{
	render(){
		let LayoutRouter = (
            <Layout>
			    <Switch>
				    <Route exact path="/" component = {Home}/>
				    <Route path="/data-exploration" component = {Exploration}/>
				    <Route path="/model-training" component = {Training}/>
				    <Route path="/model-prediction" component = {Prediction}/>
                    <Route component = {ErrorPage}/>
			    </Switch> 
			</Layout>
		)

		return(
			<Router>
			    <Route path = "/" render={ props => LayoutRouter }/>
			</Router>
		)
	}
}


ReactDOM.render(
	<App />,
	document.getElementById('app')
);