import React, { Component } from 'react';
import {
        Image,
        Icon,
        Tab,
        Menu,
        Label
      } from 'semantic-ui-react';

import './TabComponent.css'

class TabComponent extends Component{

  constructor(props){
    super(props);
    this.state = {
      images: this.props.images,
      selectedImage: null
    };
    this.renderImages = this.renderImages.bind(this);
    this.updateCurrentImage = this.updateCurrentImage.bind(this);
  }

  updateCurrentImage(event){
    this.setState({selectedImage: parseInt(event.target.getAttribute("id"))});
    this.props.callbackParent(parseInt(event.target.getAttribute("id")));
  }

  componentWillReceiveProps(newProps){
    this.setState({images: newProps.images});
  }

  renderImages(){
    var idx = -1;
    var Images = this.state.images.map((image) => {
        let url = URL.createObjectURL(image);
        idx+=1;
        return(
          <Image
            key={idx}
            className={this.state.selectedImage == idx ?'bordered':''}
            src={url}
            onClick={this.updateCurrentImage}
            id={idx}
          />
        )
    });
    return(

          <Tab.Pane>
              <div className="overflowy">
                  <Image.Group size='tiny'>
                    {Images}
                  </Image.Group>
              </div>
          </Tab.Pane>
    );
  }

  render(){
    const panes = [
        {
            menuItem:
                    <Menu.Item key="images">
                        <Icon name="image" />
                        <Label>{this.state.images.length}</Label>
                    </Menu.Item>,
            render:
                  this.renderImages

        },
        {
            menuItem: <Menu.Item key="stats">
                        <Icon name="area graph" />

                    </Menu.Item>,
            render: () => <Tab.Pane>Distribution</Tab.Pane>
        }

    ]

    return(
      <div>
        <Tab panes={panes}>

        </Tab>
      </div>
    );
  }
}


export default TabComponent;
