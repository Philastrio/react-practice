import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import RSP from './RockPaperScissors/RPSHooks';

const Hot = hot(module)(RSP);
ReactDOM.render(<Hot />, document.querySelector('#root'));
