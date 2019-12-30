const React = require('react');
const { Component } = React;
const { hot } = require('react-hot-loader/root');

class WordRelay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: '한강',
      value: '',
      result: ''
    };
  }
  onSubmitForm = e => {
    e.preventDefault();
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState({
        result: '딩동댕',
        word: this.state.value,
        value: ''
      });
      this.input.focus();
    } else {
      this.setState({
        result: '땡'
      });
      this.input.focus();
    }
  };
  input;
  onRefInput = c => {
    this.input = c;
  };
  onChangeInput = e => {
    this.setState({
      value: e.target.value
    });
  };
  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form onSubmit={this.onSubmitForm}>
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChangeInput}
          />
          <button>우와 짱이다!!</button>
          <div>우와 자동으로 바뀌어요ddddddddddddd</div>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = hot(WordRelay);
