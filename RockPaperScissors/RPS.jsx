import React, { Component } from 'react';

const rpsCoords = {
  rock: '0',
  scissors: '-142px',
  paper: '-284px'
};

const scores = {
  scissors: 1,
  rock: 0,
  paper: -1
};

const computerChoice = imgCoord => {
  return Object.entries(rpsCoords).find(function(v) {
    return v[1] === imgCoord;
  })[0];
};

class RPS extends Component {
  state = {
    result: '',
    imgCoord: rpsCoords.rock,
    score: 0
  };
  interval;

  componentDidMount() {
    this.interval = setInterval(this.changeHand, 1000);
  }

  componentDidUpdate() {} // 리렌더링 후, 여기도 비동기 요청이다.

  /* componentWillUnmount() {
    // 컴포넌트가 제거되기 직전, 부모가 나를 없앴을때, 비동기 요청 정리를 많이 한다.
    clearInterval(this.interval);
  } */

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeHand = () => {
    const { imgCoord } = this.state;
    console.log('hi', imgCoord);
    if (imgCoord === rpsCoords.rock) {
      this.setState({
        imgCoord: rpsCoords.scissors
      });
    } else if (imgCoord === rpsCoords.scissors) {
      this.setState({
        imgCoord: rpsCoords.paper
      });
    } else if (imgCoord === rpsCoords.paper) {
      this.setState({
        imgCoord: rpsCoords.rock
      });
    }
  };

  onClickBtn = choice => () => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice]; // scores.rock 이면 1점 이런식으로 된다.
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      this.setState({
        result: '비겼습니다'
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState(prevState => {
        return {
          result: '이겼습니다',
          score: prevState.score + 1
        };
      });
    } else {
      this.setState(prevState => {
        return {
          result: '졌습니다',
          score: prevState.score - 1
        };
      });
    }
    setTimeout(() => {
      this.interval = setInterval(this.changeHand, 100);
    }, 2000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <div
          id="computer"
          style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`
          }}
        ></div>
        <div>
          <button
            id="scissors"
            className="btn"
            onClick={this.onClickBtn('scissors')}
          >
            가위
          </button>
          <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>
            바위
          </button>
          <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>
            보
          </button>
          <div>{result}</div>
          <div>현재 {score} 점</div>
        </div>
      </>
    );
  }
}

export default RPS;
