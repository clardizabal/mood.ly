import React, { PropTypes, Component } from 'react';
import GifItem from './gifItem';

class Gif extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-data">
        {this.gifList.map((gif, i) => (
          <GifItem gif={gif} key={i} />
        ))}
      </div>
    );
  }
}

Gif.propTypes = {
  gif: PropTypes.object,
};

// EXPORT
export default Gif;