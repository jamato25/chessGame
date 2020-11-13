import {pieces, actions, tiles, pieceToSymbol} from './constants'

export const parseCommand = (str) =>{
  //returns string command as object with action, tile, and piece
  str = str.toLowerCase();
  let action = '';
  let piece = '';
  let enemyPiece = '';
  let tile = '';
  let currentTile = '';
  let words = str.split(' ');

  //set pieces
  for(let elem of words){
    if(pieces.includes(elem) && piece === ''){
      piece = elem;
    }
    else if(pieces.includes(elem) && piece !== ''){
      enemyPiece = piece;
      piece = elem
      break;
    }
  }

  //set action
  for(let elem of actions){
    if(str.includes(elem)){
      action=elem;
      break;
    }
  }

  //set tile
  for(let elem of words){
    if(tiles.includes(elem) && tile === ''){
      tile = elem;
    }
    else if(tiles.includes(elem) && tiles !== ''){
      currentTile = elem;
      break;
    }
  }
  return {action, piece, enemyPiece, tile, currentTile}

}

const convertMove = (piece, tile) => {
  let sanMove = '';
  sanMove+=(pieceToSymbol[piece]);
  sanMove+=tile;
  return sanMove
}

const convertCapture = (piece, enemyPiece, tile, currentTile) => {
  let sanMove = '';
  if(piece === 'pawn'){
    sanMove+=currentTile[0];
  }
  else{
    sanMove+=(pieceToSymbol[piece]);
  }
  sanMove+='x';
  sanMove+=tile;
  return sanMove;
}

export const convertToSAN = ({action,piece, enemyPiece, tile, currentTile}) =>{
  //converts object with action, tile, and piece to SAN notation
  let move = ''
  switch(action){
    case 'move':
      move = convertMove(piece, tile)
      break;
    case '':
      move = convertMove(piece, tile)
      break;
    case 'take':
      move = convertCapture(piece, enemyPiece, tile, currentTile)
  }
  return move;
}
