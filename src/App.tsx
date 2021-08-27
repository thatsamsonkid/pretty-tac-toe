import React, {useState} from 'react';
import './App.css';
import Tile from './ui/Tile';
import styled from 'styled-components';

const BoardBorder = styled.div`
padding:10px;
box-shadow: 6px 6px 4px 0px rgb(136 136 136 / 70%);
border-radius: 1rem;
`;

const BoardBackground = styled.div`
display: flex;
flex-flow: column;
background: var(--primary-pink)
`;

const BoardRow = styled.div`
display:flex;
flex-flow:row;
:nth-child(even){
  margin: .6rem 0;
}
`;

const PageLayout = styled.div`
padding: 0 1rem;
`;

function App() {

  const [gameState, setGameState]= useState([
    [null,null,null],
    [null,null,null],
    [null,null,null]
  ]);

const board = gameState.map((row, i) => {
  const drawrow = row.map((tile, j) => {
    return (<Tile key={`row-${i}-tile-${j}`} value={tile} ></Tile>);
  });
  return (<BoardRow>{drawrow.map(row => row)}</BoardRow>);
});

  return (
    <PageLayout>
      <div>
        <h1 className="page-heading">Pretty Tac Toe</h1>
      </div>
      <BoardBorder >
      <BoardBackground>
      {board.map((row) => row)}
      </BoardBackground>
      </BoardBorder>
    </PageLayout>
  );
}

export default App;
