import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import TicTacToe from './TicTac/TicTacToe';

const Hot = hot(module)(TicTacToe);
ReactDOM.render(<Hot />, document.querySelector('#root'));
