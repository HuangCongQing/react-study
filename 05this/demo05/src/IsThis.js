import React, { Component } from 'react';

class IsThis extends Component {
    constructor(props) {
        super(props)
        // this.onClickButton = this.onClickButton.bind(this);构造函数内绑定

        this.state = {
            count: 0,
            message: "Hello"
        }
        console.log(this)
        this.handleClick2 = (e) => {
            console.log(this.state.message)
        }

    }

    onClickButton() {
        this.setState({count: this.state.count + 1});
    }
    handleClick(name, e){  // name相当于传的一个参数
        console.log(this.state.message+name)
    }
    handleClick1 = (e) => {
        console.log(this.state.message)
    }

    

    render() {
        return (
          <div>
            <button onClick={this.onClickButton.bind(this)}>Click Me</button>
            <div>
              Click Count: {this.state.count}
            </div>
            <div>
                <button onClick={this.handleClick.bind(this, 'cq')} >SayHello</button>
            </div>
            <div>
                <button onClick={ ()=>{this.handleClick()} }>匿名函数Say Hello</button>
            </div>
            {/* 因为箭头函数总是匿名的，如果你打算移除监听事件，可以改用以下方式： */}
            <div>
                <button onClick={ this.handleClick1 }>因为箭头函数总是匿名的，如果你打算移除监听事件，可以改用以下方式：</button>
            </div>

             <div>
                <button onClick={ this.handleClick2 }>Say Hello</button>
            </div>

          </div>
        );
    };
}

export default IsThis;