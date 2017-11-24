import React, { Component } from 'react';
import {
        Icon,
        Dimmer,
        Header,
        Loader
      } from 'semantic-ui-react';
import './CanvasAnnotator.css'


Array.prototype.peek = function(){
  return this[this.length - 1]
}

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

    this.imageData = null;
    this.ctx = null;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.imageWidth = 0;
    this.imageHeight = 0;
    this.canvasRect = null;
    this.rects = [];
    this.drawing = false;
    this.saved = false;
    this.startX = 0;
    this.startY = 0;

    this.redrawImage = this.redrawImage.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  clearCanvas(){
    this.ctx = this.refs.canvas.getContext('2d');
    this.ctx.fillStyle="#FFFFFF";
    console.log(this.canvasWidth, this.canvasHeight);
    this.ctx.fillRect(0,0, this.canvasWidth, this.canvasHeight);
  }

  componentDidMount() {
    this.clearCanvas();
  }

  getImageCoordinates(canvasWidth, canvasHeight, eventX, eventY){
    return [
      eventX - this.canvasRect.left, eventY - this.canvasRect.top
    ]
  }

  handleMouseDown(event){
    if(!this.saved){
      this.rects.pop();
    }
    this.saved = false;

    this.drawing = true;

    var x = 0;
    var y = 0;

    if(event.clientX > this.imageWidth + this.startX){
        x = this.imageWidth + this.startX;
    }else{
        x = event.clientX;
    }
    if (event.clientX < this.startX){
        x = this.startX
    }else{
        x = event.clientX;
    }

    if(event.clientY > this.imageHeight + this.startY){
        y = this.imageHeight + this.startY;
    }else{
        y = event.clientY;
    }
    if (event.clientY < this.startY){
        y = this.startY
    }else{
        y = event.clientY;
    }

    let xy = [x, y];
    this.rects.push({
      x: xy[0],
      y: xy[1]
    });
    this.imageData = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
  }

  handleMouseUp(event){
    this.drawing = false;
  }

  handleMouseMove(event){
    if(this.drawing){
      this.ctx.putImageData(this.imageData, 0, 0);

      //let xy = this.getImageCoordinates(this.canvasWidth, this.canvasHeight, event.clientX, event.clientY);
      var x = event.clientX > this.imageWidth + this.startX ? this.imageWidth  + this.startX: event.clientX;
      var y = event.clientY > this.imageHeight  + this.startY ? this.imageHeight + this.startY: event.clientY;
      console.log(x, y);
      let xy = [x, y];
      this.rects.peek().a = xy[0];
      this.rects.peek().b =  xy[1];

      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'red';

      this.ctx.rect(
        this.rects.peek().x,
        this.rects.peek().y,
        Math.abs(this.rects.peek().x - this.rects.peek().a),
        Math.abs(this.rects.peek().y - this.rects.peek().b)
      )
      this.ctx.stroke();
    }

  }

  redrawImage(image){
    this.clearCanvas();
    var _parent = this;
    var reader = new FileReader();
    reader.onload = function(){
      var img = new Image();
      img.onload = function(){
        var wrh = img.width / img.height;
        var newWidth = _parent.canvasWidth;

        var newHeight = newWidth / wrh;
        if (newHeight > _parent.canvasHeight) {
            newHeight = _parent.canvasHeight;
            newWidth = newHeight * wrh;
        }

        _parent.startX = parseInt((_parent.canvasWidth - newWidth)/2, 10)
        _parent.startY = parseInt((_parent.canvasHeight - newHeight)/2, 10)

        _parent.imageWidth = newWidth;
        _parent.imageHeight = newHeight;

        _parent.ctx.drawImage(img, _parent.startX, _parent.startY, newWidth, newHeight);
        _parent.setState({loading: false});
      }
      img.src = reader.result;
    }
    reader.readAsDataURL(image);
  }

  componentWillReceiveProps(newProps){
    if(newProps.image != null){
      this.clearCanvas();
      this.setState({imagePresent: true, loading: true});
      this.redrawImage(newProps.image);
    }else{
      this.canvasWidth = newProps.width;
      this.canvasHeight = newProps.height;
      this.clearCanvas();
    }
  }

  componentDidUpdate(){

      this.canvasRect = this.refs.canvas.getBoundingClientRect();
      console.log(this.canvasRect);
  }

  render(){
    return(
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
            <Header.Subheader>
              Load a few images first.
            </Header.Subheader>
          </Header>
        </Dimmer>
            <canvas
              ref="canvas"
              onMouseDown={this.handleMouseDown}
              onMouseMove={this.handleMouseMove}
              onMouseUp={this.handleMouseUp}
              width={this.canvasWidth}
              height={this.canvasHeight}
            />
      </Dimmer.Dimmable>

    );
  }
}

export default CanvasAnnotator;
