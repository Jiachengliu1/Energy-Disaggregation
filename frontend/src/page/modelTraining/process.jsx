import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TableList from 'util/table-list/index.jsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import _imagesData from './images_source.jsx';


'use strict';

const card_Styles = makeStyles({
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

const steps_Styles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));


const images_Styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

// const activeStep = React.useState(0);
// const setActiveStep = React.useState(0);


// getStepContent : function(stepIndex) {
//     switch (stepIndex) {
//         case 0:
//             return 'Select campaign settings...';
//         case 1:
//             return 'What is an ad group anyways?';
//         case 2:
//             return 'This is the bit I really care about!';
//         default:
//             return 'Unknown stepIndex';
//     }
// }


// function getSteps() {
//   return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
// }


class Process extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cur_step  :  0,
        };
    }

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return 'Select campaign settings...';
            case 1:
                return 'What is an ad group anyways?';
            case 2:
                return 'This is the bit I really care about!';
            default:
                return 'Unknown stepIndex';
        }
    }
 
    getSteps() {
        return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
    }

    handleNext() {
        console.log('before handleNext: ' + this.state.cur_step)
        let cur_step = this.state.cur_step + 1;
        this.setState({
            cur_step : cur_step,
        });
        // this.state.cur_step = cur_step;
        console.log('after handleNext: ' + this.state.cur_step)
    }

    handleBack() {
        console.log('before handleBack: ' + this.state.cur_step)
        let cur_step = this.state.cur_step - 1;
        this.setState({
            cur_step : cur_step,
        });
        console.log('after handleBack: ' + this.state.cur_step)
    }

    handleReset() {
        console.log('before handleReset: ' + this.state.cur_step)
        this.setState({
            cur_step : 0,
        });
        console.log('after handleReset: ' + this.state.cur_step)
    }


    getShowData(Category, sourceData){
        if(Category == 'Linear Regression'){
            let showContent = [];
            let tableHeads = sourceData['Linear Regression']['Result']['Head'];
            let tableBody = sourceData['Linear Regression']['Result']['Body'].map((data, index) => {
                return(
                    <tr key={index}>
                    {
                        sourceData['Linear Regression']['Result']['Head'].map((attri, idx) => {
                            return(
                                <td key = {idx}>
                                    {data[idx]}
                                </td>
                            )
                        })
                    }
                    </tr>
                );
            });

            showContent.push(
                <div>
                    <Card className={card_Styles.root} style = {{backgroundColor: 'Azure'}}>
                        <CardContent>
                            <Button color="secondary" variant="contained" style = {{margin: '0px 20px 10px 0px', fontSize: 17}} size="small">
                                Linear Regression Result
                            </Button>
                            <TableList tableHeads={tableHeads}>
                                {tableBody}
                            </TableList>
                        </CardContent>
                    </Card>
                </div>   
            )
            return showContent;
        }

        if(Category == 'Random Forest'){
            let showContent = [],
                tableHeads = {},
                tableBody = {};

            tableHeads['Classification'] = sourceData['Random Forest']['Classification']['Head'];
            tableBody['Classification'] = sourceData['Random Forest']['Classification']['Body'].map((data, index) => {
                return(
                    <tr key={index}>
                    {
                        sourceData['Random Forest']['Classification']['Head'].map((attri, idx) => {
                            return(
                                <td key = {idx}>
                                    {data[idx]}
                                </td>
                            )
                        })
                    }
                    </tr>
                );
            });

            tableHeads['Regression'] = sourceData['Random Forest']['Regression']['Head'];
            tableBody['Regression'] = sourceData['Random Forest']['Regression']['Body'].map((data, index) => {
                return(
                    <tr key={index}>
                    {
                        sourceData['Random Forest']['Regression']['Head'].map((attri, idx) => {
                            return(
                                <td key = {idx}>
                                    {data[idx]}
                                </td>
                            )
                        })
                    }
                    </tr>
                );
            });

            showContent.push(
                <div>
                    <div key = {1}>
                        <Card className={card_Styles.root} style = {{backgroundColor: 'Azure'}}>
                            <CardContent>
                                <Button color="secondary" variant="contained" style = {{margin: '0px 20px 10px 0px', fontSize: 17}} size="small">
                                    Random Forest Classification
                                </Button>
                                <Typography variant="h5" component="h5">
                                    max_depth = 5
                                </Typography>
                                <TableList tableHeads={tableHeads['Classification']}>
                                    {tableBody['Classification']}
                                </TableList>
                            </CardContent>
                        </Card>
                    </div>
                    <br/>
                    <div key = {2}>
                        <Card className={card_Styles.root} style = {{backgroundColor: 'Azure'}}>
                            <CardContent>
                                <Button color="secondary" variant="contained" style = {{margin: '0px 20px 10px 0px', fontSize: 17}} size="small">
                                    Random Forest Regression
                                </Button>
                                <Typography variant="h5" component="h5">
                                    n_estimators = 15, random_state = 10
                                </Typography>
                                <TableList tableHeads={tableHeads['Regression']}>
                                    {tableBody['Regression']}
                                </TableList>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )
            return showContent
        }


        if(Category == 'KNN'){
            let showContent = [],
                tableHeads = {},
                tableBody = {};

            tableHeads['Classification'] = sourceData['KNN']['Classification']['Head'];
            tableBody['Classification'] = sourceData['KNN']['Classification']['Body'].map((data, index) => {
                return(
                    <tr key={index}>
                    {
                        sourceData['KNN']['Classification']['Head'].map((attri, idx) => {
                            return(
                                <td key = {idx}>
                                    {data[idx]}
                                </td>
                            )
                        })
                    }
                    </tr>
                );
            });

            tableHeads['Regression'] = sourceData['KNN']['Regression']['Head'];
            tableBody['Regression'] = sourceData['KNN']['Regression']['Body'].map((data, index) => {
                return(
                    <tr key={index}>
                    {
                        sourceData['KNN']['Regression']['Head'].map((attri, idx) => {
                            return(
                                <td key = {idx}>
                                    {data[idx]}
                                </td>
                            )
                        })
                    }
                    </tr>
                );
            });

            showContent.push(
                <div>
                    <div key = {1}>
                        <Card className={card_Styles.root} style = {{backgroundColor: 'Azure'}}>
                            <CardContent>
                                <Button color="secondary" variant="contained" style = {{margin: '0px 20px 10px 0px', fontSize: 17}} size="small">
                                    KNN Classification
                                </Button>
                                <Typography variant="h5" component="h5">
                                    n_neighbors = 500
                                </Typography>
                                <TableList tableHeads={tableHeads['Classification']}>
                                    {tableBody['Classification']}
                                </TableList>
                            </CardContent>
                        </Card>
                    </div>
                    <br/>
                    <div key = {2}>
                        <Card className={card_Styles.root} style = {{backgroundColor: 'Azure'}}>
                            <CardContent>
                                <Button color="secondary" variant="contained" style = {{margin: '0px 20px 10px 0px', fontSize: 17}} size="small">
                                    KNN Regression
                                </Button>
                                <Typography variant="h5" component="h5">
                                    n_neighbors = 500
                                </Typography>
                                <TableList tableHeads={tableHeads['Regression']}>
                                    {tableBody['Regression']}
                                </TableList>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )
            return showContent

        }


        if(Category == 'Model Comparsion'){
            let showContent = [],
                tableHeads = {},
                tableBody = {};

            tableHeads['RMSE'] = sourceData['Model Comparsion']['RMSE']['Head'];
            tableBody['RMSE'] = sourceData['Model Comparsion']['RMSE']['Body'].map((data, index) => {
                return(
                    <tr key={index}>
                    {
                        sourceData['Model Comparsion']['RMSE']['Head'].map((attri, idx) => {
                            return(
                                <td key = {idx}>
                                    {data[idx]}
                                </td>
                            )
                        })
                    }
                    </tr>
                );
            });

            tableHeads['MAE'] = sourceData['Model Comparsion']['MAE']['Head'];
            tableBody['MAE'] = sourceData['Model Comparsion']['MAE']['Body'].map((data, index) => {
                return(
                    <tr key={index}>
                    {
                        sourceData['Model Comparsion']['MAE']['Head'].map((attri, idx) => {
                            return(
                                <td key = {idx}>
                                    {data[idx]}
                                </td>
                            )
                        })
                    }
                    </tr>
                );
            });

            showContent.push(
                <div>
                    <div key = {1}>
                        <Card className={card_Styles.root} style = {{backgroundColor: 'Azure'}}>
                            <CardContent>
                                {/*<PageTitle title = {'RMSE'} size = {'h3'}/>*/}
                                <Button color="secondary" variant="contained" style = {{margin: '0px 20px 10px 0px', fontSize: 17}} size="small">
                                    RMSE
                                </Button>
                                <TableList tableHeads={tableHeads['RMSE']}>
                                    {tableBody['RMSE']}
                                </TableList>
                            </CardContent>
                        </Card>
                    </div>
                    <br/>
                    <div key = {2}>
                        <Card className={card_Styles.root} style = {{backgroundColor: 'Azure'}}>
                            <CardContent>
                                {/*<PageTitle title = {'MAE'} size = {'h3'}/>*/}
                                <Button color="secondary" variant="contained" style = {{margin: '0px 20px 10px 0px', fontSize: 17}} size="small">
                                    MAE
                                </Button>
                                <TableList tableHeads={tableHeads['MAE']}>
                                    {tableBody['MAE']}
                                </TableList>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )
            return showContent
        }

        if(Category == 'CNN'){
            let showContent = [];
            let tableHeads = sourceData['CNN']['Result']['Head'];
            let tableBody = sourceData['CNN']['Result']['Body'].map((data, index) => {
                return(
                    <tr key={index}>
                    {
                        sourceData['CNN']['Result']['Head'].map((attri, idx) => {
                            return(
                                <td key = {idx}>
                                    {data[idx]}
                                </td>
                            )
                        })
                    }
                    </tr>
                );
            });

            const steps = this.getSteps();
            // let cur_step = 0;

            // const [activeStep, setActiveStep] = React.useState(0);

            const handleNext = () => {
                // console.log('before handleNext: ' + this.state.cur_step)
                // let cur_step = this.state.cur_step + 1;
                // this.setState({
                //     cur_step : cur_step,
                // });
                // // this.state.cur_step = cur_step;
                // console.log('after handleNext: ' + this.state.cur_step)
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            };
            

            const handleBack = () => {
                // this.setState({
                //     cur_step : cur_step - 1,
                // });
                // // cur_step = cur_step - 1;

                setActiveStep((prevActiveStep) => prevActiveStep - 1);
            };

            const handleReset = () => {
                // setActiveStep(0);
                // this.setState({
                    // cur_step : 0,
                // });
                // cur_step = 0;
                setActiveStep(0);
            };

            showContent.push(
                <div>
                    <Card className={card_Styles.root} style = {{backgroundColor: 'Azure'}}>
                        <CardContent>
                            {/*{<Box component="span" display="block" p={1} m={1} fontSize={27} fontWeight={500} lineHeight={1}>
                                CNN Architecture
                            </Box>}*/}
                            <Button color="secondary" variant="contained" style = {{margin: '0px 20px 10px 0px', fontSize: 17}} size="small">
                                    CNN Architecture
                            </Button>
                            <Box component="span" display="block" pl={1} ml={1} >
                                <Box component="div" display="inline" fontSize={16} mr={1}>Convolutional Layer:</Box>
                                <Box component="div" display="inline" fontSize={16} color="info.main">Perform convolution operations with convolutional filters</Box>
                            </Box>
                            <Box component="span" display="block" pl={1} ml={1} >
                                <Box component="div" display="inline" fontSize={16} mr={1}>Pooling Layer:</Box>
                                <Box component="div" display="inline" fontSize={16} color="info.main">Divide convolutional outputs into equal-length segments</Box>
                            </Box>
                            <Box component="span" display="block" pl={1} ml={1} >
                                <Box component="div" display="inline" fontSize={16} mr={1}>Flatten Layer:</Box>
                                <Box component="div" display="inline" fontSize={16} color="info.main">Flatten pooled outputs into a column</Box>
                            </Box>
                            <Box component="span" display="block" pl={1} ml={1} >
                                <Box component="div" display="inline" fontSize={16} mr={1}>Dense Layer:</Box>
                                <Box component="div" display="inline" fontSize={16} color="info.main">Compose the final output layer</Box>
                            </Box>
                        </CardContent>
                    </Card>

                    <br/>

                    <Card className={card_Styles.root} style = {{backgroundColor: 'Azure'}}>
                        <CardContent>
                            <Button color="secondary" variant="contained" style = {{margin: '0px 20px 10px 0px', fontSize: 17}} size="small">
                                    CNN Result
                            </Button>
                            <TableList tableHeads={tableHeads}>
                                {tableBody}
                            </TableList>
                        </CardContent>
                    </Card>
                    
                    {/*<Card className={card_Styles.root} style = {{backgroundColor: 'White'}}>
                        <CardContent>
                            <div className={steps_Styles.root}>
                                <Stepper activeStep={activeStep} alternativeLabel>
                                    {   
                                        steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))
                                    }
                                </Stepper>

                                <div>
                                    {
                                        activeStep === steps.length ? (
                                            <div>
                                                <Typography className={steps_Styles.instructions}>All steps completed</Typography>
                                                <Button onClick={() => this.handleReset()}>Reset</Button>
                                            </div>
                                        ) : (
                                            <div>
                                                {<Typography className={steps_Styles.instructions}>{this.getStepContent(this.state.cur_step)}</Typography>}
                                                <div>
                                                    <Button
                                                        disabled={activeStep === 0}
                                                        onClick={() => this.handleBack()}
                                                        className={steps_Styles.backButton}
                                                    >
                                                        Back
                                                    </Button>
                                                    <Button variant="contained" color="primary" onClick={handleNext}>
                                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </CardContent>
                    </Card>*/}

                </div>
            )

            return showContent
        }

        if(Category == 'LSTM'){
            let showContent = [];
            let tableHeads = sourceData['LSTM']['Result']['Head'];
            let tableBody = sourceData['LSTM']['Result']['Body'].map((data, index) => {
                return(
                    <tr key={index}>
                    {
                        sourceData['LSTM']['Result']['Head'].map((attri, idx) => {
                            return(
                                <td key = {idx}>
                                    {data[idx]}
                                </td>
                            )
                        })
                    }
                    </tr>
                );
            });


            showContent.push(
                <div>
                    <Card className={card_Styles.root} style = {{backgroundColor: 'Azure'}}>
                        <CardContent>
                            <Button color="secondary" variant="contained" style = {{margin: '0px 20px 10px 0px', fontSize: 17}} size="small">
                                LSTM Architecture
                            </Button>
                            <div className={images_Styles.root}>
                                <GridList cellHeight={180} className={images_Styles.gridList}>
                                {
                                    _imagesData.map((image) => (
                                        <GridListTile key={image.img}>
                                        <img src={image.img} alt={image.title} />
                                        </GridListTile>
                                    ))
                                }
                              </GridList>
                            </div>
                        </CardContent>
                    </Card>

                    <br/>

                    <Card className={card_Styles.root} style = {{backgroundColor: 'Azure'}}>
                        <CardContent>
                            <Button color="secondary" variant="contained" style = {{margin: '0px 20px 10px 0px', fontSize: 17}} size="small">
                                LSTM Result
                            </Button>
                            <TableList tableHeads={tableHeads}>
                                {tableBody}
                            </TableList>
                        </CardContent>
                    </Card>
                </div>
                
            )

            return showContent;
        }
    }
}

export default Process;