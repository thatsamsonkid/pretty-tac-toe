import { useState, useCallback } from "react";
import { TILE_STATES } from "../models/TicTacToe";

function useTicTacToe() {
  const newGameState = [
    [TILE_STATES.EMPTY, TILE_STATES.EMPTY, TILE_STATES.EMPTY],
    [TILE_STATES.EMPTY, TILE_STATES.EMPTY, TILE_STATES.EMPTY],
    [TILE_STATES.EMPTY, TILE_STATES.EMPTY, TILE_STATES.EMPTY],
  ];

  const [gameState, setGameState]: [Array<Array<TILE_STATES>>, any] = useState([
    ...newGameState,
  ]);

  // randomized
  const [player, setPlayer] = useState(TILE_STATES.X);
  const [winner, setWinner]: [TILE_STATES | null, any] = useState(null);
  const [staleMate, setStaleMate]: [boolean, any] = useState(false);
  const [playCount, setPlayCount]: [number, any] = useState(0);

  const resetGame = () => {
    setWinner(null);
    setGameState([...newGameState]);
    setStaleMate(null);
    setPlayCount(0);
  };

  const handleTileClick = useCallback(
    (coordinates: Array<number>) => {
      setPlayCount(playCount + 1);
      const updateStateWithPlay = (
        player: TILE_STATES,
        coordinates: Array<number>
      ) => {
        const newState = gameState.map((row) => row);
        newState[coordinates[0]][coordinates[1]] = player;
        setGameState([...newState]);
      };

      const checkForWin = (
        gameState: Array<Array<TILE_STATES>>,
        coordinates: Array<number>
      ) => {
        const [x, y] = coordinates;

        let yAccum = 0;
        let xAccum = 0;
        gameState[x].forEach((tileState) => {
          if (tileState !== TILE_STATES.EMPTY) {
            const currValue = tileState === TILE_STATES.X ? 1 : -1;
            xAccum = xAccum + currValue;
          }
        });

        for (let i = 0; i < gameState[x].length; i++) {
          if (gameState[i][y] !== TILE_STATES.EMPTY) {
            const currValue = gameState[i][y] === TILE_STATES.X ? 1 : -1;
            yAccum = yAccum + currValue;
          }
        }

        const boardDiagonalSize = 3;
        let diagAccum = 0;
        for (let i = 0; i < boardDiagonalSize; i++) {
          if (gameState[i][i] !== TILE_STATES.EMPTY) {
            const currValue = gameState[i][i] === TILE_STATES.X ? 1 : -1;
            diagAccum = diagAccum + currValue;
          }
        }

        let oppDiagAccum = 0;
        let j = boardDiagonalSize;
        for (let i = 0; i < boardDiagonalSize; i++) {
          j--;
          if (gameState[i][j] !== TILE_STATES.EMPTY) {
            const currValue = gameState[i][j] === TILE_STATES.X ? 1 : -1;
            oppDiagAccum = oppDiagAccum + currValue;
          }
        }

        // TODO: Save history in Session
        // TODO: Create clickable history

        if (
          xAccum === 3 ||
          yAccum === 3 ||
          xAccum === -3 ||
          yAccum === -3 ||
          diagAccum === 3 ||
          diagAccum === -3 ||
          oppDiagAccum === 3 ||
          oppDiagAccum === -3
        ) {
          if (
            xAccum === 3 ||
            yAccum === 3 ||
            diagAccum === 3 ||
            oppDiagAccum === 3
          ) {
            setWinner(TILE_STATES.X);
          }

          if (
            xAccum === -3 ||
            yAccum === -3 ||
            diagAccum === -3 ||
            oppDiagAccum === -3
          ) {
            setWinner(TILE_STATES.O);
          }
        } else {
          playCount === 8 && setStaleMate(true);
        }
      };

      updateStateWithPlay(player, coordinates);

      //check for win
      checkForWin(gameState, coordinates);

      player === TILE_STATES.X
        ? setPlayer(TILE_STATES.O)
        : setPlayer(TILE_STATES.X);
    },
    [gameState, player, playCount]
  );

  return {
    resetGame,
    handleTileClick,
    player,
    setPlayer,
    gameState,
    setGameState,
    winner,
    staleMate,
  };
}

export default useTicTacToe;
