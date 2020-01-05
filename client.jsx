import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import Ball from './Lotto/LottoHooks';

const Hot = hot(module)(Ball);
ReactDOM.render(<Hot />, document.querySelector('#root'));
