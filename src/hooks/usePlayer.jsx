import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino} from '../tetrominos';
import { STAGE_WIDTH, checkCollision} from '../gameHelpers';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: {x: 0, y: 0},
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

  const rotate = (matrix, dir) => {
    //Make the rows to becom cols(transpose)
    const rotatedTetro = matrix.map((_, index) => matrix.map(col => col[index]),
    );
    //Reverse each row to get a rotated matrix
    if(dir > 0) return rotatedTetro.map(row => row.reverse());
    return rotatedTetro.reverse();
  }

  const playerRotate = (stage, dir) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonnedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while(checkCollision(clonedPlayer, stage, {x: 0, y:0})){
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length){
        rotate(clonnedPlayer.tetromino, idir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }

    setPlayer(clonePlayer);

  }

  const updatePlayerPos = ({x, y, collid}) => {
    setPlayer(prev => ({
      ...prev,
      pos:{x:(prev.pos.x += x), y: (prev.pos.y +=y)}, collided,
    }))
  }

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos:{x: STAGE_WIDTH / 2-2, y:0},
      tetromino: randomTetromino().shape,
      collided: false,
    })
  }, [])
  //infinity loop otherwise

  //const playerState = useState();
  //const player = playerState[0]
  //const setPlayer = playerState[1]
  return[player, updatePlayerPos, resetPlayer, playerRotate];
}

//1:05:00