import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';

const Practice = require('./NumberBaseball');

const Hot = hot(Practice);

ReactDOM.render(<Hot />, document.getElementById('root'));
