// import React        from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

// import './prediction.css';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& > *': {
//         margin: theme.spacing(1),
//         },
//     },
//     input: {
//         display: 'none',
//     },
// }));


// // 品类选择器
// class Prediction extends React.Component{
//     constructor(props){
//         super(props);
//         this.state = {
//             Category      : 'Linear Regression',
//         };
//     }
//     // 选择分类
//     onCategoryChange(e){
//         let newValue = e.target.value;
//         this.setState({
//             Category      : newValue
//         }, () => this.props.onShow(this.state.Category));
//     }

//     submit(e){
//         e.preventDefault();
//         let formData = new FormData(e.target);
//         console.log(formData)
//         fetch('http://127.0.0.1:8888/model_prediction', {
//             method: 'POST',
//             body: formData //自动将input:file的name属性与文件对象组合成键值对
//         }).then(response => console.log(response))
//     };
    
//     render(){
//         return (
//             <div className="form-inline">
//                 <div>
//                     <input
//                         accept="*"
//                         style = {{display: 'none'}}
//                         id="contained-button-file"
//                         multiple
//                         type="file"
//                     />
//                     <label htmlFor="contained-button-file">
//                         <Button variant="contained" color="primary" component="span" onClick={(e) => this.submit(e)}>
//                             Upload file
//                         </Button>
//                     </label>


//                     {/*<input type="button" value="上传" onClick={this.upload}/>*/}

//                     {/*<form onSubmit={this.submit}>
//                         <input type="file" name='file'/>
//                         <input type="submit" value="Upload file"/>
//                     </form>*/}
//                 </div>
//             </div>
//         )
//     }
// }
// export default Prediction;