import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import ResponseCheck from './ResponseCheck/ResponseCheckHooks';

const Hot = hot(module)(ResponseCheck);
ReactDOM.render(<Hot />, document.querySelector('#root'));
