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
            onClick={() => this.props.onClick(i)}
            />
        );
    }

    

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

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
    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares); //why not calculateWinner(current)?
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
                        onClick={(i) => }
                    />
                </div>
                <div className="game-info">
                    <div>
                        {/* status */
                        }
                    </div>
                    <ol>
                        {/* TODO */
                        }
                    </ol>
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