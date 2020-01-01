import React, { Component } from 'react';
import Tries from './Tries';

function getNumbers() {
  // 숫자 네 개를 겹치지 않게 뽑는 함수
}

class NumberBaseball extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      value: '',
      answer: getNumbers(),
      tries: []
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onSubmitForm(e) {}
  onChangeInput(e) {}

  fruits = [
    {
      fruit: '귤',
      taste: '맛있다'
    },
    {
      fruit: '감',
      taste: '맛있다'
    },
    {
      fruit: '포도',
      taste: '맛있다'
    },
    {
      fruit: '사과',
      taste: '맛있다'
    }
  ];

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input
            maxLength={4}
            value={this.state.value}
            onChange={this.state.onChangeInput}
          />
        </form>
        <div>시도 : {this.state.tries.length}</div>
        <ul>
          {this.fruits.map((v, i) => (
            <Tries key={v.fruit + v.taste} value={v} index={i} />
          ))}
        </ul>
      </>
    );
  }
}

export default NumberBaseball;
