import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      posts:[],
      comments:[]
    };
  }
//生命周期方法
  componentDidMount() {
    this.timerID = setInterval( 
      ()=> this.tick(),
      1000
    );
    // fetchPosts().then(response => {
    //   this.setState({ 
    //     posts: response.posts
    //   });
    // });

    // fetchComments().then(response => {
    //   this.setState({
    //     comments: response.comments
    //   });
    // });
    //这里的合并是浅合并，所以 this.setState({comments}) 完整保留了 this.state.posts 
    //但是完全替换了 this.state.comments
  }

  componentWillUnmount() {
   clearInterval(this.timerID);
  }
  tick(){
    this.setState({
      date: new Date()  
    },
    )
  }
  render() {
    return (
      <div>
        <p>Hello, world!</p>
        <p>It is {this.state.date.toLocaleTimeString()}.</p>
      </div>
    );
  }
}
//浅比较
class CounterButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {count: 1};
  }

  render() {
    return (
      <button
        color={this.props.color}
        onClick={() => this.setState(state => ({count: state.count + 1}))}>
        Count: {this.state.count}
      </button>
    );
  }
}
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
      xIsNext: true,
    }
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
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
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner:" + winner;
    } else {
      status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
    }

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

const user = {
  firstName:'Happer',
  lastName:'Peraz',
  avatarUrl:"http://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"
};
// const element = (
//   getGreeting(user)
// );
function formatName(user){
  return user.firstName+' '+user.lastName;
}
function getGreeting(user){
  if(user){
    return<h1> hello,{formatName(user)}!</h1>
  }
  return <h1>hello,stranger.</h1>
}
//事件处理
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
// const element = (
//   <div> 
//     <img src={user.avatarUrl} />
//     <h1>Hello!</h1>
//     <h2>Good to see you here.</h2>
// </div>
// );
// function tick() {
//   const element = (
//     <div>
//       <h1>Hello, world!</h1>
//       <h2>It is {new Date().toLocaleTimeString()}.</h2>
//     </div>
//   );
//   ReactDOM.render(element, document.getElementById('root'));
// }

// setInterval(tick, 1000);

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
function formatDate(date) {
  return date.toLocaleDateString();
}
//组件构建过程↓
function Avatar(props) {
  return (
    <img className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">
        {props.user.name}
      </div>
    </div>
  );
}

function Comment(props){
  var myStyle = {
    fontSize: 30,
    color: '#61DAFB'
  };
  return(
    <div className="Comment">
      <h2 style={myStyle}>learn-react</h2>
      <ActionLink/>
      <Clock/>
      <CounterButton/>
      <UserInfo user= {props.author}/>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
      <Clock/>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'https://placekitten.com/g/64/64',
  },
};
ReactDOM.render(
  // <Clock />,
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author}
  />,
  document.getElementById('root')
);
// These two containers are siblings in the DOM
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM. 
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

ReactDOM.render(<Parent />, appRoot);

// const element = <Welcome name="Sara" />;
// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );
// ========================================
// ReactDOM.render(
//   element,
//   document.getElementById('root')
// );
// ReactDOM.render(
//   element,
//   <Game />,
//   document.getElementById('root')
// );


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

