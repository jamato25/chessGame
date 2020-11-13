import React from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import {parseCommand, convertToSAN} from '../alignCommandToMove'

const Speech = ({getVoiceCommand}) => {
  const { transcript, finalTranscript, resetTranscript } = useSpeechRecognition()
  const pieces = ['rook', 'knight', 'pawn', 'bishop', 'king', 'queen']
  const pieceGrammar = '#JSGF V1.0; grammar pieces; public <pieces> = ' + pieces.join(' | ') + ';';
  const speechRecognitionList = new webkitSpeechGrammarList();
  speechRecognitionList.addFromString(pieceGrammar, 1);
  SpeechRecognition.getRecognition().grammars = speechRecognitionList;
  SpeechRecognition.getRecognition().continuous = true;
  SpeechRecognition.getRecognition().lang = 'en-US';
  let commandExecuted = false;

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  const handleSubmit = () =>{
    const command = parseCommand(transcript);
    SpeechRecognition.stopListening()
    const nextMove = convertToSAN(command);
    getVoiceCommand(nextMove)
    resetTranscript()
  }

  const clear = () =>{
    SpeechRecognition.stopListening()
    resetTranscript()
  }

  return (
    <div>
      <button onClick={SpeechRecognition.startListening }>Start</button>
      <button onClick={handleSubmit}>Submit Move</button>
      <button onClick={clear}>Clear</button>
      <div>{transcript}</div>
    </div>
  )
}


export default Speech
