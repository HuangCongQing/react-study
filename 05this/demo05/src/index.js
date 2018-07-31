import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import IsThis from './IsThis'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        <App />
        <IsThis/> 
    </div>
, document.getElementById('root'));
registerServiceWorker();
