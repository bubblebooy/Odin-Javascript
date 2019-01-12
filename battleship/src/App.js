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

const Position = () => {
  return {ship : null, position : null, shot : false}
}

const Gameboard = (rows = 10, columns = 10) => {
  const board = new Array(rows).fill(0).map(() => new Array(columns).fill(0).map(Position))
  const ships = [];
  const placeShip = (ship, row, column, rotation = true) => {
    if (rotation){
      if (board.length < row + ship.getLength()) { throw new Error("Ship is to large to be placed there") }
      for (let i = 0; i < ship.getLength(); i++){
        if (board[row + i][column].ship != null) { throw new Error("Ships can not overlap")}
      }
      for (let i = 0; i < ship.getLength(); i++){
        board[row + i][column].ship = ship;
        board[row + i][column].position = i;
      }
      ships.push(ship)
    } else {
      if (board[row].length < column + ship.getLength()) { throw new Error("Ship is to large to be placed there") }
      for (let i = 0; i < ship.getLength(); i++){
        if (board[row][column + i].ship != null) { throw new Error("Ships can not overlap")}
      }
      for (let i = 0; i < ship.getLength(); i++){
        board[row][column + i].ship = ship;
        board[row][column + i].position = i;
      }
      ships.push(ship)
    }
  }
  const receiveAttack = (row, column) => {
    if (board[row][column].shot) { throw new Error("can not shoot the same cords 2x")}
    board[row][column].shot = true
    if (board[row][column].ship != null) {
      board[row][column].ship.hit(board[row][column].position)
      return true
    }
    return false
  }
  const allSunk = () => ships.every((ship) => ship.isSunk())
  return {placeShip, receiveAttack, allSunk}
}

export default App;
export {Ship , Gameboard};
