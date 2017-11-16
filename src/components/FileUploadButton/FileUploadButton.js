import React, { Component } from 'react';
import {
        Label,
        Icon
      } from 'semantic-ui-react';

var styles = {
  display: 'none',
}

var clickable = {
  'cursor': 'pointer',
  'width': '100%',
  'textAlign': 'center',
  'paddingTop': '10px',
  'paddingBottom': '10px',
}
class FileUploadButton extends Component{
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.loadDirectory = this.loadDirectory.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
  }

  handleFileChange(event){
    let uploadedFiles = event.target.files;
    var newFiles = []
    for(var i = 0; i < uploadedFiles.length; i++){
      newFiles.push(uploadedFiles[i])
    }
    let files = this.state.files.concat(newFiles);
    this.props.callbackParent(files);

  }

  loadDirectory(event, data){
    this.textInput.click();
  }

  render(){
    return(
      <div>
        <Label style={clickable} size="large" onClick={this.loadDirectory} >
            <input
              ref={(input) => { this.textInput = input; }}
              multiple
              type="file"
              style={styles}
              onChange={this.handleFileChange}
            />
          Load images  <Icon name="folder open" />
        </Label>
      </div>
    );
  }
}

export default FileUploadButton;
