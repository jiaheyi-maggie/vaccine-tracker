import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className={"square"} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component { //represent board at an instance
    //read values in the squares array
    renderSquare(i) {
        return (
            <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)} // run input through Game (to keep track of data)
            />
        );
    }

    // handleClick(i) {
    //     const squares = this.state.squares.slice();
    //     squares[i] = this.state.xIsNext ? 'X' : 'O';
    //     this.setState({
    //         squares: squares,
    //         xIsNext: !this.state.xIsNext,
    //     });
    // }



    render() {
        return React.createElement( 'div', null,
            React.createElement('div', {className: 'board-row'}, this.renderSquare(0), this.renderSquare(1), this.renderSquare(2)),
            React.createElement('div', {className: 'board-row'}, this.renderSquare(3), this.renderSquare(4), this.renderSquare(5)),
            React.createElement('div', {className: 'board-row'}, this.renderSquare(6), this.renderSquare(7), this.renderSquare(8))
        );

        // return (
        //     <div>
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
    constructor(props) {
        super(props);
        this.state = {
            history:
                [
                {squares: Array(9). fill(null)}
                ],
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = this.state.squares.slice();
        if (calculateWinner(current.squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{squares: squares,}]),
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    // function jumpTo(step) {
    //
    // }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);

        const moves = history.map( (step, move) =>
            {
                const desc = move ? 'Go to move #' + move : 'Go to game start';
                return (<li> <button onClick={() => this.jumpTo(move)}>{desc}</button></li>);
            });
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

/* Determine the winner */
function calculateWinner(squares) {
    const winningLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 3, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i]; // a, b, c corresponds to the first, second, and third entry
        if ( squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) { //squares[a] is not null -> it is occupied, and check if the positions are the same value
            return squares[a]; //squares[a]'s value: either 'X' or 'O'
        }
    }
    return null;
}


// =========================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);