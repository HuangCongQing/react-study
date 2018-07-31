import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Life from './Life'
import registerServiceWorker from './registerServiceWorker';

constructor(props,context) {
    super(props,context);// 在内部可以使用props和context
    this.state = {
        color: '#CCC'
      };
    console.log(this);
    console.log(this.props);
    console.log(this.state);
}
ReactDOM.render(
    <div>
        < App />
    </div>
    ,
    document.getElementById('root'));
registerServiceWorker();