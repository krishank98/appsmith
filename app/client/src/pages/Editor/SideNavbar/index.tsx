import React from "react";
import styled from "styled-components";
import explorerIcon from "./explorer-icon.png";
import dataIcon from "./datasource-icon.png";
import libIcon from "./library.png";

const Container = styled.div`
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 55px;
  display: block;

  background: #ffffff;
  box-shadow: 1px 0px 0px #f1f1f1;
  height: 100%;
  border-right: 1px solid #e8e8e8;
`;

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3px;

  width: 55px;
  height: 50px;

  /* Grays/White

  White color mostly used on backgrounds. We’re minimal and clean product and we use a lot of white.
  */
  background: #ffffff;
  box-shadow: inset -1px -1px 0px #e8e8e8;

  /* Inside auto layout */

  img {
    height: 20px;
    width: 18px;
  }
  span {
    /* Explorer */
    font-style: normal;
    font-weight: 600;
    font-size: 8px;
    line-height: 140%;
    /* or 11px */

    color: #000000;
  }
`;

type Props = Record<string, unknown>;

function Index(props: Props) {
  return (
    <Container>
      <Button>
        <img src={explorerIcon} />
        <span>Explorer</span>
      </Button>
      <Button>
        <img src={dataIcon} />
        <span>Datasource</span>
      </Button>
      <Button>
        <img src={libIcon} />
        <span>Library</span>
      </Button>
    </Container>
  );
}

export default Index;
