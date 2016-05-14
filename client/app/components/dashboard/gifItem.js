import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import controller from '../../services/controllers';
import ImageCamera from 'material-ui/svg-icons/image/camera-alt';
import IconButton from 'material-ui/IconButton';
import Favorite from 'material-ui/svg-icons/action/favorite';

class GifItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleLikeButton = this.handleLikeButton.bind(this);
  }

  handleLikeButton() {
    const username = this.props.user;
    const giphy = {
      url: this.props.gif,
      mood: this.props.mood,
    };

    controller.likeGiphy(giphy, username, (data) => {
      console.log('GIF, ', data);
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Card
          style={{
            height: 350,
            width: 300,
          }}
        >
          <CardHeader
            style={{
              height: 75,
            }}
          >
            <IconButton
              style={{
                float: 'left',
              }}
            ><ImageCamera /></IconButton>
            <IconButton
              style={{
                float: 'right',
              }}
              onClick={this.handleLikeButton}
            >
              <Favorite />
            </IconButton>
          </CardHeader>
          <CardMedia>
            <img src={this.props.gif} alt="" height="200px" />
          </CardMedia>
        </Card>
      </MuiThemeProvider>
    );
  }
}

GifItem.propTypes = {
  gif: React.PropTypes.element,
  mood: React.PropTypes.element,
  user: React.PropTypes.element,
};

export default GifItem;
