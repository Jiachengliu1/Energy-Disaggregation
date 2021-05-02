import React from 'react';

import PageTitle from 'component/page-title/index.jsx';
import './index.css'

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


class Home extends React.Component{
	

	render(){
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

  		const bull = <span className={useStyles.bullet}>•</span>;

		return(
			<div id="page-wrapper">
				<br/>
				<Card className={useStyles.root} style = {{backgroundColor: 'Azure'}}>
			    	<CardContent>
			    		<Box component="span" display="block" p={1} m={1} fontSize={27} fontWeight={500} lineHeight={1}>
					       	Project description
					    </Box>
					    <Box component="span" display="block" pl={1} ml={1} >
					       	<Box component="div" display="inline" fontSize={16} mr={1}>Project name:</Box>
						    <Box component="div" display="inline" fontSize={16} color="info.main">Energy disaggregation</Box>
					    </Box>
					    <Box component="span" display="block" pl={1} ml={1} >
					       	<Box component="div" display="inline" fontSize={16} mr={1}>Dataset:</Box>
						    <Box component="div" display="inline" fontSize={16} color="info.main">REDD</Box>
					    </Box>
					    <Box component="span" display="block" pl={1} ml={1} >
					       	<Box component="div" display="inline" fontSize={16} mr={1}>Machine learning model:</Box>
						    <Box component="div" display="inline" fontSize={16} color="info.main">LSTM(Long Short-Term Memory)
							, CNN(Convolutional Neural Network), KNN(K-Nearest Neighbors), Linear Regression, Random Forest</Box>
					    </Box>
			      	</CardContent>
			    </Card>
			    <br/>

			    <Card className={useStyles.root} style = {{backgroundColor: 'Azure'}}>
			    	<CardContent>
			    		<Box component="span" display="block" p={1} m={1} fontSize={27} fontWeight={500} lineHeight={1}>
					       	Team member and Contributions
					    </Box>
					    <Box component="span" display="block" pl={1} ml={1} >
					       	<Box component="div" display="inline" fontSize={16} mr={1}>Guangrui Cai:</Box>
						    <Box component="div" display="inline" fontSize={16} color="info.main">LSTM & Model Comparsions</Box>
					    </Box>
					    <Box component="span" display="block" pl={1} ml={1} >
					       	<Box component="div" display="inline" fontSize={16} mr={1}>Jiacheng Liu:</Box>
						    <Box component="div" display="inline" fontSize={16} color="info.main">Data Pre-processing & Random Forest</Box>
					    </Box>
					    <Box component="span" display="block" pl={1} ml={1} >
					       	<Box component="div" display="inline" fontSize={16} mr={1}>Jian Yang:</Box>
						    <Box component="div" display="inline" fontSize={16} color="info.main">Benchmark & UI</Box>
					    </Box>
					    <Box component="span" display="block" pl={1} ml={1} >
					       	<Box component="div" display="inline" fontSize={16} mr={1}>Xiao Yang:</Box>
						    <Box component="div" display="inline" fontSize={16} color="info.main">KNN & CNN</Box>
					    </Box>
			      	</CardContent>
			    </Card>
			    <br/>

			    <Card className={useStyles.root} style = {{backgroundColor: 'Azure'}}>
			    	<CardContent>
			    		<Box component="span" display="block" p={1} m={1} fontSize={27} fontWeight={500} lineHeight={1}>
				       	Goal and Improvements
				    </Box>
				    <Box component="span" display="block" pl={1} ml={1} >
					    <Box component="div" display="inline" fontSize={16}>1: Run different models</Box>
				    </Box>
				    <Box component="span" display="block" pl={1} ml={1} >
					    <Box component="div" display="inline" fontSize={16}>2: Tune model parameters</Box>
				    </Box>
				    <Box component="span" display="block" pl={1} ml={1} >
					    <Box component="div" display="block" fontSize={16}>3: Self-implementation vs. Research Papers</Box>
					    <Box component="div" display="block" fontSize={14} ml={2.5}>{bull} Different deep learning model architectures</Box>
					    <Box component="div" display="block" fontSize={14} ml={2.5}>{bull} Less training time by GPU acceleration</Box>
					    <Box component="div" display="block" fontSize={14} ml={2.5}>{bull} Lower RMSE by parameters tuning</Box>
				    </Box>
			      	</CardContent>
			    </Card>
			    <br/>

			    <Card className={useStyles.root} style = {{backgroundColor: 'Azure'}}>
			    	<CardContent>
			    		<Box component="span" display="block" p={1} m={1} fontSize={27} fontWeight={500} lineHeight={1}>
					       	References
					    </Box>
					    <Box component="span" display="block" pl={1} ml={1} >
					    	<Box component="div" display="inline" fontSize={15} mr={1}>1:</Box>
						    <Box component="div" display="inline" fontSize={15}>
							    <a href="https://www.mdpi.com/2071-1050/11/11/3222">
							    	Schirmer, P., & Mporas, I. (2019). Statistical and Electrical 
			                        Features Evaluation for Electrical Appliances Energy Disaggregation. 
			                        Sustainability. https://doi.org/10.3390/su11113222
							    </a>
						    </Box>
					    </Box>
					    <Box component="span" display="block" pl={1} ml={1} >
					    	<Box component="div" display="inline" fontSize={15} mr={1}>2:</Box>
						    <Box component="div" display="inline" fontSize={15}>
							    <a href="https://www.mdpi.com/1996-1073/12/9/1696/pdf">
							    	Shin, C., Rho, S., Lee, H., & Rhee, W. (2019). Data Requirements for 
		                        	Applying Machine Learning to Energy Disaggregation. Energies. 
		                        	https://doi.org/10.3390/en12091696
							    </a>
						    </Box>
					    </Box>
					    <Box component="span" display="block" pl={1} ml={1} >
					    	<Box component="div" display="inline" fontSize={15} mr={1}>3:</Box>
						    <Box component="div" display="inline" fontSize={15}>
							    <a href="https://arxiv.org/pdf/1507.06594">
							    	Tongta, A., & Chooruang, K. (2020, March 1). Long Short-Term Memory 
		                    		(LSTM) Neural Networks Applied to Energy Disaggregation. IEEE Conference 
		                    		Publication | IEEE Xplore. https://ieeexplore.ieee.org/document/9077413
							    </a>
						    </Box>
					    </Box>
					    <Box component="span" display="block" pl={1} ml={1} >
					    	<Box component="div" display="inline" fontSize={15} mr={1}>4:</Box>
						    <Box component="div" display="inline" fontSize={15}>
							    <a href="https://arxiv.org/pdf/1809.04356.pdf">
							    	Zhao, B., Lu, H., Chen, S., Liu, J., & Wu, D. (2017, February 1).Convolutional 
		                        	neural networks for time series classification. BIAI Journals & Magazine | IEEE 
		                        	Xplore. https://ieeexplore.ieee.org/document/7870510
							    </a>
						    </Box>
					    </Box>
			      	</CardContent>
			    </Card>

			</div>
		);
	}
}

export default Home;