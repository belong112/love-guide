import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

interface ChooseBoxProps {
  key: number;
  text: string;
  defaultText: string;
  isFilled: boolean;
  clickChoice: any;
}

export default function ChooseBox(props: ChooseBoxProps) {
  const Item = styled("div")(() => ({
    backgroundColor: props.isFilled ? "#f5e4d5" : "#fff",
    height: "50px",
    borderRadius: "25px",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "1rem",
    color: props.isFilled ? "#000" : "#a4c0cf",
  }));

  return (
    <Box textAlign="center">
      <Item onClick={props.clickChoice}>
        <p>{props.isFilled ? props.text : props.defaultText}</p>
      </Item>
      <p>{props.isFilled && props.defaultText}</p>
    </Box>
  );
}
