import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TILE_STATES } from "../models/TicTacToe";

const TileSquare = styled.div`
  width: 100%;
  height: 10rem;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  :nth-child(even) {
    margin: 0 0.6rem;
  }
`;

const BaseTile = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    color: var(--primary-pink);
    text-align: center;
  }

  &.tile-preview {
    &::after {
      color: var(--secondary-pink);
    }
  }
`;

const XTile = styled(BaseTile)`
  &::after {
    font-size: 15rem;
    content: "\\D7";
    line-height: 7rem;
  }
`;

const OTile = styled(BaseTile)`
  &::after {
    content: "\\4F";
    font-size: 11rem;
    line-height: 9rem;
  }
`;

const EmptyTile = styled.div`
  background-color: var(--primary-pink);
  width: 3rem;
  height: 3rem;
  border-radius: 4rem;
`;

function setTile(value: TILE_STATES) {
  if (value === TILE_STATES.X) {
    return <XTile></XTile>;
  } else if (value === TILE_STATES.O) {
    return <OTile></OTile>;
  } else {
    return <EmptyTile></EmptyTile>;
  }
}

function Tile(props: any) {
  const [tileValue, setTileValue]: [Element | null, any] = useState(null);

  useEffect(() => {
    setTileValue(setTile(props.value));
  }, [props.value]);

  const onMouseOverHandler = () => {
    if (!props.value && !props.winner) {
      if (props.player === TILE_STATES.X) {
        setTileValue(<XTile className="tile-preview"></XTile>);
      }
      if (props.player === TILE_STATES.O) {
        setTileValue(<OTile className="tile-preview"></OTile>);
      }
    }
  };

  const onMouseLeaveHandler = () => setTileValue(setTile(props.value));

  return (
    <TileSquare
      onMouseEnter={onMouseOverHandler}
      onMouseLeave={onMouseLeaveHandler}
      onClick={() => !props.value && props.onClick(props.coordinates)}
    >
      {tileValue}
    </TileSquare>
  );
}

export default Tile;
