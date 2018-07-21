import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ClickCounter from './ClickCounter';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        < App />
        < ClickCounter />
        
    </div>
    ,
    document.getElementById('root'));
registerServiceWorker();
