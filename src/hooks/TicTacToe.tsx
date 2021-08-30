import { useState, useEffect, useCallback } from "react";

export enum TIC_TAC_RESPONSE {
  X = "X",
  O = "O",
}

function useTicTacToe() {
  const newGameState = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const [gameState, setGameState]: [Array<Array<string | null>>, any] =
    useState([...newGameState]);

  // randomized
  const [player, setPlayer] = useState("X");

  const resetGame = () => setGameState([...newGameState]);

  const handleTileClick = useCallback(
    (coordinates: Array<number>) => {
      const updateStateWithPlay = (
        player: string,
        coordinates: Array<number>
      ) => {
        const newState = gameState.map((row) => row);
        newState[coordinates[0]][coordinates[1]] = player;
        setGameState([...newState]);
      };

      updateStateWithPlay(player, coordinates);
      player === TIC_TAC_RESPONSE.X
        ? setPlayer(TIC_TAC_RESPONSE.O)
        : setPlayer(TIC_TAC_RESPONSE.X);
    },
    [gameState, player]
  );

  return {
    resetGame,
    handleTileClick,
    player,
    setPlayer,
    gameState,
    setGameState,
  };
}

export default useTicTacToe;
