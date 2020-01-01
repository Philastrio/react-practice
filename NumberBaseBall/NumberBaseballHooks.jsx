import React, { useState, memo, useRef } from 'react';
import TriesHooks from './TriesHooks';

const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseball = memo(() => {
  const [result, setResult] = useState('');
  const [value, setValue] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputEl = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();
    if (value === answer.join('')) {
      setResult('홈런');
      setTries(prevState => [
        ...prevState,
        {
          try: value
        }
      ]);
      setResult('홈런!');
      alert('게임을 다시 시작합니다');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArray = value.split('').map(v => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')} 였습니다`);

        alert('게임을 다시 시작합니다');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries(prevState => [
          ...prevState,
          {
            try: value,
            result: `${strike} 스크라이크, ${ball} 볼입니다`
          }
        ]);
        setValue('');
      }
    }
  };
  const onChangeInput = e => {
    console.log(answer);
    setValue(e.target.value);
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          maxLength={4}
          value={value}
          onChange={onChangeInput}
        />
        <button>입력!</button>
      </form>
      <div>시도 : {tries.length}</div>
      <ul>
        {tries.map((v, i) => (
          <TriesHooks key={`${i + 1}차 시도`} triesInfo={v} />
        ))}
      </ul>
    </>
  );
});

export default NumberBaseball;
