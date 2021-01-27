import React, { Component } from 'react';

class BtnPress extends Component {
  clicked() {
    window.location.reload();
  }

  render() {
    return <div onClick={this.clicked}>Go back to the list</div>;
  }
}

export default BtnPress;
