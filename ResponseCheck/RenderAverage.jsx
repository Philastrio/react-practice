import React, { PureComponent } from 'react';

class RenderAverage extends PureComponent {
  render() {
    const { result } = this.props;
    return result.length === 0 ? null : (
      <>
        <div>평균시간: {result.reduce((a, c) => a + c) / result.length} ms</div>
      </>
    );
  }
}

export default RenderAverage;
