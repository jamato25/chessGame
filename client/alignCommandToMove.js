import {pieces, actions, tiles, pieceToSymbol} from './constants'

export const parseCommand = (str) =>{
  //returns string command as object with action, tile, and piece
  str = str.toLowerCase();
  let action = '';
  let piece = '';
  let tile = '';
  for(let elem of pieces){
    if(str.includes(elem)){
      piece=elem;
      break;
    }
  }
  for(let elem of actions){
    if(str.includes(elem)){
      action=elem;
      break;
    }
  }
  for(let elem of tiles){
    if(str.includes(elem)){
      tile=elem;
      break;
    }
  }
  return {action:action, piece:piece, tile:tile}
}

export const convertToSAN = ({action,piece,tile}) =>{
  //converts object with action, tile, and piece to SAN notation
  let sanMove = '';
  switch(action){
    case 'move' || '':
      sanMove+=(pieceToSymbol[piece]);
      sanMove+=tile;
      break;
  }
  return sanMove;
}
