import React, { Component } from 'react';

class Life extends Component {
    constructor(props,context) {
        super(props,context);// 在内部可以使用props和context
        this.state = {
            color: '#CCC'
          };
        console.log(this);
        console.log(this.props);
        console.log(this.state);
    }



    render() {
        return (
          <div>
            
            <div>
              Click Count: 
            </div>
          </div>
        );
    };
}

export default Life;