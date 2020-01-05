import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import Ball from './Ball';

const getWinNumbers = () => {
  console.log('getWinNumbers');
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
};

const Lotto = () => {
  const [winBalls, setWinBalls] = useState([]);
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeout = useRef([]);

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeout.current[i] = setTimeout(() => {
        setWinBalls(prevState => [...prevState, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeout.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeout.current.forEach(v => {
        clearTimeout(v);
      });
    };
  }, [timeout.current]); // 빈배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate를 둘 다 수행
  const onClickRedo = useCallback(() => {
    console.log('useCallback');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeout.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨숫자</div>
      <div id="result">
        {winBalls.map(v => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};

export default Lotto;
