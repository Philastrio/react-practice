import React, { Component } from 'react';
import RenderAverage from './RenderAverage';

class ResponseCheck extends Component {
  state = {
    state: 'waiting',
    message: '클릭해서 시작하세요',
    result: []
  };

  timeout;
  startTime; // 이것도 변하기는 하지만 rendering하기 싫기에 이렇게 변수만 선언해준다.
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;
    if (state === 'waiting') {
      this.setState({
        state: 'ready',
        message: '초록색이 되면 클릭하세요'
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: 'now',
          message: '지금 클릭'
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === 'ready') {
      // 성급하게 클릭
      clearTimeout(this.timeout);
      this.setState({
        state: 'waiting',
        message: '너무 성급하시군요. 초록색이 된 후에 클릭하세요'
      });
    } else if (state === 'now') {
      this.endTime = new Date();
      this.setState(prevState => {
        return {
          state: 'waiting',
          message: '클릭해서 시작하세요!',
          result: [...prevState.result, this.endTime - this.startTime]
        };
      });
    }
  };

  onReset = () => {
    this.setState({
      result: []
    });
  };

  render() {
    const { message, state, result } = this.state;
    console.log(result);
    return (
      <>
        <div className={state} id="screen" onClick={this.onClickScreen}>
          {message}
        </div>
        <div>{<RenderAverage result={result} />}</div>
        <button onClick={this.onReset}>리셋</button>
      </>
    );
  }
}

export default ResponseCheck;
