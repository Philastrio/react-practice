import React, { PureComponent } from 'react';

class Tries extends PureComponent {
  render() {
    const { triesInfo } = this.props;
    return (
      <>
        <li>{triesInfo.tries}</li>
        <li>{triesInfo.result}</li>
      </>
    );
  }
}

export default Tries;
