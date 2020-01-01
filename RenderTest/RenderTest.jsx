import React, { PureComponent } from 'react';

class TestRender extends PureComponent {
  state = {
    counter: 0,
    string: 'hello',
    nmber: 1,
    boolean: true,
    object: { a: 'b', c: 'd' },
    array: [{ inside: [3] }] // 이런 구조 좋지 않다. 매번 렌더링이 된다.
  };

  onClick = () => {
    const { array } = this.state;
    array.push(5);
    this.setState({
      array: [...array, 1]
    });
  };

  render() {
    console.log('렌더링', this.state);
    return (
      <div>
        <button onClick={this.onClick}>클릭</button>
      </div>
    );
  }
}

export default TestRender;
