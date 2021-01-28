import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//直接将所有的 state 状态数据存储在 Board 父组件当中。之后 Board 组件可以将这些数据通过 props 传递给各个 Square 子组件
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
    return (//从 Board 组件向 Square 组件中传递两个 props 参数：value 和 onClick
      <button 
        className="square" 
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
      //在 React 应用中，数据通过 props 的传递，从父组件流向子组件
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
    }
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = "X";
    this.setState({squares: squares});
  }
  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
      />
    )
     //一个 prop 从父组件 Board “传递”给了子组件 Square
     //为了提高可读性，我们把返回的 React 元素拆分成了多行，同时在最外层加了小括号
     //这样 JavaScript 解析的时候就不会在 return 的后面自动插入一个分号从而破坏代码结构了
     
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
