import React, { Component } from 'react';
import {
        Icon,
        Dimmer,
        Header,
        Loader
      } from 'semantic-ui-react';
import './CanvasAnnotator.css'
const canvasWidth = 750;
const canvasHeight = 750;

class CanvasAnnotator extends Component{
  constructor(props) {
    super(props);
    if(props.image != null){
      this.state = {
        imagePresent: true,
      };
    }else{
      this.state = {
        imagePresent: false,
      };
    }
    this.redrawImage = this.redrawImage.bind(this);
  }

  componentDidMount() {
    this.clearCanvas();
  }

  handleMouseDown(event){
    console.log(event);
  }

  handleMouseUp(event){
    console.log(event);
  }

  handleMouseMove(event){
    console.log(event);
  }

  redrawImage(image){
    this.clearCanvas();
    var ctx = this.refs.canvas.getContext('2d');
    var _parent = this;
    var reader = new FileReader();
    reader.onload = function(){
      var img = new Image();
      img.onload = function(){
        var wrh = img.width / img.height;
        var newWidth = canvasWidth;
        var newHeight = newWidth / wrh;
        if (newHeight > canvasHeight) {
            newHeight = canvasHeight;
            newWidth = newHeight * wrh;
        }
        var startX = parseInt((canvasWidth - newWidth)/2)
        var startY = parseInt((canvasHeight - newHeight)/2)

        ctx.drawImage(img, startX, startY, newWidth, newHeight);
        _parent.setState({loading: false});
      }
      img.src = reader.result;
    }
    reader.readAsDataURL(image);
  }

  componentWillReceiveProps(newProps){
    console.log(newProps)
    if(newProps.image != null){
      this.setState({imagePresent: true, loading: true})
      this.redrawImage(newProps.image);
    }
  }

  clearCanvas(){
    const ctx = this.refs.canvas.getContext('2d');
    ctx.fillStyle="#FFFFFF";
    ctx.fillRect(0,0, canvasWidth, canvasHeight);
  }

  render(){
    return(
      <div>
        <center>
          <Dimmer.Dimmable dimmed={!this.state.imagePresent}>
            <Dimmer active={this.state.loading}>
              <Loader />
            </Dimmer>
            <Dimmer
              active={!this.state.imagePresent}
              >
              <Header as='h2' icon inverted>
                <Icon name='warning sign' />
                No images loaded!
                <Header.Subheader>Load a few images first.</Header.Subheader>
              </Header>
            </Dimmer>
            <canvas ref="canvas" width={canvasWidth} height={canvasHeight}>
            </canvas>
          </Dimmer.Dimmable>
        </center>
      </div>
    );
  }
}

export default CanvasAnnotator;
