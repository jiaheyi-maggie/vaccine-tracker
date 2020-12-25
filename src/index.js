import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     // constructor(props) {
//     //     super(props); //always needed
//     //     this.state = {
//     //         value: null,
//     //     };
//     // }
//     render() {
//         //pass in data, arrow function
//         return (
//             <button className="square" onClick={ () => this.props.onClick() } >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

function Square(props) {
    return (
        <button className={"square"} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    //maintains which squares are filled/empty
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true, // default: X is first, initially value is null and will change to X the first turn
        };
    }

    //read values in the squares array
    renderSquare(i) {
        return (
            <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
            />
        );
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const status = 'Next player: X';

        return React.createElement( 'div', null,
            //children
            React.createElement('div', {className: 'status'}, status),
            React.createElement('div', {className: 'board-row'}, this.renderSquare(0), this.renderSquare(1), this.renderSquare(2)),
            React.createElement('div', {className: 'board-row'}, this.renderSquare(3), this.renderSquare(4), this.renderSquare(5)),
            React.createElement('div', {className: 'board-row'}, this.renderSquare(6), this.renderSquare(7), this.renderSquare(8))
        );
        // JSX equivalent
        // return (
        //     <div>
        //         <div className="status">{status}</div>
        //         <div className="board-row">
        //             {this.renderSquare(0)}
        //             {this.renderSquare(1)}
        //             {this.renderSquare(2)}
        //         </div>
        //         <div className="board-row">
        //             {this.renderSquare(3)}
        //             {this.renderSquare(4)}
        //             {this.renderSquare(5)}
        //         </div>
        //         <div className="board-row">
        //             {this.renderSquare(6)}
        //             {this.renderSquare(7)}
        //             {this.renderSquare(8)}
        //         </div>
        //     </div>
        // );
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
                    <div> {/* status */} </div>
                    <ol> {/* TODO */}</ol>
                </div>
            </div>
        );
    }
}


// =========================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);