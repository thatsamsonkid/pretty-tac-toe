import React from 'react';
import styled from 'styled-components';

const TileSquare = styled.div`
    width: 100%;
    height: 10rem;
    background-color: white;

    display: flex;
    justify-content: center;
    align-items: center;

    :nth-child(even){
        margin: 0 .6rem;
    }
`;

const XTile = styled.div`
    background-color: var(--primary-pink);
    width: 100%;
    height: 100%;
`;

const OTile = styled.div`
    background-color: var(--primary-pink);
    width: 100%;
    height: 100%;
`;

const EmptyTile = styled.div`
background-color: var(--primary-pink);
width: 3rem;
height: 3rem;
border-radius: 4rem;
`;

function Tile(props: any) {

    let tileValue;

    if(props.value === "circle"){
        tileValue = (<XTile></XTile>);
    } else if(props.value === "circle"){
        tileValue = (<OTile></OTile>);
    } else {
        tileValue = (<EmptyTile></EmptyTile>);
    }

  return (
    <TileSquare>
        {tileValue}
    </TileSquare>
  );
}

export default Tile;
