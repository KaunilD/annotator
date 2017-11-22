import React, { Component } from 'react';
import './App.css';
import {
        Grid,
        Button,
        List,
        Divider,
        Icon,
        Header
    } from 'semantic-ui-react';
import TabComponent from './components/TabComponent'
import FileUploadButton from './components/FileUploadButton';
import CanvasAnnotator from './components/CanvasAnnotator';
class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      images: [],
      currentImage: null,
      containerRect: {top:0, left:0, right:0, bottom:0}
    }
    this.onFilesChanged = this.onFilesChanged.bind(this);
    this.onSelectedImageChange = this.onSelectedImageChange.bind(this);
  }
  onFilesChanged(newFiles){
    let newImages = this.state.images.concat(newFiles);
    this.setState({
      images:newImages,
      currentImage: 0
    });
  }

  componentDidMount(){
    this.setState({
      containerRect: this.refs.canvasContainer.getBoundingClientRect()
    });
  }

  onSelectedImageChange(newImageIndex){
    this.setState({
      currentImage: newImageIndex
    })
  }


  render() {
    var currentImage;
    if(this.state.currentImage == null){
      currentImage = null;
    }else{
      currentImage = this.state.images[parseInt(this.state.currentImage, 10)];
    }
    return (
      <div>
      <div
        ref = 'canvasContainer'
        style={{
          height:'100%',
          width:'75%',
          position:'absolute',
          top:'0px',
          left:'0px',
          float:'left'
        }}
      >
        <CanvasAnnotator
          image={currentImage}
          width={this.state.containerRect.right - this.state.containerRect.left}
          height={this.state.containerRect.bottom - this.state.containerRect.top}
        />
      </div>
      <div
        style={{
          padding:'10px 10px 10px 10px',
          float:'right',
          marginLeft:'75%',
          height:'100vh',
          width: '25%'
        }}>
          <Header as='h1' >Annotator</Header>
          <Divider horizontal><Icon name="circle thin" /></Divider>
          <FileUploadButton callbackParent={this.onFilesChanged} label="Open"/>
          <Divider horizontal><Icon name="circle thin" /></Divider>
          <center>
              <Button content="Save" icon="save" lableposition="left" />
              <Button content="Undo" icon="undo" lableposition="left" />
          </center>
          <Divider horizontal>Classes</Divider>
          <List>
            <List.Item>
                New Class
                <List.Content floated="right">
                  <Icon name="plus" className="clickable"/>
                </List.Content>
            </List.Item>
            <List.Item>
                Orange
                <List.Content floated="right">
                  <Icon name="trash" className="clickable"/>
                </List.Content>
            </List.Item>
            <List.Item>
                Apple
                <List.Content floated="right">
                  <Icon name="trash" className="clickable"/>
                </List.Content>

            </List.Item>
            <List.Item>
                Banana
                <List.Content floated="right">
                  <Icon name="trash" className="clickable"/>
                </List.Content>

            </List.Item>
          </List>
          <Divider horizontal><Icon name="circle thin" /></Divider>
            <TabComponent
              images={this.state.images}
              callbackParent={this.onSelectedImageChange}
            />
      </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}
export default App;
