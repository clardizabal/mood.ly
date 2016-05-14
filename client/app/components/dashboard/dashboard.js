import React, { PropTypes, Component } from 'react';
import Search from './search';
import services from '../../services/services';
import QuoteItem from './quoteItem';
import GifItem from './gifItem';
import Music from './music';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currQuote: '',
      currMood: '',
      currentGif: '',
      currentSearch: '',
      currVideoID: '',
      showQuoteItem: false,
      showGifItem: false,
      showMusicItem: false,
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  handleSearchButtonClick() {
    const self = this;
    const query = this.state.currentSearch;
    services.apiCall('wikiInfo', query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currMood: query,
        currQuote: res[randomIndex],
        showQuoteItem: true,
      });
    });
    services.apiCall('giphyInfo', query, (res) => {
      const randomIndex = Math.floor((Math.random() * res.length) + 1);
      self.setState({
        currentGif: res[randomIndex],
        showGifItem: true,
      });
    });
    services.apiCall('musicInfo', query, (res) => {
      if (res.status === 'SUCCESS') {
        self.setState({
          currVideoID: res.videoID,
          showMusicItem: true,
        });
      }
    });
  }

  handleSearchChange(event) {
    this.setState({
      currentSearch: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <Search
          handleSearchChange={this.handleSearchChange}
          handleSearchButtonClick={this.handleSearchButtonClick}
        />
        <Grid>
          <Row className="show-grid">
            {this.state.showQuoteItem ?
              <Col sm={6} md={4}>
                <QuoteItem
                  quote={this.state.currQuote}
                  mood={this.state.currMood}
                  user={this.props.user}
                /></Col> : null}
            {this.state.showGifItem ?
              <Col sm={6} md={4}>
                <GifItem
                  gif={this.state.currentGif}
                  mood={this.state.currMood}
                  user={this.props.user}
                /></Col> : null}
            {this.state.showMusicItem ?
              <Col sm={6} md={4}>
                <Music
                  videoId={this.state.currVideoID}
                  mood={this.state.currMood}
                  user={this.props.user}
                /></Col> : null}
          </Row>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  user: PropTypes.element,
  // quote: PropTypes.element.isRequired,
  // gif: PropTypes.element.isRequired,
};

/* <div className="moodly-content">
  <span className="quote-title"><h2>{this.state.currQuote}</h2></span>
</div>

<img src={this.state.currentGif} alt="" /> */

// Dashboard.propTypes = {
//   handleSearchChange: PropTypes.func.isRequired,
//   handleSearchButtonClick: PropTypes.func.isRequired,
// };

export default Dashboard;
