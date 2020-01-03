import React, { useState, useRef, useEffect } from 'react';

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

const RPS = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rpsCoords.rock);
  const [score, setScore] = useState(0);
  const interval = useRef();
  const handInterval = () => {
    interval.current = setInterval(changeHand, 1000);
  };
  useEffect(() => {
    //componentDidMount, componentDidUpdate 역할을 한다.(1대1 대응은 안다)
    handInterval();
    console.log('실행');
    /* interval.current = setInterval(changeHand, 100);// componentDidMount에 적은 것을 적는다. */
    return () => {
      // componentWillUnmount 역할
      console.log('종료');
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const changeHand = () => {
    if (imgCoord === rpsCoords.rock) {
      setImgCoord(rpsCoords.scissors);
    } else if (imgCoord === rpsCoords.scissors) {
      setImgCoord(rpsCoords.paper);
    } else if (imgCoord === rpsCoords.paper) {
      setImgCoord(rpsCoords.rock);
    }
  };

  const onClickBtn = choice => () => {
    clearInterval(interval.current);
    const myScore = scores[choice]; // scores.rock 이면 1점 이런식으로 된다.
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('비겼습니다');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다');
      setScore(prevState => prevState + 1);
    } else {
      setResult('졌습니다');
      setScore(prevState => prevState - 1);
    }
    setTimeout(() => {
      handInterval();
    }, 2000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`
        }}
      ></div>
      <div>
        <button id="scissors" className="btn" onClick={onClickBtn('scissors')}>
          가위
        </button>
        <button id="rock" className="btn" onClick={onClickBtn('rock')}>
          바위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn('paper')}>
          보
        </button>
        <div>{result}</div>
        <div>현재 {score} 점</div>
      </div>
    </>
  );
};

export default RPS;
