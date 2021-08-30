import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

function Tile(props: any) {
  const [tileValue, setTileValue]: [Element | null, any] = useState(null);

  const setTile = () => {
    if (props.value === "X") {
      setTileValue(<XTile></XTile>);
    } else if (props.value === "O") {
      setTileValue(<OTile></OTile>);
    } else {
      setTileValue(<EmptyTile></EmptyTile>);
    }
  };

  useEffect(() => {
    setTile();
  }, [props.value]);

  const onMouseOverHandler = () => {
    if (!props.value) {
      if (props.player === "X") {
        setTileValue(<XTile className="tile-preview"></XTile>);
      }
      if (props.player === "O") {
        setTileValue(<OTile className="tile-preview"></OTile>);
      }
    }
  };

  const onMouseLeaveHandler = () => setTile();

  return (
    <TileSquare
      onMouseEnter={onMouseOverHandler}
      onMouseLeave={onMouseLeaveHandler}
      onClick={() => props.onClick(props.coordinates)}
    >
      {tileValue}
    </TileSquare>
  );
}

export default Tile;
