import React, {Component} from 'react'
import Chessboard from "chessboardjsx"
import Chess from "chess.js"
import Speech from "./Speech"
import socket from "../sockets"

class App extends Component {
  constructor(){
    super()
    this.state = {
      newGame: 'true',
      fen: "start",
      nextMove: "",
      turn: 'w',
      boardOrientation: 'white'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getVoiceCommand = this.getVoiceCommand.bind(this);
  }

  componentDidMount(){
    if(this.state.newGame === 'true'){
      this.game = new Chess()
      this.state.newGame = 'false';
    }
    socket.on("move", data => {
        this.move(data)
    });
    socket.on("player2", data => {
      this.setState(data)
  });
  }

  move(move){
    if(this.game.move(move)){
      this.setState({fen: this.game.fen(), turn: this.game.turn()})
      socket.emit("move", move)
    }
    else{
      console.log('invalid move')
    }
  }

  getVoiceCommand(command){
    this.move(command);
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleSubmit(ev){
    ev.preventDefault()
    this.move(this.state.nextMove)
    this.setState({
      nextMove: '',
    })
  }

  render() {
    const {fen, nextMove, turn, boardOrientation} = this.state;
    const {handleSubmit, handleChange} = this
    let check = '';
    let move = '';
    if(this.game){
      if(this.game.in_check()){check = "You are in Check!"}
    }

    if(turn === 'w'){move = 'white'}
    if(turn === 'b'){move = 'black'}
    return (
      <div>
        <h3>It is {move}'s turn</h3>
        <div>Moving a piece: 'Move pawn to E4'</div>
        <div>Taking a piece: 'Take bishop on E4 with Queen on C5'</div>
        <h2 id = 'check'>{check}</h2>
        <div id = "boardContainer">
          <Chessboard position = {fen} id = "board" orientation = {boardOrientation}/>
        </div>
        <Speech getVoiceCommand = {this.getVoiceCommand}/>
        <form onSubmit = {handleSubmit}>
          <label htmlFor = "nextMove" >Next Move:</label>
              <input name = "nextMove" value = {nextMove} onChange = {handleChange} required />
          <button >Move</button>
        </form>

      </div>
    )
  }
}

export default App
