import React, { Component } from 'react';
import './App.css';

class App extends Component {
  componentDidMount(){
    document.title = "Battleship"
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="TheOdinProject-link"
            href="https://www.theodinproject.com/courses/javascript/lessons/battleship?ref=lnav"
            target="_blank"
            rel="noopener noreferrer"
          >
            PROJECT: BATTLESHIP
          </a>
        </header>
        <Gameboard rows = {10} columns = {10}/>
      </div>
    );
  }
}

const Ship = (name, length) => {
  const hits = new Array(length).fill(false)
  const getName = () => name;
  const getLength = () => length;
  const hit = (position) => {
    if (position >= length || position < 0) {throw new Error("not a Vaild position")}
    else {hits[position] = true}
  }
  const isSunk = () => hits.every((position) => position);
  return {getName, getLength, hit, isSunk}
}

// const Position = () => {
//   return {ship : null, position : null, shot : false}
// }

class Position extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render () {
    return (
      <button
        className = {`${this.props.ship ? "ship " : ""}${this.props.shot ? "shot" : ""}`}
        onClick = {this.props.onClick}>
        {this.props.shot ? "X" : "~"}
      </button>
    );
  }
}

class Gameboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board : new Array(props.rows || 10).fill(null).map(() =>
        new Array(props.columns || 10).fill(null).map(() =>
          {return {ship : null, position : null, shot : false}})),
      availableShips : [Ship("Carrier",5),Ship("Battleship",4),Ship("Cruiser",3),Ship("Submarine",3),Ship("Destroyer",2)]
    }
    this.ships = []
    this.selectedShip = null
    this.rotate = false;
  }

  placeShip(ship, row, column, rotation = true) {
    if (rotation){
      if (this.state.board.length < row + ship.getLength()) { throw new Error("Ship is to large to be placed there") }
      for (let i = 0; i < ship.getLength(); i++){
        if (this.state.board[row + i][column].ship != null) { throw new Error("Ships can not overlap")}
      }
      let board = this.state.board.slice();
      for (let i = 0; i < ship.getLength(); i++){
        board[row + i][column].ship = ship;
        board[row + i][column].position = i;
      }
      this.setState({board : board})
      this.ships.push(ship)
    } else {
      if (this.state.board[row].length < column + ship.getLength()) { throw new Error("Ship is to large to be placed there") }
      for (let i = 0; i < ship.getLength(); i++){
        if (this.state.board[row][column + i].ship != null) { throw new Error("Ships can not overlap")}
      }
      let board = this.state.board.slice();
      for (let i = 0; i < ship.getLength(); i++){
        board[row][column + i].ship = ship;
        board[row][column + i].position = i;
      }
      this.setState({board : board})
      this.ships.push(ship)
    }
  }

  receiveAttack(row, column) {
    if (this.state.board[row][column].shot) { throw new Error("can not shoot the same cords 2x")}
    let board = this.state.board.slice();
    board[row][column].shot = true;
    this.setState({board : board})
    if (this.state.board[row][column].ship != null) {
      this.state.board[row][column].ship.hit(this.state.board[row][column].position)
      return true
    }
    return false
  }

  allSunk() {return this.ships.every((ship) => ship.isSunk())}

  handleClick(row,column) {
    try{
      if (this.selectedShip != null){
        this.placeShip(this.state.availableShips[this.selectedShip],row,column,this.rotate)
        let availableShips = this.state.availableShips.slice();
        availableShips.splice(this.selectedShip,1)
        this.setState({availableShips : availableShips})
        this.selectedShip = null
      } else {
        this.receiveAttack(row,column)
      }
    } catch(err){
      alert(err.message)
    }
  }

  render() {
    return (
      <div>
        <div className = "board">
          <div className = "numberRow"> {this.state.board[0].map((_,i)=> <span key = {i} className = "column">{i}</span>)} </div>
          {this.state.board.map((row,i) =>
              <div key = {i} className = "row"> {i}: {row.map((pos,j) =>
                <Position key = {j}
                  ship = {pos.ship}
                  position = {pos.position}
                  shot = {pos.shot}
                  onClick={() => this.handleClick(i,j)}/> ) }
              </div>)}
        </div>
        <ul className = "availableShips">
          {this.state.availableShips.map((ship , i) =>
          <li key = {i}>
            <button onClick={() => this.selectedShip = i}>
              {`${ship.getName()} : Size ${ship.getLength()}`}
            </button>
          </li>)}
          <li>
            <label htmlFor = "rotate"> Rotate </label>
            <input type = "checkbox" id = "rotate" onClick={() => {
              this.rotate = !this.rotate
            }}/>
          </li>
        </ul>
      </div>

    );
  }
  //return {placeShip, receiveAttack, allSunk}
}

export default App;
export {Ship , Gameboard};
