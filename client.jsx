import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';
import MineSearch from './MineSearch/MineSearch';

const Hot = hot(module)(MineSearch);
ReactDOM.render(<Hot />, document.querySelector('#root'));
