import React, { Component } from 'react';
import './App.css';
import {
        Container,
        Grid,
        Image,
        Segment,
        Button,
        List,
        Divider,
        Icon,
        Tab,
        Menu,
        Label
    } from 'semantic-ui-react';
const src="/assets/image.png";
const panes = [
    {
        menuItem: <Menu.Item key="images">
                    <Icon name="folder" />
                    Images
                    <Label>24</Label>
                </Menu.Item>,
        render: () =>
                    <Tab.Pane>
                        <div className="overflowy">
                            <Image.Group size='small'>
                              <Image src={src} />
                              <Image src={src} />
                              <Image src={src} />
                            </Image.Group>
                        </div>

                    </Tab.Pane>
    },
    {
        menuItem: <Menu.Item key="stats">
                    <Icon name="area graph" />
                    Distribution
                </Menu.Item>,
        render: () => <Tab.Pane>Tab 1</Tab.Pane>
    }

]

const AppContainer = () => (
    <div>
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column width={13}>
                    <center>
                    <Image height="500" src="/assets/image.png"  />
                    </center>
                </Grid.Column>
                <Grid.Column width={3}>

                    <Grid.Row>
                        <Button content="Save" icon="save" lablePosition="left" />
                        <Button content="Undo" icon="undo" lablePosition="left" />
                    </Grid.Row>
                    <Divider horizontal>Classes</Divider>
                    <Grid.Row>
                        <List>
                            <List.Item>
                                Orange <Icon name="trash" />
                            </List.Item>
                            <List.Item>
                                Apple <Icon name="trash" />
                            </List.Item>
                            <List.Item>
                                Banana <Icon name="trash" />
                            </List.Item>
                        </List>
                    </Grid.Row>
                </Grid.Column>
            </Grid.Row>

        </Grid>
        <Grid>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Tab panes={panes}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>

)

class App extends Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}
export default App;
