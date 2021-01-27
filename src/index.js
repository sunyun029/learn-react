import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  //向 class 中添加一个构造函数，用来初始化 state
  constructor(props) {
    //在 JavaScript class 中，每次你定义其子类的构造函数时，都需要调用 super 方法
    //因此，在所有含有构造函数的的 React 组件中，构造函数必须以 super(props) 开头
    super(props);
    this.state = {
      value : null,
    };
  }
  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.setState({value:'X'})}
      >
        {this.state.value}
      </button>
      //在 React 应用中，数据通过 props 的传递，从父组件流向子组件
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;  
     //一个 prop 从父组件 Board “传递”给了子组件 Square
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
