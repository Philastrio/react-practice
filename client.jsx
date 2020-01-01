import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import NumberBaseball from './NumberBaseBall/NumberBaseballClass';

const Hot = hot(module)(NumberBaseball);
ReactDOM.render(<Hot />, document.querySelector('#root'));
