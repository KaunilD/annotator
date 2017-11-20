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
      currentImage: null
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
        <Header as='h1'>
        Annotator.
        </Header>
        <Grid columns={2} divided>
          <Grid.Row stretched>
            <Grid.Column width={13}>
                <CanvasAnnotator image={currentImage} />
            </Grid.Column>
            <Grid.Column width={3}>
              <Grid.Row className="padLR">
                <FileUploadButton callbackParent={this.onFilesChanged} label="Open"/>
              </Grid.Row>
              <Divider horizontal><Icon name="circle thin" /></Divider>
              <Grid.Row className="padLR">
                <center>
                  <Button content="Save" icon="save" lableposition="left" />
                  <Button content="Undo" icon="undo" lableposition="left" />
                </center>
              </Grid.Row>
              <Divider horizontal>Classes</Divider>
              <Grid.Row className="padLR">
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
              </Grid.Row>
              <Divider horizontal><Icon name="circle thin" /></Divider>
              <Grid.Row className="padLR">
                <TabComponent
                  images={this.state.images}
                  callbackParent={this.onSelectedImageChange}
                />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
