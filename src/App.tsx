import React, { useState, useEffect } from "react";
import "./App.css";
import Tile from "./ui/Tile";
import styled from "styled-components";
import useTicTacToe from "./hooks/TicTacToe";

const BoardBorder = styled.div`
  padding: 3rem 5.6rem;
  box-shadow: 2px 2px 20px 0px rgb(136 136 136 / 40%);
  border-radius: 1rem;
  margin-bottom: 2rem;
`;

const BoardBackground = styled.div`
  display: flex;
  flex-flow: column;
  background: var(--primary-pink);
`;

const BoardRow = styled.div`
  display: flex;
  flex-flow: row;
  :nth-child(even) {
    margin: 0.6rem 0;
  }
`;

const PageLayout = styled.div`
  padding: 0 1rem;
  max-width: 40rem;
  margin: auto;
`;

const ButtonReset = styled.button`
  background-color: var(--secondary-pink);
  color: white;
  border-radius: 3rem;
  padding: 0.8rem 2rem;
  border: 0;
  margin-top: 2rem;
  font-size: 1.4rem;
  font-weight: 600;

  &:hover {
    background-color: var(--primary-pink);
  }
`;

function App() {
  const { resetGame, player, gameState, handleTileClick } = useTicTacToe();

  const board = gameState.map((row, i) => {
    const drawrow = row.map((tile, j) => (
      <Tile
        key={`row-${i}-tile-${j}`}
        player={player}
        value={tile}
        onClick={(coordinates: Array<number>) => handleTileClick(coordinates)}
        coordinates={[i, j]}
      ></Tile>
    ));
    return <BoardRow key={`row${i}`}>{drawrow.map((row) => row)}</BoardRow>;
  });

  return (
    <PageLayout>
      <div>
        <h1 className="page-heading">Pretty Tac Toe</h1>
      </div>
      <BoardBorder>
        <BoardBackground>{board}</BoardBackground>
        <div className="text-center">
          <ButtonReset onClick={() => resetGame()}>Reset</ButtonReset>
        </div>
      </BoardBorder>
    </PageLayout>
  );
}

export default App;
