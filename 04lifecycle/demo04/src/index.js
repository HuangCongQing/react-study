import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Life from './Life'
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render( 
// <div>
//     < App/> 
//     <Life/>
// </div>,
// document.getElementById('root'));
// registerServiceWorker();
ReactDOM.render(
    <div>
        < App />
        <Life/>
    </div>
    ,
    document.getElementById('root'));
registerServiceWorker();