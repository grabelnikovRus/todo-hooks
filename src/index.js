import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import './index.css';

const Todo = () => {
  return <App />;
};

ReactDOM.render(<Todo />, document.getElementById('root'));
