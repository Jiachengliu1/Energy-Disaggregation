import React from 'react';
import FileUpload from './react-fileupload.jsx';
import DoneIcon from '@material-ui/icons/Done'; 
import Button from '@material-ui/core/Button';

class FileUploader extends React.Component{
	constructor(props){
        super(props);
        this.state = {
            // upload_success       : false,
        };
    }

    upload_success(){
    	// this.setState({
     //        upload_success 		 :  true,
     //    });
        this.props.onUploadSuccess();
    }

	render(){
		const options={
			baseUrl			: 'http://127.0.0.1:8888/model_prediction_upload',
			fileFieldName   : 'file',
			dataType 		: 'json',
			uploadSuccess   : (res) => {
				this.upload_success();
			},
			uploadError     : (err) => {
				console.log('upload failed');
			}
		}
		/*Use FileUpload with options*/
		/*Set two dom with ref*/
		return (
			<FileUpload options={options}>
            	<button ref="chooseBtn" style = {{margin : "0px 10px 0px 0px"}}>choose file</button>
				<button ref="uploadBtn" style = {{margin : "0px 10px 0px 0px"}}>upload</button>
				{/*{
					this.state.upload_success === true
						?   <DoneIcon/>
						: 	[]
				}*/}
			</FileUpload>		
		)	        
	}
}

export default FileUploader;