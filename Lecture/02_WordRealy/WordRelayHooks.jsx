const React = require('react');
const { useState, useRef } = React;
const { hot } = require('react-hot-loader/root');

const WordRelay = () => {
  const [word, setWord] = useState('한강');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const onRefInput = useRef(null);

  const onSubmitForm = e => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕!');
      setWord(() => {
        return '딩동댕 :' + value;
      });
      setValue('');
      onRefInput.current.focus();
    } else {
      setResult('땡!');
      setValue('');
      onRefInput.current.focus();
    }
  };

  const onChangeInput = e => {
    setValue(e.currentTarget.value);
  };

  /* hooks를 쓰면 this를 더이상 안쓴다 */

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="wordInput">글자를 입력하세요</label>
        <input
          id="wordInput"
          className="wordInput"
          ref={onRefInput}
          value={value}
          onChange={onChangeInput}
        />
        <button>우와 짱이다!!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = hot(WordRelay);
